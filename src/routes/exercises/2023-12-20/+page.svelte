<script>
	import { getContext, onDestroy, onMount } from 'svelte';
	import Canvas from "$components/canvas/Canvas.svelte";
	import Hex from "$components/canvas/Hex.svelte";
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	$: global_width = 0;
	$: global_height = 0;
	$: console.log(`🚀 ~ file: Canvas.svelte:11 ~ global_width:`, global_width);
	$: console.log(`🚀 ~ file: Canvas.svelte:12 ~ global_height:`, global_height);

//get DPI


	onMount(() => {
		console.log('mounted');
		generateHexGridCoordinates()
	});

	onDestroy(() => {
		console.log('destroyed');
	});

	$: hex = calculateHexagonPoints(60, 106/2, 62, true);
	$: hexes = []
	$: console.log(`🚀 ~ file: Canvas.svelte:19 ~ hex:`, hex);

	const generateHexGridCoordinates = () => {
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				let x = i * 60 * 2 + 60;
				let y = j * 60 * 2 + 60;
				if(j % 2 === 1){
					x += 106/2;
				}
				const hex = calculateHexagonPoints(60, x, y);
				console.log(`🚀 ~ file: Canvas.svelte:29 ~ generateHexGridCoordinates ~ hex:`, hex)				
				hexes = [...hexes, hex];
			}
		}
	}


</script>

<svelte:window bind:innerWidth={global_width} bind:innerHeight={global_height} />

<main>
	<Canvas>
		{#each hexes as hex}
			<Hex {hex} />
		{/each}
	</Canvas>
</main>