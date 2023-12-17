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
                return 0

        }


        let points = pointsArray
        let max = Math.max(...points);
        let min = Math.min(...points);
        let width = max - min;

        return width;
    }
}
