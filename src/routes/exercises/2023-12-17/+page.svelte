<script>
	import { onMount } from 'svelte';
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	import { GenerateHexGrid } from '$utils/GenerateHexGrid';
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

	onMount(() => {
		console.log('mounted');
		let hex = calculateHexagonPoints(PARAMS.radius, 20, 20);
		console.log(`🚀 ~ file: +page.svelte:24 ~ onMount ~ hex:`, hex);
		GenerateHexGrid(hex.width.x, hex.width.y, PARAMS.numHexesInRow, PARAMS.numHexesInCol, [0,0], [1,0] );
	});
</script>

<canvas id="canvas" />

<style>
</style>
