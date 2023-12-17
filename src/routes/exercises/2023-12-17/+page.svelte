<script>
	import { onMount } from 'svelte';
	import {calculateHexagonPoints} from '$utils/CalculateHexPoints';

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
		let hexGridCoordinates = calculateHexagonPoints(
			PARAMS.radius,
			20,
			20,
			)
			console.log(`🚀 ~ file: +page.svelte:20 ~ onMount ~ hexGridCoordinates:`, hexGridCoordinates)
	});
</script>

<canvas id="canvas"></canvas>

<style>
</style>
