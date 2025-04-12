const UniversalSetMenu = ({ universalType, setUniversalType }) => {
  const universos = [
    { value: "R", label: "Reales (ℝ)", color: "bg-blue-600" },
    { value: "N", label: "Naturales (ℕ)", color: "bg-green-600" },
    { value: "Z", label: "Enteros (ℤ)", color: "bg-purple-600" },
  ];

  return (
    <div className="mt-4 p-3 bg-blue-50 rounded">
      <h3 className="font-semibold mb-2">Universo:</h3>
      <div className="flex gap-2 justify-center">
        {universos.map((universo) => (
          <button
            key={universo.value}
            onClick={() => setUniversalType(universo.value)}
            className={`px-4 py-2 rounded transition-all ${
              universalType === universo.value
                ? `${universo.color} text-white shadow-lg`
                : "bg-white border border-gray-300 "
            }`}
          >
            {universo.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UniversalSetMenu;
