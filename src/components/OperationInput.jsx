const OperationInput = ({ operation, setOperation }) => {
  const symbols = ["∪", "∩", "−", "Δ", "ᶜ", "(", ")", "A", "B", "C", "D", "∅"];

  const handleSymbolClick = (symbol) => {
    setOperation((prev) => prev + symbol);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="block font-medium mb-2">
          Expresión de operación:
        </label>
        <input
          type="text"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Ej: A ∪ (B ∩ C)"
        />

        <div className="grid grid-cols-6 gap-2">
          {symbols.map((symbol) => (
            <button
              key={symbol}
              onClick={() => handleSymbolClick(symbol)}
              className="p-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default OperationInput;
