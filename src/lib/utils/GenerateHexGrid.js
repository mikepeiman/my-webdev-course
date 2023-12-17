import { calculateHexagonPoints } from "./CalculateHexPoints";

let hexagons = [];
let row = 0;
let col = 0;
export const GenerateHexGrid = (width, height, rows, columns,offset) => {
    console.log(`🚀 ~ file: GenerateHexGrid.js:3 ~ GenerateHexGrid ~ width, height, rows, columns, offset:`, width, height, rows, columns, offset)
    const hexagons = [];

    for (let row = 0; row < rows; row++) {
        console.log(`🚀 ~ file: GenerateHexGrid.js:11 ~ GenerateHexGrid ~ row:`, row)
        for (let col = 0; col < columns; col++) {
            let x, y
            if (offset === "x" &&row % 2 !== 0) {
                x = col * width;
            } else if (offset === "x" && row % 2 === 0) {
                x = col * width + width / 2
            } else {
                x = col * width  *.75;
                console.log(`🚀 ~ file: GenerateHexGrid.js:20 ~ GenerateHexGrid ~ x = col * width:`, x = col * width)
                // y = row * height;
            }

            if (col % 2 !== 0) {
                y = row * height
            } else if (offset === "y" && col % 2 === 0){
                y =  row * height + height / 2
                // y = row * height
            } else {
                y = row * height;
                // x = col * width;
            }
            
            // console.log(`🚀 ~ file: GenerateHexGrid.js:15 ~ GenerateHexGrid ~ x:`, x)
            // console.log(`🚀 ~ file: GenerateHexGrid.js:17 ~ GenerateHexGrid ~ y:`, y)
            // console.log(`🚀 ~ file: GenerateHexGrid.js:14 ~ GenerateHexGrid ~ (row ) ${row} % 2:`, (row) % 2)
            hexagons.push({ x: x, y: y, row: row, col: col });
        }
    }

    console.log(`🚀 ~ file: GenerateHexGrid.js:12 ~ GenerateHexGrid ~ hexagons:`, hexagons)
    return hexagons;
};

export const generateHexArray = (radius, width, height, rows, columns, offset) => {
    hexagons = GenerateHexGrid(width, height, rows, columns, offset);
    console.log(`🚀 ~ file: GenerateHexGrid.js:47 ~ generateHexArray ~ offset:`, offset)
    let hexArray = [];
    // let hex = calculateHexagonPoints(radius, width, height);
    let pointy;
    offset === "x" ? pointy = true : pointy = false
    console.log(`🚀 ~ file: GenerateHexGrid.js:51 ~ generateHexArray ~ pointy:`, pointy)
    hexagons.forEach((coord) => {
        // console.log(`🚀 ~ file: GenerateHexGrid.js:29 ~ hexagons.forEach ~ coord:`, coord)
        // console.log(`🚀 ~ file: GenerateHexGrid.js:31 ~ hexagons.forEach ~ radius, width * coord.row, height * coord.col:`, radius, width * coord.row, height * coord.col)
        let hex = calculateHexagonPoints(radius, coord.x + width / 2, coord.y + height / 2, coord.y, pointy);
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
