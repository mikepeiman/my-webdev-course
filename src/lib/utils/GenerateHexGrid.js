

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
    pointsString = pointsArray.join(' ')
    console.log(`🚀 ~ file: CalculateHexPoints.js:23 ~ calculateHexagonPoints ~ pointsString, pointsArray, pointsObject:`, pointsString, pointsArray, pointsObject)
    return { pointsString, pointsArray, pointsObject }
}

function getHexWidth(pointsArray, axis) {
    console.log(`🚀 ~ file: CalculateHexPoints.js:30 ~ getHexWidth ~ pointsArray, axis:`, pointsArray, axis)
    switch (axis) {
        case 'x':
            let maxX = Math.max(...pointsArray);
            let minX = Math.min(...pointsArray);
            let widthX = maxX - minX;
            console.log(`🚀 ~ file: +page.svelte:116 ~ getHexWidth ~ widthX:`, widthX)
            return widthX;
        case 'y':
            let maxY = Math.max(...pointsArray);
            let minY = Math.min(...pointsArray);
            let widthY = maxY - minY;
            console.log(`🚀 ~ file: +page.svelte:116 ~ getHexWidth ~ widthY:`, widthY)
            return widthY;
        case 'both':
              maxX = Math.max(...pointsArray);
              minX = Math.min(...pointsArray);
              widthX = maxX - minX;
              maxY = Math.max(...pointsArray);
              minY = Math.min(...pointsArray);
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