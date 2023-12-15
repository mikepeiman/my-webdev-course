<script>
	import { onMount } from 'svelte';

	$: radius = 100;
	$: centerX = 150;
	$: centerY = 150;
	$: cols = PARAMS.numHexesInCol;
	$: rows = PARAMS.numHexesInRow;
	$: hexagonSize = PARAMS.hexagonSize;
	$: hexagonSpacing = PARAMS.hexagonSpacing;
	$: hexagonColor = PARAMS.hexagonColor;
	$: hexagonStrokeColor = PARAMS.hexagonStrokeColor;
	$: hexagonStrokeWidth = PARAMS.hexagonStrokeWidth;
	$: hexagonStrokeOpacity = PARAMS.hexagonStrokeOpacity;
	$: hexagonOpacity = PARAMS.hexagonOpacity;

	let PARAMS = {
		radius: 100,
		centerX: 150,
		centerY: 150,
		numHexesInRow: 5,
		numHexesInCol: 5,
		hexagonSize: 50,
		hexagonSpacing: 10,
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
		return points.join(' ');
	}
	onMount(() => {
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
	});

	const createNewHex = () => {
		const hex = new Hexagon(PARAMS.radius, PARAMS.centerX, PARAMS.centerY);
		console.log(`🚀 ~ file: +page.svelte:79 ~ createNewHex ~ hex:`, hex)
		hex.draw();
	};


	class Hexagon {
		constructor(radius, centerX, centerY) {
			this.radius = radius;
			this.centerX = centerX;
			this.centerY = centerY;
			this.points = calculateHexagonPoints(radius, centerX, centerY);
		}

		draw(el) {
			const svgNS = 'http://www.w3.org/2000/svg';
			let svg = document.createElementNS(svgNS, 'svg');
			svg.setAttribute('width', PARAMS.numHexesInRow * PARAMS.radius * 2);
			svg.setAttribute('height', PARAMS.numHexesInCol * PARAMS.radius * 2);
			svg.setAttribute('viewBox', `0 0 ${PARAMS.radius * 2} ${PARAMS.radius * 2}`);

			// Create the polygon (hexagon) element
			let polygon = document.createElementNS(svgNS, 'polygon');
			polygon.setAttribute('points', this.points);
			polygon.setAttribute('stroke', PARAMS.hexagonStrokeColor);
			polygon.setAttribute('fill', PARAMS.hexagonColor);

			// Append the polygon to the SVG
			svg.appendChild(polygon);

			// Append the SVG to the body (or to a specific element in your page)
			let hexGrid = document.getElementById('hexGrid');
			el.appendChild(svg);

		}
	}
</script>

<div class="input-group-wrapper">
   <input type="range" min="0" max="100" bind:value={PARAMS.radius} />
   <input type="range" min="0" max="100" bind:value={PARAMS.centerX} />
   <input type="range" min="0" max="100" bind:value={PARAMS.centerY} />
   <input type="range" min="0" max="100" bind:value={PARAMS.numHexesInRow} />

   </div>
<div id="hexGrid" class="flex flex-wrap">
{#each Array(cols) as col}
{#each Array(rows) as row}
	 <!-- content here -->
	 <div class="hex" id="hex-{row}-{col}" on:load={() => createNewHex(this)}>
		
	 </div>
	 
	 {/each}
{/each}
	 </div>