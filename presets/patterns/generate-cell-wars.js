export function generateCellWars(rows, columns) {
  const aliveCells = new Map();

  // Calculate the size of each quadrant
  const quadrantHeight = Math.floor(rows / 2);
  const quadrantWidth = Math.floor(columns / 2);

  // Dynamically adjust cluster size based on grid dimensions
  const clustersPerQuadrant = Math.min(rows, columns);
  const cellsPerCluster = Math.min(rows, columns) / 10;

  // Quadrant starting positions
  const quadrants = [
    [0, 0], // Top-left
    [0, quadrantWidth], // Top-right
    [quadrantHeight, 0], // Bottom-left
    [quadrantHeight, quadrantWidth], // Bottom-right
  ];

  // Unique colors for each quadrant
  const colors = ["#009432", "#EE5A24", "#FFC312", "#0652DD"];

  quadrants.forEach(([startRow, startCol], index) => {
    const color = colors[index % colors.length];

    // Generate clusters in the quadrant
    for (let cluster = 0; cluster < clustersPerQuadrant; cluster++) {
      // Pick a random starting point for the cluster
      const clusterRow = Math.floor(Math.random() * quadrantHeight) + startRow;
      const clusterCol = Math.floor(Math.random() * quadrantWidth) + startCol;

      // Generate chaotic cells around the cluster's center
      for (let i = 0; i < cellsPerCluster; i++) {
        const offsetRow = Math.floor(Math.random() * 5) - 2; // Range: -2 to 2
        const offsetCol = Math.floor(Math.random() * 5) - 2; // Range: -2 to 2

        const cellRow = clusterRow + offsetRow;
        const cellCol = clusterCol + offsetCol;

        // Ensure cells stay within the grid
        if (
          cellRow >= 0 &&
          cellRow < rows &&
          cellCol >= 0 &&
          cellCol < columns
        ) {
          const key = `${cellRow},${cellCol}`;
          aliveCells.set(key, color);
        }
      }
    }
  });

  return {
    rows,
    columns,
    aliveCells: Array.from(aliveCells.entries()),
  };
}
