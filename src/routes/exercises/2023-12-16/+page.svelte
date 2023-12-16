<script>
	import { onMount } from 'svelte';
	// tweakpane
	import { Pane } from 'tweakpane';
	import { browser } from '$app/environment';

	let hexGridCoordinates = [];

	let PARAMS = {
		radius: 20,
		centerX: 40,
		centerY: 40,
		numHexesInRow: 12,
		numHexesInCol: 12,
		hexagonSpacing: 0,
		hexagonColor: 'black',
		hexagonStrokeColor: 'white',
		hexagonStrokeWidth: 2,
		hexagonStrokeOpacity: 1,
		hexagonOpacity: 1
	};

	$: numRows = PARAMS.numHexesInCol.value;
	$: console.log(`🚀 ~ file: +page.svelte:24 ~ numRows:`, numRows)
	$: numCols = PARAMS.numHexesInRow.value;
	$: console.log(`🚀 ~ file: +page.svelte:26 ~ numCols:`, numCols)
	$: width = PARAMS.numHexesInRow * PARAMS.radius * 2 + PARAMS.hexagonSpacing + PARAMS.radius;
	$: height = PARAMS.numHexesInCol * PARAMS.radius * 2 + PARAMS.hexagonSpacing + PARAMS.radius;

	function initializePane() {
		const pane = new Pane();

		let paneRows = pane.addBinding(PARAMS, 'numHexesInCol', {
			min: 3,
			max: 30,
			step: 1
		});

		let paneCols = pane.addBinding(PARAMS, 'numHexesInRow', {
			min: 3,
			max: 30,
			step: 1
		});

		paneCols.on('change', (value) => {
			paneCols = PARAMS.numHexesInRow = value;
			console.log(`🚀 ~ file: +page.svelte:52 ~ paneCols.on ~ value:`, value);
			hexGridCoordinates = generateHexGridCoordinates(
				PARAMS.radius,
				PARAMS.centerX,
				PARAMS.centerY,
				numRows,
				numCols
			);
			let svg = getSvg();
			drawAllHexes(svg);
		});

		paneRows.on('change', (value) => {
			PARAMS.numHexesInCol = value;
			console.log(`🚀 ~ file: +page.svelte:52 ~ paneCols.on ~ value:`, value);
			hexGridCoordinates = generateHexGridCoordinates(
				PARAMS.radius,
				PARAMS.centerX,
				PARAMS.centerY,
				numRows,
				numCols
			);
			let svg = getSvg();
			console.log(`🚀 ~ file: +page.svelte:68 ~ paneRows.on ~ svg:`, svg);

			drawAllHexes(svg);
		});

		// pane.addSeparator();
		// pane.addSepara
	}

	function exportPaneState() {
		const state = pane.exportState();
		console.log(state);
	}

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
		initializePane();
		hexGridCoordinates = await generateHexGridCoordinates(
			PARAMS.radius,
				PARAMS.centerX,
				PARAMS.centerY,
				numRows,
				numCols
		);
		let svg = initSvg();
		drawAllHexes(svg);
		let hexGrid = document.getElementById('hexGrid');
		hexGrid.appendChild(svg);
	});

	const generateHexGridCoordinates = (radius, centerX, centerY, cols, rows) => {
		console.log(`🚀 ~ file: +page.svelte:112 ~ generateHexGridCoordinates ~ radius, centerX, centerY, cols, rows:`, radius, centerX, centerY, cols, rows)
		// Create the hexagons coordinates array so they can all be drawn at once
		hexGridCoordinates = [];
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				// if odd row, offset x
				if (i % 2 === 1) {
					const hex = new Hexagon(
						radius,
						(centerX + PARAMS.hexagonSpacing) * (j + 1) + radius,
						(centerY + PARAMS.hexagonSpacing) * (i + 1) - radius,
						i,
						j
					);
					hexGridCoordinates.push(hex);
				} else {
					const hex = new Hexagon(
						radius,
						(centerX + PARAMS.hexagonSpacing) * (j + 1),
						(centerY + PARAMS.hexagonSpacing) * (i + 1) - radius,
						i,
						j
					);
					hexGridCoordinates.push(hex);
				}
			}
		}
		return hexGridCoordinates;
	};
	const initSvg = () => {
		const svgNS = 'http://www.w3.org/2000/svg';
		let svg = document.createElementNS(svgNS, 'svg');
		svg.setAttribute('width', width);
		svg.setAttribute('height', height);
		svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
		svg.setAttribute('class', 'hex-grid-svg');
		return svg;
	};

	const getSvg = () => {
		return document.querySelector('.hex-grid-svg')
			? document.querySelector('.hex-grid-svg')
			: initSvg();
	};

	const drawAllHexes = (svg) => {
		hexGridCoordinates.forEach((hex) => {
			hex.draw(svg);
		});
	};

	class Hexagon {
		constructor(radius, centerX, centerY, col, row) {
			this.radius = radius;
			this.centerX = centerX;
			this.centerY = centerY;
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
	:global(.tp-dfwv) {
		top: 5rem !important;
	}
	#hexGrid {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	:global(.hex) {
		width: 100%;
		height: 100%;
		background: pink;
	}

	:global(.hex:hover) {
		fill: hsla(205, 100%, 50%, 0.75);
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
