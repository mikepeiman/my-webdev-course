<script>
	import { onMount } from 'svelte';
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	import { GenerateHexGrid } from '$utils/GenerateHexGrid';
	import { generateHexArray } from '$utils/GenerateHexGrid';
	import DrawHexGrid from '$components/DrawHexGrid.svelte';
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

	$: hexArray = [];

	onMount(() => {
		console.log('mounted');
		let hex = calculateHexagonPoints(PARAMS.radius, 20, 20);
		console.log(`🚀 ~ file: +page.svelte:24 ~ onMount ~ hex:`, hex);
		GenerateHexGrid(hex.width.x, hex.width.y, PARAMS.numHexesInRow, PARAMS.numHexesInCol, "x" );
		hexArray = generateHexArray(PARAMS.radius, hex.width.x, hex.width.y, PARAMS.numHexesInRow, PARAMS.numHexesInCol, "y" );
		console.log(`🚀 ~ file: +page.svelte:27 ~ onMount ~ hexArray:`, hexArray)
	});
</script>


<DrawHexGrid />
<style>
</style>
