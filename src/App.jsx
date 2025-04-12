import { useState } from "react";
import AdditionalSets from "./components/AdditionalSet";
import UniversalSetMenu from "./components/UniversalSetMenu";
import VisualizationSet from "./components/VisualizationSet";
import OperationKeyboard from "./components/keyboard/OperationKeyboard";
import OperationInput from "./components/OperationInput";
import { evaluateSetExpression } from "./components/setOperationParser.js";

function App() {
  // Estado de los conjuntos y demás variables
  const [sets, setSets] = useState({
    setA: "",
    setB: "",
    setC: "",
    setD: "",
    setU: "",
  });
  const [resultado, setResultado] = useState("");
  const [universalType, setUniversalType] = useState("R");
  const [customExpression, setCustomExpression] = useState("");

  // Función para limpiar y eliminar duplicados
  const parseSet = (str) => {
    return [
      ...new Set(
        str
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      ),
    ];
  };

  // Validación según el tipo de universo
  const validateSet = (setValue) => {
    const items = setValue
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    if (items.length === 0) return false;
    switch (universalType) {
      case "N":
        return items.every((item) => /^[1-9]\d*$/.test(item));
      case "Z":
        return items.every((item) => /^-?\d+$/.test(item));
      case "R":
        return items.every((item) => !isNaN(item));
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSets((prev) => ({ ...prev, [name]: value }));
  };

  // Ejecuta y valida la operación
  const calculateOperation = () => {
    const usedSets = [...new Set(customExpression.match(/[A-DU]/g) || [])];
    const validationErrors = usedSets.filter(
      (set) => !validateSet(sets[`set${set}`]),
    );

    if (customExpression.includes("U") && !validateSet(sets.setU)) {
      alert("El conjunto universal U no es válido o está vacío.");
      return;
    }

    if (validationErrors.length > 0) {
      alert(`Error en conjuntos: ${validationErrors.join(", ")}`);
      return;
    }

    try {
      const evaluated = evaluateSetExpression(customExpression, {
        A: parseSet(sets.setA),
        B: parseSet(sets.setB),
        C: parseSet(sets.setC),
        D: parseSet(sets.setD),
        U: parseSet(sets.setU),
      });

      setResultado(evaluated.length === 0 ? "∅" : evaluated.join(", "));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-900">
        Calculadora de Conjuntos
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <AdditionalSets sets={sets} handleChange={handleChange} />

        <div className="mb-6">
          <label className="block mb-2 font-semibold">
            Escribe tu operación:
          </label>
          <OperationInput
            operation={customExpression}
            setOperation={setCustomExpression}
          />
          <OperationKeyboard
            onKeyPress={(symbol) =>
              setCustomExpression((prev) => prev + symbol)
            }
          />
        </div>

        <UniversalSetMenu
          universalType={universalType}
          setUniversalType={setUniversalType}
        />

        <button
          onClick={calculateOperation}
          className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors"
        >
          Calcular
        </button>
      </div>

      {resultado && (
        <VisualizationSet
          expression={customExpression}
          sets={{
            A: parseSet(sets.setA),
            B: parseSet(sets.setB),
            C: parseSet(sets.setC),
            D: parseSet(sets.setD),
            U: parseSet(sets.setU),
          }}
        />
      )}
    </div>
  );
}

export default App;
