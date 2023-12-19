<script>
	import { beforeUpdate, onMount } from 'svelte';
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	import { GenerateHexGrid } from '$utils/GenerateHexGrid';
	import { generateHexArray } from '$utils/GenerateHexGrid';
	import DrawHexGrid from '$components/DrawHexGrid.svelte';
	import TextKeyEvents from '$components/TextKeyEvents.svelte';
	let PARAMS = {
		radius: 20,
		numHexesInRow: 12,
		numHexesInCol: 12,
		hexagonSpacing: 0,
		hexagonColor: 'black',
		hexagonStrokeColor: 'white',
		hexagonStrokeWidth: 2,
		hexagonStrokeOpacity: 1,
		hexagonOpacity: 1
	};

	$: svgs = [];
	$: width = window ? window.innerWidth : 0;
	$: hexSize = width / PARAMS.numHexesInRow;
	$: console.log(`🚀 ~ file: +page.svelte:23 ~ hexSize:`, hexSize);
	const generateSvgs = () => {
		let x_hexes = PARAMS.numHexesInRow;
		let y_hexes = PARAMS.numHexesInCol;
		let hex, x, y, svg;
		hex = calculateHexagonPoints(PARAMS.radius, 34.64, 40, true);
		for (let i = 0; i < x_hexes; i++) {
			for (let j = 0; j < y_hexes; j++) {
				// console.log(`🚀 ~ file: +page.svelte:23 ~ beforeUpdate ~ hex:`, hex);
				x = hex.width * i;
				y = hex.height * j;
				svg = new SVG(x, y, hex.width, hex.height, hex.points);
				svgs = [...svgs, svg];
				// console.log(`🚀 ~ file: +page.svelte:32 ~ beforeUpdate ~ svg:`, svg);
			}
		}
		return svgs;
	};

	onMount(() => {
		console.log('mounted');
		console.log(`🚀 ~ file: +page.svelte:43 ~ onMount ~ svgs:`, svgs);
		svgs = generateSvgs();
		console.log(`🚀 ~ file: +page.svelte:43 ~ onMount ~ svgs:`, svgs);
		// generate a set of hexagons as individual svgs that fit perfectly side-by-side and can be used to create a grid
	});

	class SVG {
		constructor(x, y, width, height, points) {
			this.x = x;
			this.y = y;
			this.width = width * PARAMS.numHexesInRow;
			this.height = height * PARAMS.numHexesInCol;
			this.points = points;
		}
		draw() {
			return `<svg viewBox="0 0 ${this.width} ${this.height}" width=${this.width} height=${this.height} points=${this.points}  class="svg-item w-full h-full" fill="red" />`;
		}
	}
</script>

<!-- <TextKeyEvents /> -->

<canvas id="canvas1" class="flex">
	{#each svgs as svgItem, i}
		<div class="hex-wrapper bg-cyan-500 w-full">
			<svg
				viewBox="0 0 {svgItem.width} {svgItem.height}"
				width={svgItem.width}
				height={svgItem.height}
				class="svg-item w-full h-full"
				fill="red"
			/>
		</div>
	{/each}
</canvas>

<style>
	.hex-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: hsl(200, 50%, 10%);
	}
	#canvas1 {
		background-color: hsla(200, 50%, 10%, 0.6);

		width: calc(100vw - 5rem);
		height: calc(100vh - 2.5rem);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
