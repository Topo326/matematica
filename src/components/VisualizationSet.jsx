import React, { useState, useEffect } from "react";
import VennDiagram from "./VennDiagram";
import { evaluateSetExpression } from "./setOperationParser";

const VisualizationSet = ({ expression, sets }) => {
  const [result, setResult] = useState([]);
  const [vennSets, setVennSets] = useState({});

  useEffect(() => {
    try {
      const operationResult = evaluateSetExpression(expression, sets);
      setResult(operationResult);

      // Extraer los conjuntos usados en la expresión (A, B, C, D)
      const usedSets = [
        ...new Set(expression.toUpperCase().match(/[A-D]/g) || []),
      ].reduce((acc, setKey) => {
        acc[setKey] = sets[setKey] || [];
        return acc;
      }, {});

      setVennSets(usedSets);
    } catch (error) {
      console.error("Error en operación:", error.message);
      setResult(["Error en la expresión"]);
    }
  }, [expression, sets]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Resultado Visual
        </h3>
        <p className="text-lg text-gray-600 mt-2">
          {expression} = [{Array.isArray(result) ? result.join(", ") : result}]
        </p>
      </div>

      <div className="flex justify-center items-center min-h-[400px]">
        {Object.keys(vennSets).length >= 2 ? (
          <VennDiagram sets={vennSets} operationResult={result} />
        ) : (
          <p className="text-red-500">
            {Object.keys(vennSets).length > 4
              ? "Máximo 4 conjuntos soportados"
              : "Se requieren al menos 2 conjuntos válidos (A-D)"}
          </p>
        )}
      </div>
    </div>
  );
};

export default VisualizationSet;
