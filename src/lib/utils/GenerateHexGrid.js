
export const GenerateHexGrid = (width, height, rows, columns, offsetX, offsetY) => {
    console.log(`🚀 ~ file: GenerateHexGrid.js:3 ~ GenerateHexGrid ~ width, height, rows, columns, offsetX, offsetY:`, width, height, rows, columns, offsetX, offsetY)
    const hexagons = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const x = col * width + ((row + offsetX) % 2 === 0 ? 0 : width / 2);
            const y = row * (height * 3 / 4) + ((col + offsetY) % 2 === 0 ? 0 : height / 4);
            hexagons.push({ x, y });
        }
    }
    
    console.log(`🚀 ~ file: GenerateHexGrid.js:12 ~ GenerateHexGrid ~ hexagons:`, hexagons)
    return hexagons;
};