<script>
	import { onMount } from 'svelte';

	$: cols = PARAMS.numHexesInCol;
	$: console.log(`🚀 ~ file: +page.svelte:8 ~ cols: ${cols} rows: ${rows}`);
	$: rows = PARAMS.numHexesInRow;

	let hexGridCoordinates = [];

	let PARAMS = {
		radius: 20,
		centerX: 50,
		centerY: 50,
		numHexesInRow: 15,
		numHexesInCol: 15,
		hexagonSize: 40,
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
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);
			points.push(`${x},${y}`);
		}
		let pointString = points.join(' ');
		// console.log(`🚀 ~ file: +page.svelte:42 ~ calculateHexagonPoints ~ pointString:`, pointString);
		return pointString;
	}
	onMount(async () => {
		// Create the SVG element
		// const svgNS = 'http://www.w3.org/2000/svg';
		// let svg = document.createElementNS(svgNS, 'svg');
		// svg.setAttribute('width', '300');
		// svg.setAttribute('height', '300');
		// svg.setAttribute('viewBox', '0 0 300 300');

		// // Create the polygon (hexagon) element
		// let polygon = document.createElementNS(svgNS, 'polygon');
		// polygon.setAttribute(
		// 	'points',
		// 	calculateHexagonPoints(PARAMS.radius, PARAMS.centerX, PARAMS.centerY)
		// );
		// polygon.setAttribute('stroke', PARAMS.hexagonStrokeColor);
		// polygon.setAttribute('fill', PARAMS.hexagonColor);

		// // Append the polygon to the SVG
		// svg.appendChild(polygon);

		// // Append the SVG to the body (or to a specific element in your page)
		// let hexGrid = document.getElementById('hexGrid');
		// hexGrid.appendChild(svg);

		// Create the hexagons using Hexagon class and PARAMS.numHexesInRow and PARAMS.numHexesInCol
		for (let i = 0; i < PARAMS.numHexesInRow; i++) {
			for (let j = 0; j < PARAMS.numHexesInCol; j++) {
				// const hex = new Hexagon(PARAMS.hexagonSize, PARAMS.centerX + PARAMS.hexagonSpacing * j, PARAMS.centerY + PARAMS.hexagonSpacing * i);
				// hex.draw();
			}
		}
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
				const hex = new Hexagon(
					radius,
					(centerX + PARAMS.hexagonSpacing) * j,
					(centerY + PARAMS.hexagonSpacing) * i,
					i,
					j
				);
				hexGridCoordinates.push(hex);
			}
		}
		return hexGridCoordinates;
	};

	const drawAllHexes = () => {
		let width = PARAMS.numHexesInRow * PARAMS.radius * 2;
		let height = PARAMS.numHexesInCol * PARAMS.radius * 2;
		const svgNS = 'http://www.w3.org/2000/svg';
		let svg = document.createElementNS(svgNS, 'svg');
		svg.setAttribute('width', width);
		svg.setAttribute('height', height);
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

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

	const createNewHex = (col, row) => {
		const hex = new Hexagon(PARAMS.radius, PARAMS.centerX, PARAMS.centerY, col, row);
		console.log(`🚀 ~ file: +page.svelte:78 ~ createNewHex ~ col, row:`, col, row);
		console.log(`🚀 ~ file: +page.svelte:79 ~ createNewHex ~ hex:`, hex);
		hex.draw();
	};

	class Hexagon {
		constructor(radius, centerX, centerY, col, row) {
			// console.log(`🚀 ~ file: +page.svelte:85 ~ Hexagon ~ constructor ~ col, row:`, col, row);
			this.radius = radius;
			this.centerX = centerX;
			this.centerY = centerY;
			this.col = col;
			this.row = row;
			// console.log(
			// 	`🚀 ~ file: +page.svelte:103 ~ Hexagon ~ constructor ~ this.centerX: ${this.centerX}   this.centerY: ${this.centerY}`
			// );
			this.points = calculateHexagonPoints(radius, centerX, centerY);
			// console.log(
			// 	`🚀 ~ file: +page.svelte:146 ~ Hexagon ~ constructor ~ this.points:`,
			// 	this.points
			// );
		}

		draw(svg) {
			console.log(`🚀 ~ file: +page.svelte:164 ~ Hexagon ~ draw ~ svg:`, svg)
			// console.log(`🚀 ~ file: +page.svelte:92 ~ Hexagon ~ draw ~ this:`, this);
			const svgNS = 'http://www.w3.org/2000/svg';
			// Create the polygon (hexagon) element
			let polygon = document.createElementNS(svgNS, 'polygon');
			polygon.setAttribute('points', this.points);
			polygon.setAttribute('stroke', PARAMS.hexagonStrokeColor);
			polygon.setAttribute('fill', PARAMS.hexagonColor);

			// Append the polygon to the SVG
			svg.appendChild(polygon);
		}
	}
</script>

<!-- 
<div class="input-group-wrapper">
	<input type="range" min="0" max="100" bind:value={PARAMS.radius} />
	<input type="range" min="0" max="100" bind:value={PARAMS.centerX} />
	<input type="range" min="0" max="100" bind:value={PARAMS.centerY} />
	<input type="range" min="0" max="100" bind:value={PARAMS.numHexesInRow} />
</div> -->

<div id="hexGrid" />

<style>
	.hex {
		width: 100%;
		height: 100%;
	}
</style>
