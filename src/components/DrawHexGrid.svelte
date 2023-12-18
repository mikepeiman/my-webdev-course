<script>
	import { onMount } from 'svelte';
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	import { GenerateHexGrid } from '$utils/GenerateHexGrid';
	import { generateHexArray } from '$utils/GenerateHexGrid';
	$: hexArray = [];

	$: width = PARAMS.radius * 2 * PARAMS.numHexesInRow + PARAMS.radius
	$: height = PARAMS.radius * 2 * PARAMS.numHexesInCol + PARAMS.radius;

	let PARAMS = {
		radius: 20,
		numHexesInRow: 12,
		numHexesInCol: 12,
		hexagonSpacing: 0,
		hexagonColor: 'black',
		hexagonStrokeColor: 'green',
		hexagonStrokeWidth: 2,
		hexagonStrokeOpacity: 1,
		hexagonOpacity: 1
	};

	onMount(() => {
		console.log('mounted');
		let firsthex = calculateHexagonPoints(PARAMS.radius, 20, 20, false);
		console.log(`🚀 ~ file: +page.svelte:24 ~ onMount ~ firsthex:`, firsthex);
		hexArray = generateHexArray(
			PARAMS.radius,
			firsthex.width,
			firsthex.height,
			PARAMS.numHexesInRow,
			PARAMS.numHexesInCol,
			"y"
		);
		console.log(`🚀 ~ file: DrawHexGrid.svelte:25 ~ onMount ~ hexArray:`, hexArray);
	});
</script>

<div class="grid w-full">
	<svg viewBox="0 0 {width} {height}">
		{#each hexArray as hex, i (i)}
			<polygon
				points={hex.points}
                class="hexagon"
				style="stroke: hsl({i + 30}, 50%, 50%); fill: hsl({i}, 50%, 50%); opacity: {PARAMS.hexagonOpacity}"
			/>
		{/each}
	</svg>


</div>

<style>
    :global(.hexagon) {
        fill-opacity: 1;
        stroke-opacity: 1;
        stroke: white;
        fill: black;
        transition: all 0.1s ease-in-out;

    }
    :global(.hexagon:hover) {
        fill-opacity: 0.25;
        stroke-opacity: 0.5;
        fill: cyan;
        transition: all 0.1s ease-in-out;
    }
</style>
