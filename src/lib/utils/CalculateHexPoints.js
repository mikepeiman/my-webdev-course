

export const calculateHexagonPoints = (radius, centerX, centerY) => {
    let pointsString = ''
    let pointsArray = []
    let xPointsArrray = []
    let yPointsArrray = []
    let pointsObject = {}

    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 6) + (Math.PI / 3) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        pointsArray.push(`${x},${y}`)
        xPointsArrray.push(x)
        yPointsArrray.push(y)
        pointsObject[i] = `${x},${y}`
    }

    let hexWidthX = getHexWidth(xPointsArrray, 'x');
    console.log(`🚀 ~ file: CalculateHexPoints.js:21 ~ calculateHexagonPoints ~ hexWidthX:`, hexWidthX)
    let hexWidthY = getHexWidth(yPointsArrray, 'y');
    console.log(`🚀 ~ file: CalculateHexPoints.js:23 ~ calculateHexagonPoints ~ hexWidthY:`, hexWidthY)
    let hexWidth = getHexWidth(pointsArray, 'both');
    console.log(`🚀 ~ file: CalculateHexPoints.js:25 ~ calculateHexagonPoints ~ pointsArray:`, pointsArray)
    console.log(`🚀 ~ file: CalculateHexPoints.js:23 ~ calculateHexagonPoints ~ hexWidth:`, hexWidth)
    pointsString = pointsArray.join(' ')
    console.log(`🚀 ~ file: CalculateHexPoints.js:23 ~ calculateHexagonPoints ~ pointsString, pointsArray, pointsObject:`, pointsString, pointsArray, pointsObject)
    return { pointsString, pointsArray, pointsObject }
}

function getHexWidth(pointsArray, axis) {
    console.log(`🚀 ~ file: CalculateHexPoints.js:30 ~ getHexWidth ~ pointsArray, axis:`, pointsArray, axis)
    let maxX, minX, widthX, maxY, minY, widthY
    switch (axis) {
        case 'x':
              maxX = Math.max(...pointsArray);
              minX = Math.min(...pointsArray);
              widthX = maxX - minX;
            console.log(`🚀 ~ file: +page.svelte:116 ~ getHexWidth ~ widthX:`, widthX)
            return widthX;
        case 'y':
              maxY = Math.max(...pointsArray);
              minY = Math.min(...pointsArray);
              widthY = maxY - minY;
            console.log(`🚀 ~ file: +page.svelte:116 ~ getHexWidth ~ widthY:`, widthY)
            return widthY;
        case 'both':
            // break the array of string-pairs into two arrays of numbers representing x, y coordinates
              pointsArray = pointsArray.map((point) => {
                const [x, y] = point.split(',').map(Number);
                return [x, y];
              });
              console.log(`🚀 ~ file: CalculateHexPoints.js:54 ~ pointsArray=pointsArray.map ~ pointsArray:`, pointsArray)
              // break the array of numbers into separate arrays of x, y coordinates
              let pointsArrayX = pointsArray.map(([x, y]) => x);
              console.log(`🚀 ~ file: CalculateHexPoints.js:57 ~ getHexWidth ~ pointsArrayX:`, pointsArrayX)
              let pointsArrayY = pointsArray.map(([x, y]) => y);
              console.log(`🚀 ~ file: CalculateHexPoints.js:59 ~ getHexWidth ~ pointsArrayY:`, pointsArrayY)

              maxX = Math.max(...pointsArrayX);
              minX = Math.min(...pointsArrayX);
              widthX = maxX - minX;
              maxY = Math.max(...pointsArrayY);
              minY = Math.min(...pointsArrayY);
              widthY = maxY - minY;
            return { 'x': widthX, 'y': widthY }
        default:
            return 0

    }


    let points = pointsArray
    let max = Math.max(...points);
    let min = Math.min(...points);
    let width = max - min;
    console.log(`🚀 ~ file: +page.svelte:116 ~ getHexWidth ~ width:`, width)
    return width;
}