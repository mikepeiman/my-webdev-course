<script>
	import { getContext, onDestroy, onMount } from 'svelte';
	import Canvas from "$components/canvas/Canvas.svelte";
	import Hex from "$components/canvas/Hex.svelte";
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	$: global_width = 0;
	$: global_height = 0;
	$: console.log(`🚀 ~ file: Canvas.svelte:11 ~ global_width:`, global_width);
	$: console.log(`🚀 ~ file: Canvas.svelte:12 ~ global_height:`, global_height);

	onMount(() => {
		console.log('mounted');
	});

	onDestroy(() => {
		console.log('destroyed');
	});

	$: hex = calculateHexagonPoints(60, 106/2, 62, true);
	$: console.log(`🚀 ~ file: Canvas.svelte:19 ~ hex:`, hex);


</script>

<svelte:window bind:innerWidth={global_width} bind:innerHeight={global_height} />

<main>
	<Canvas>
		<Hex {hex} />
	</Canvas>
</main>