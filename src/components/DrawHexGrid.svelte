<script>
	import { onMount } from 'svelte';
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	import { GenerateHexGrid } from '$utils/GenerateHexGrid';
    import { generateHexArray } from '$utils/GenerateHexGrid';
	$: hexArray = [];

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
			firsthex.width.y,
			PARAMS.numHexesInRow,
			PARAMS.numHexesInCol,
			[0, 0],
			[1, 0]
            );
            console.log(`🚀 ~ file: DrawHexGrid.svelte:25 ~ onMount ~ hexArray:`, hexArray)
	});
</script>

<div class="grid">
    {#each hexArray as hex, i (i)}
        <svg height={hex.height} width={hex.width} x={hex.x} y={hex.y} top={hex.y} left={hex.x} class="absolute top-[{hex.y}] left-[{hex.x}]">
            <polygon points={hex.points} style="fill:{PARAMS.hexagonColor};stroke:{PARAMS.hexagonStrokeColor};stroke-width:{PARAMS.hexagonStrokeWidth};fill-opacity:{PARAMS.hexagonOpacity};stroke-opacity:{PARAMS.hexagonStrokeOpacity}"/>
        </svg>
    {/each}
</div>
<style>
</style>
