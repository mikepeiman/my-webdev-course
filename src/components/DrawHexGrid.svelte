<script>
	import { onMount } from 'svelte';
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	import { GenerateHexGrid } from '$utils/GenerateHexGrid';
	import { generateHexArray } from '$utils/GenerateHexGrid';
	$: hexArray = [];

	$: width = 400;
	$: height = 400;

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
		let firsthex = calculateHexagonPoints(PARAMS.radius, 20, 20);
		console.log(`🚀 ~ file: +page.svelte:24 ~ onMount ~ firsthex:`, firsthex);
		hexArray = generateHexArray(
			PARAMS.radius,
			firsthex.width.x,
			firsthex.width.y * 3/4,
			PARAMS.numHexesInRow,
			PARAMS.numHexesInCol,
			0,
			0
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
				style="fill:{PARAMS.hexagonColor};stroke:{PARAMS.hexagonStrokeColor};stroke-width:{PARAMS.hexagonStrokeWidth};fill-opacity:{PARAMS.hexagonOpacity};stroke-opacity:{PARAMS.hexagonStrokeOpacity}"
			/>
		{/each}
	</svg>


</div>

<style>
    :global(.hexagon) {
        fill-opacity: 1;
        stroke-opacity: 1;

    }
    :global(.hexagon:hover) {
        fill-opacity: 0.5;
        stroke-opacity: 0.5;
        fill: cyan;
        transition: all 0.2s ease-in-out;
    }
</style>
