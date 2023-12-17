<script>
	import { onMount } from 'svelte';
	import { Pane } from 'tweakpane';
	import { browser } from '$app/environment';
	import CanvasManager from '$components/CanvasManager.svelte';
	import Slider from '$components/Slider.svelte';
	import Settings from '$components/Settings.svelte';
	import { get } from 'svelte/store';

	let hexGridCoordinates = [];

	$: hexesInColumns = PARAMS?.numHexesInCol | 6;
	$: console.log(`🚀 ~ file: +page.svelte:27 ~ hexesInColumns:`, hexesInColumns);
	$: hexesInRows = PARAMS?.numHexesInRow | 6;
	$: console.log(`🚀 ~ file: +page.svelte:30 ~ hexesInRows:`, hexesInRows);
	$: hexPointsArray = []
	$: console.log(`🚀 ~ file: +page.svelte:18 ~ hexPointsArray:`, hexPointsArray)
	
	$: PARAMS = {
		radius: 20,
		numHexesInRow: 6,
		numHexesInCol: 12,
		hexagonSpacing: 0,
		hexagonColor: 'black',
		hexagonStrokeColor: 'white',
		hexagonStrokeWidth: 2,
		hexagonStrokeOpacity: 1,
		hexagonOpacity: 1
	};

	$: centerX = 0;
	$: centerY = 0;
	$: hexGrid_X_Points = [];
	$: hexWidth  = getHexWidth();
	$: width = PARAMS.numHexesInRow * PARAMS.radius * 2 + PARAMS.hexagonSpacing + PARAMS.radius;
	$: height = PARAMS.numHexesInCol * PARAMS.radius * 2 + PARAMS.hexagonSpacing + PARAMS.radius;

	function initializePane() {
		const pane = new Pane();

		// let paneRows = pane.addBinding(PARAMS, 'numHexesInCol', {
		// 	min: 3,
		// 	max: 30,
		// 	step: 1
		// });

		// let paneCols = pane.addBinding(PARAMS, 'numHexesInRow', {
		// 	min: 3,
		// 	max: 30,
		// 	step: 1
		// });

		// paneCols.on('change', (value) => {
		// 	hexesInRows = PARAMS.numHexesInRow = value;
		// 	console.log(`🚀 ~ file: +page.svelte:52 ~ paneCols.on ~ value:`, value);
		// 	hexGridCoordinates = generateHexGridCoordinates(
		// 		PARAMS.radius,
		// 		CenterX,
		// 		CenterY,
		// 		hexesInColumns,
		// 		hexesInRows
		// 	);
		// 	let svg = getSvg();
		// 	drawAllHexes(svg);
		// });

		// paneRows.on('change', (value) => {
		// 	hexesInColumns = PARAMS.numHexesInCol = value;
		// 	console.log(`🚀 ~ file: +page.svelte:52 ~ paneCols.on ~ value:`, value);
		// 	hexGridCoordinates = generateHexGridCoordinates(
		// 		PARAMS.radius,
		// 		CenterX,
		// 		CenterY,
		// 		hexesInColumns,
		// 		hexesInRows
		// 	);
		// 	let svg = getSvg();
		// 	console.log(`🚀 ~ file: +page.svelte:68 ~ paneRows.on ~ svg:`, svg);

		// 	drawAllHexes(svg);
		// });

		// pane.addSeparator();
		// pane.addSepara
	}

	function onChange(e) {
		console.log('change');
		console.log(`🚀 ~ file: index.svelte ~ line 194 ~ onChange ~ e`, e.detail);
		// canvasRedraw();
	}

	function exportPaneState() {
		const state = pane.exportState();
		console.log(state);
	}

	function getHexWidth() {
		let xpoints = [];
		// iterate through the array Pointstring and collect all odd values into xpoints
		// and all even values into ypoints
		if (hexPointsArray.length === 0) {
			calculateHexagonPoints(PARAMS.radius, centerX, centerY);
		}
		for (let i = 0; i < hexPointsArray.length; i++) {

				let x = Number(hexPointsArray[i].split(',')[0]);
				console.log(`🚀 ~ file: +page.svelte:104 ~ getHexWidth ~ x:`, x)
				console.log(`🚀 ~ file: +page.svelte:102 ~ getHexWidth ~ hexPointsArray[i]:`, hexPointsArray[i])
				xpoints.push(x);
		}

		let xmax = Math.max(...xpoints);
		let xmin = Math.min(...xpoints);
		let xwidth = xmax - xmin;
		console.log(`🚀 ~ file: +page.svelte:116 ~ getHexWidth ~ xwidth:`, xwidth)
		return xwidth;
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
		hexPointsArray = points;

		console.log(`🚀 ~ file: +page.svelte:42 ~ calculateHexagonPoints ~ pointString:`, pointString);
		return pointString;
	}
	onMount(async () => {
		initializePane();
		hexGridCoordinates = await generateHexGridCoordinates(
			PARAMS.radius,
			centerX,
			centerY,
			hexesInColumns,
			hexesInRows
		);
		let svg = initSvg();
		drawAllHexes(svg);
		let hexGrid = document.getElementById('hexGrid');
		hexGrid.appendChild(svg);
	});

	const generateHexGridCoordinates = (radius, centerX, centerY, cols, rows) => {
		console.log(
			`🚀 ~ file: +page.svelte:112 ~ generateHexGridCoordinates ~ radius, centerX, centerY, cols, rows:`,
			radius,
			centerX,
			centerY,
			cols,
			rows
		);
		// Create the hexagons coordinates array so they can all be drawn at once
		hexGridCoordinates = [];
		hexGrid_X_Points = [];
		for (let i = 0; i < hexesInColumns; i++) {
			for (let j = 0; j < hexesInRows; j++) {
				// if odd row, offset x
				if (i % 2 === 1) {
					const hex = new Hexagon(
						radius,
						(centerX + PARAMS.hexagonSpacing + hexWidth) * (j + 1) + hexWidth / 2,
						(centerY + PARAMS.hexagonSpacing + radius) * (i + 1) ,
						i,
						j
					);
					hexGridCoordinates.push(hex);
					hexGrid_X_Points.push(hex.x);
				} else {
					const hex = new Hexagon(
						radius,
						(centerX + PARAMS.hexagonSpacing + hexWidth) * (j + 1),
						(centerY + PARAMS.hexagonSpacing + radius ) * (i + 1),
						i,
						j
					);
					hexGridCoordinates.push(hex);
					hexGrid_X_Points.push(hex.x);
				}
			}
		}
		return hexGridCoordinates;
	};
	const initSvg = () => {
		const svgNS = 'http://www.w3.org/2000/svg';
		let svg = document.createElementNS(svgNS, 'svg');
		svg.setAttribute('width', width);
		console.log(`🚀 ~ file: +page.svelte:156 ~ initSvg ~ width:`, width);
		svg.setAttribute('height', height);
		console.log(`🚀 ~ file: +page.svelte:158 ~ initSvg ~ height:`, height);
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
			// console.log(`🚀 ~ file: +page.svelte:174 ~ hexGridCoordinates.forEach ~ hex:`, hex);
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

<Settings >
	<div slot="rightpanel">
		<CanvasManager {PARAMS} on:change={onChange}>

		</CanvasManager>
	</div>
</Settings>

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
