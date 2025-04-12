const AdditionalSets = ({ sets, handleChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="input-group">
        <label className="block mb-2 font-semibold">Conjunto A</label>
        <div className="flex items-center gap-2">
          <span>{"{"}</span>
          <input
            type="text"
            name="setA"
            value={sets.setA}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
            placeholder="1, 2, 3"
          />
          <span>{"}"}</span>
        </div>
      </div>

      <div className="input-group">
        <label className="block mb-2 font-semibold">Conjunto B</label>
        <div className="flex items-center gap-2">
          <span>{"{"}</span>
          <input
            type="text"
            name="setB"
            value={sets.setB}
            onChange={handleChange}
            className="flex-1 p-2 border rounded"
            placeholder="4, 5, 6"
          />
          <span>{"}"}</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="block font-medium mb-2">Conjunto C</label>
        <div className="flex items-center gap-2">
          <span>C = {"{"}</span>
          <input
            type="text"
            name="setC"
            onChange={handleChange}
            value={sets.setC}
            className="flex-1 p-1 border rounded w-full"
            placeholder="4, 5, 6"
          />
          <span>{"}"}</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <label className="block font-medium mb-2">Conjunto D</label>
        <div className="flex items-center gap-2">
          <span>D = {"{"}</span>
          <input
            type="text"
            name="setD"
            onChange={handleChange}
            value={sets.setD}
            className="flex-1 p-1 border rounded w-full"
            placeholder="4, 5, 6"
          />
          <span>{"}"}</span>
        </div>
      </div>
    </div>
  );
};
export default AdditionalSets;
