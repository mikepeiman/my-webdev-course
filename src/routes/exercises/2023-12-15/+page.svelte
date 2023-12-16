<script>
	import { onMount } from 'svelte';

	$: cols = PARAMS.numHexesInCol;
	$: console.log(`🚀 ~ file: +page.svelte:8 ~ cols: ${cols} rows: ${rows}`);
	$: rows = PARAMS.numHexesInRow;

	let hexGridCoordinates = [];

	let PARAMS = {
		radius: 20,
		centerX: 40,
		centerY: 40,
		numHexesInRow: 8,
		numHexesInCol: 8,
		hexagonSpacing: 0,
		hexagonColor: 'black',
		hexagonStrokeColor: 'white',
		hexagonStrokeWidth: 2,
		hexagonStrokeOpacity: 1,
		hexagonOpacity: 1
	};

	// Function to calculate the points of the hexagon
	function calculateHexagonPoints(radius, centerX, centerY) {
		let points = [];
		for (let i = 0; i < 6; i++) {
			const angle = Math.PI / 6 + (Math.PI / 3) * i;
			const x = centerX + radius * Math.cos(angle) ;
			const y = centerY + radius * Math.sin(angle);
			points.push(`${x},${y}`);
		}
		let pointString = points.join(' ');
		// console.log(`🚀 ~ file: +page.svelte:42 ~ calculateHexagonPoints ~ pointString:`, pointString);
		return pointString;
	}
	onMount(async () => {
		hexGridCoordinates = await generateHexGridCoordinates(
			PARAMS.radius,
			PARAMS.centerX,
			PARAMS.centerY,
			PARAMS.numHexesInCol,
			PARAMS.numHexesInRow
		);
		console.log(`🚀 ~ file: +page.svelte:75 ~ onMount ~ hexGridCoordinates:`, hexGridCoordinates);
		drawAllHexes();
	});

	const generateHexGridCoordinates = (radius, centerX, centerY, cols, rows) => {
		// Create the hexagons coordinates array so they can all be drawn at once
		hexGridCoordinates = [];
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				// if odd row, offset x
				// if (j % 2 === 1) {
				// 	centerX = centerX + radius;
				// }
				const hex = new Hexagon(
					radius,
					(centerX + PARAMS.hexagonSpacing)  * (j + 1),
					(centerY + PARAMS.hexagonSpacing)  * (i + 1),
					i,
					j
				);
				hexGridCoordinates.push(hex);
			}
		}
		return hexGridCoordinates;
	};

	const drawAllHexes = () => {
		let width = PARAMS.numHexesInRow * PARAMS.radius * 2 + PARAMS.hexagonSpacing + PARAMS.radius
		let height = PARAMS.numHexesInCol * PARAMS.radius * 2  + PARAMS.hexagonSpacing + PARAMS.radius
		const svgNS = 'http://www.w3.org/2000/svg';
		let svg = document.createElementNS(svgNS, 'svg');
		svg.setAttribute('width', width);
		svg.setAttribute('height', height);
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
		svg.setAttribute('class', 'hex-grid-svg');
		hexGridCoordinates.forEach((hex) => {
			hex.draw(svg);
		});

		let hexGrid = document.getElementById('hexGrid');
		hexGrid.appendChild(svg);

		// const svgNS = 'http://www.w3.org/2000/svg';
		// let svg = document.createElementNS(svgNS, 'svg');
		// svg.setAttribute('width', PARAMS.numHexesInRow * PARAMS.radius * 2);
		// svg.setAttribute('height', PARAMS.numHexesInCol * PARAMS.radius * 2);
		// svg.setAttribute('viewBox', `0 0 ${PARAMS.radius * 2} ${PARAMS.radius * 2}`);

		// // Create the polygon (hexagon) element
		// let polygon = document.createElementNS(svgNS, 'polygon');
		// polygon.setAttribute('points', this.points);
		// polygon.setAttribute('stroke', PARAMS.hexagonStrokeColor);
		// polygon.setAttribute('fill', PARAMS.hexagonColor);

		// // Append the polygon to the SVG
		// svg.appendChild(polygon);

		// // Append the SVG to the body (or to a specific element in your page)
		// let hexGrid = document.getElementById('hexGrid');
	};

	class Hexagon {
		constructor(radius, centerX, centerY, col, row) {
			this.radius = radius;
			this.centerX = centerX ;
			this.centerY = centerY ;
			this.col = col;
			this.row = row;
			this.points = calculateHexagonPoints(radius, centerX, centerY);
		}

		draw(svg) {
			// console.log(`🚀 ~ file: +page.svelte:92 ~ Hexagon ~ draw ~ this:`, this);
			const svgNS = 'http://www.w3.org/2000/svg';
			// Create the polygon (hexagon) element
			let polygon = document.createElementNS(svgNS, 'polygon');
			polygon.setAttribute('points', this.points);
			polygon.setAttribute('stroke', PARAMS.hexagonStrokeColor);
			polygon.setAttribute('fill', PARAMS.hexagonColor);
			polygon.setAttribute('class', 'hex');

			// Append the polygon to the SVG
			svg.appendChild(polygon);
		}
	}
</script>


<div id="hexGrid" />

<style>
	:global(.hex) {
		width: 100%;
		height: 100%;
		background: pink;

	}

	:global(.hex:hover) {
		fill: red;
		cursor: pointer;
	}

	:global(.hex-grid-svg) {
		width: 100%;
		height: 100%;
		width: 80vw;
		height: 80vh;
		border: 5pm solid black;
		padding: 1rem;
	}
</style>
