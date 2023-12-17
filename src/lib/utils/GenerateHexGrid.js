import { calculateHexagonPoints } from "./CalculateHexPoints";

let hexagons = [];
let row = 0;
let col = 0;
export const GenerateHexGrid = (width, height, rows, columns, offsetX, offsetY) => {
    console.log(`🚀 ~ file: GenerateHexGrid.js:3 ~ GenerateHexGrid ~ width, height, rows, columns, offsetX, offsetY:`, width, height, rows, columns, offsetX, offsetY)
    const hexagons = [];
    offsetX = true
    offsetY = true
    for (let row = 0; row < rows; row++) {
        console.log(`🚀 ~ file: GenerateHexGrid.js:11 ~ GenerateHexGrid ~ row:`, row)
        for (let col = 0; col < columns; col++) {
            let x, y
            if(offsetX && row % 2 === 0){
                x =  col * width;
            } else {
                x =  col * width + width / 2
            }

            if(offsetY && col % 2 === 0){
                y =  row * height
            } else {
                // y =  row * height - height * 3 / 4 
                y =  row * height 
                
            }
            console.log(`🚀 ~ file: GenerateHexGrid.js:15 ~ GenerateHexGrid ~ x:`, x)
            console.log(`🚀 ~ file: GenerateHexGrid.js:17 ~ GenerateHexGrid ~ y:`, y)
            // const x = col * width + ((row + offsetX) % 2 === 0 ? 0 : width / 2);
            console.log(`🚀 ~ file: GenerateHexGrid.js:14 ~ GenerateHexGrid ~ (row + offsetX) ${row + offsetX} % 2:`, (row + offsetX) % 2)
            // y = row * (height * 3 / 4) + ((col + offsetY) % 2 === 0 ? 0 : height * 3 / 4);
            hexagons.push({ x: x, y: y, row: row, col: col });
        }
    }

    console.log(`🚀 ~ file: GenerateHexGrid.js:12 ~ GenerateHexGrid ~ hexagons:`, hexagons)
    return hexagons;
};

export const generateHexArray = (radius, width, height, rows, columns, offsetX, offsetY) => {
    hexagons = GenerateHexGrid(width, height, rows, columns, offsetX, offsetY);
    let hexArray = [];
    // let hex = calculateHexagonPoints(radius, width, height);
    const hexOffsetX = [0, 0];
    const hexOffsetY = [1, 0];
    hexagons.forEach((coord) => {
        // console.log(`🚀 ~ file: GenerateHexGrid.js:29 ~ hexagons.forEach ~ coord:`, coord)
        // console.log(`🚀 ~ file: GenerateHexGrid.js:31 ~ hexagons.forEach ~ radius, width * coord.row, height * coord.col:`, radius, width * coord.row, height * coord.col)
        let hex = calculateHexagonPoints(radius, coord.x, coord.y);
        // console.log(`🚀 ~ file: GenerateHexGrid.js:31 ~ hexagons.forEach ~ hex:`, hex)
        hexArray.push({
            x: coord.x,
            y: coord.y,
            width: hex.widthX,
            height: hex.widthY,
            points: hex.points,
            pointsAsArray: hex.pointsAsArray,
            pointsAsObject: hex.pointsAsObject
        })
    })
    console.log(`🚀 ~ file: GenerateHexGrid.js:39 ~ generateHexArray ~ hexArray:`, hexArray)
    return hexArray;
}
