import React, { useMemo, useState } from "react";
import { extractSets, generateCombinations, VennDiagram } from "@upsetjs/react";

const VennDiagramComponent = ({ setsData }) => {
  const keys = Object.keys(setsData);

  if (keys.length > 3) {
    return (
      <div style={{ padding: "1rem", color: "gray" }}>
        ! No se puede mostrar el diagrama de Venn con más de 3 conjuntos.
        <br />
        Mostrando solo el resultado sin visualización gráfica.
      </div>
    );
  }

  const elements = useMemo(() => {
    const entries = Object.entries(setsData);
    const all = new Set(entries.flatMap(([, values]) => values));

    return Array.from(all).map((el) => {
      const belongsTo = entries
        .filter(([, values]) => values.includes(el))
        .map(([key]) => key);
      return { name: el.toString(), sets: belongsTo };
    });
  }, [setsData]);

  const sets = useMemo(() => extractSets(elements), [elements]);
  const combinations = useMemo(
    () => generateCombinations(sets, elements),
    [sets, elements],
  );

  const [selection, setSelection] = useState(null);

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <VennDiagram
        sets={sets}
        combinations={combinations}
        width={500}
        height={400}
        selection={selection}
        onhover={setSelection}
      />
    </div>
  );
};

export default VennDiagramComponent;
