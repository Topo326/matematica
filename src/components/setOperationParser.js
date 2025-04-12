import {
  union,
  intersection,
  difference,
  symmetricDifference,
} from "set-operations";

const nAryOperations = {
  union: (...sets) => sets.reduce((acc, set) => union(acc, set)),
  intersection: (...sets) => sets.reduce((acc, set) => intersection(acc, set)),
  difference: (initial, ...rest) =>
    rest.reduce((acc, set) => difference(acc, set), initial),
  symmetric: (...sets) =>
    sets.reduce((acc, set) => symmetricDifference(acc, set)),
  complement: (a, U) => difference(U, a),
};

const tokenize = (expr) => {
  const regex = /([A-DU∅]|∪|∩|−|Δ|ᶜ|\(|\))/g;
  const tokens = [];
  let match;
  while ((match = regex.exec(expr)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
};

const parseExpression = (tokens) => {
  let index = 0;

  const parseAtom = () => {
    if (tokens[index] === "(") {
      index++;
      const node = parseExpression(tokens);
      if (tokens[index++] !== ")") throw new Error("Paréntesis no cerrado");
      // Se revisa si hay operador de complemento unario
      let nodeWithComplement = node;
      while (index < tokens.length && tokens[index] === "ᶜ") {
        nodeWithComplement = {
          type: "operation",
          operator: "ᶜ",
          operand: nodeWithComplement,
        };
        index++;
      }
      return nodeWithComplement;
    }

    // Soporta el token de conjunto vacío
    if (tokens[index] === "∅") {
      index++;
      let node = { type: "constant", value: [] };
      while (index < tokens.length && tokens[index] === "ᶜ") {
        node = { type: "operation", operator: "ᶜ", operand: node };
        index++;
      }
      return node;
    }

    if (/[A-DU]/.test(tokens[index])) {
      let node = { type: "set", value: tokens[index++] };
      while (index < tokens.length && tokens[index] === "ᶜ") {
        node = { type: "operation", operator: "ᶜ", operand: node };
        index++;
      }
      return node;
    }

    throw new Error(`Token inesperado: ${tokens[index]}`);
  };

  const parseOp = (left, op) => {
    return {
      type: "operation",
      operator: op,
      left,
      right: parseAtom(),
    };
  };

  let left = parseAtom();
  while (index < tokens.length && /[∪∩−Δ]/.test(tokens[index])) {
    const op = tokens[index++];
    left = parseOp(left, op);
  }
  return left;
};

const evaluateAST = (node, sets) => {
  if (node.type === "constant") return node.value;

  if (node.type === "set") {
    if (!sets[node.value])
      throw new Error(`Conjunto ${node.value} no definido`);
    return sets[node.value];
  }

  if (node.type === "operation") {
    if (node.operator === "ᶜ") {
      const operand = evaluateAST(node.operand, sets);
      return nAryOperations.complement(operand, sets.U || []);
    } else {
      const left = evaluateAST(node.left, sets);
      const right = evaluateAST(node.right, sets);
      switch (node.operator) {
        case "∪":
          return nAryOperations.union(left, right);
        case "∩":
          return nAryOperations.intersection(left, right);
        case "−":
          return nAryOperations.difference(left, right);
        case "Δ":
          return nAryOperations.symmetric(left, right);
        default:
          throw new Error(`Operador no soportado: ${node.operator}`);
      }
    }
  }

  throw new Error("Nodo AST desconocido");
};

export const evaluateSetExpression = (expr, sets) => {
  try {
    const tokens = tokenize(expr);
    if (tokens.length === 0) throw new Error("Expresión vacía");

    const ast = parseExpression(tokens);
    return evaluateAST(ast, {
      ...sets,
      U: sets.U || [],
    });
  } catch (error) {
    throw new Error(`Expresión inválida: ${error.message}`);
  }
};
