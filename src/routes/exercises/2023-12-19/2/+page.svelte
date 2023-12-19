<script>
	import { onMount } from 'svelte';

	import { each } from 'svelte/internal';
	import Hex from './Hex.svelte';

	let hexArray = [];

	// Generate hexArray here

	let radius;
	let rows;
	let columns;

	// Set values for radius, rows, and columns here

	$: {
		if (radius && rows && columns) {
			hexArray = generateHexArray(radius, rows, columns);
		}
	}

	function generateHexArray(radius, rows, columns) {
		for (let j = 0; j < rows; j++) {
			for (let k = 0; k < 6; k++) {
				let x = i * radius * 2 + radius;
				let y = j * radius * 2 + radius;
				if (j % 2 === 1) {
					x += radius;
				}
				const hex = calculateHexagonPoints(radius, x, y);
				hexArray.push(hex);
			}
		}

		return hexArray;
	}

	onMount(() => {
		console.log('mounted');
		hexArray = generateCoords(PARAMS.radius, PARAMS.numHexesInRow, PARAMS.numHexesInCol);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<main>
	{#if hexArray.length > 0}
		<Canvas>
			{#each hexArray as hex (hex.id)}
				<Hex {hex} />
			{/each}
		</Canvas>
	{/if}
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: hsl(200, 50%, 10%);
	}
</style>
