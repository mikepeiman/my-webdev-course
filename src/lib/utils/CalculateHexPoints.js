export const calculateHexagonPoints = (radius, centerX, centerY, pointy) => {
    // console.log(`🚀 ~ file: CalculateHexPoints.js:2 ~ calculateHexagonPoints ~ radius, centerX, centerY:`, radius, centerX, centerY)
    let pointsString = ''
    let pointsArray = []
    let xPointsArrray = []
    let yPointsArrray = []
    let pointsObject = {}
    let offsetAngle
    pointy ? offsetAngle = (Math.PI / 6) : offsetAngle = 0
    console.log(`🚀 ~ file: CalculateHexPoints.js:10 ~ calculateHexagonPoints ~ offsetAngle:`, offsetAngle)
    console.log(`🚀 ~ file: CalculateHexPoints.js:10 ~ calculateHexagonPoints ~ pointy:`, pointy)
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + offsetAngle;
        const x = centerX + radius * Math.cos(angle);
        // console.log(`🚀 ~ file: CalculateHexPoints.js:12 ~ calculateHexagonPoints ~  x:`,  x)
        const y = centerY + radius * Math.sin(angle);
        // console.log(`🚀 ~ file: CalculateHexPoints.js:13 ~ calculateHexagonPoints ~ y:`, y)
        pointsArray.push(`${x},${y}`)
        xPointsArrray.push(x)
        yPointsArrray.push(y)
        pointsObject[i] = `${x},${y}`
    }

    let hexWidthX = getHexWidth(xPointsArrray, 'x');
    let hexWidthY = getHexWidth(yPointsArrray, 'y');
    let hexWidth = getHexWidth(pointsArray, 'both');
    pointsString = pointsArray.join(' ')

    return {
        widthX: hexWidthX,
        widthY: hexWidthY,
        width: hexWidth,
        points: pointsString,
        pointsAsArray: pointsArray,
        pointsAsObject: pointsObject
    }

    function getHexWidth(pointsArray, axis) {
        let maxX, minX, widthX, maxY, minY, widthY
        switch (axis) {
            case 'x':
                maxX = Math.max(...pointsArray);
                minX = Math.min(...pointsArray);
                widthX = maxX - minX;

                return widthX;
            case 'y':
                maxY = Math.max(...pointsArray);
                minY = Math.min(...pointsArray);
                widthY = maxY - minY;

                return widthY;
            case 'both':
                // break the array of string-pairs into two arrays of numbers representing x, y coordinates
                pointsArray = pointsArray.map((point) => {
                    const [x, y] = point.split(',').map(Number);
                    return [x, y];
                });
                // break the array of numbers into separate arrays of x, y coordinates
                let pointsArrayX = pointsArray.map(([x, y]) => x);

                let pointsArrayY = pointsArray.map(([x, y]) => y);


                maxX = Math.max(...pointsArrayX);
                minX = Math.min(...pointsArrayX);
                widthX = maxX - minX;
                maxY = Math.max(...pointsArrayY);
                minY = Math.min(...pointsArrayY);
                widthY = maxY - minY;
                return { 'x': widthX, 'y': widthY }
            default:
                return 0;

        }
    }
}
