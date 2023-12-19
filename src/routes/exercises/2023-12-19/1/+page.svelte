<script lang="ts">
    import Canvas from "$components/canvas/Canvas.svelte";
	import Hex from "$components/canvas/Hex.svelte";
    import Line from "$components/canvas/Line.svelte";
	import { calculateHexagonPoints } from "$utils/CalculateHexPoints";
	import { onMount } from "svelte";

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

	$: hexes = [];
	let width = 1000, height = 1000
	$: hexWidth = width / PARAMS.numHexesInRow;
    $: hexHeight = height / PARAMS.numHexesInCol;
    $: console.log(`🚀 ~ file: +page.svelte:24 ~ hexHeight:`, hexHeight)
	$: console.log(`🚀 ~ file: +page.svelte:23 ~ hexWidth:`, hexWidth);

    onMount(async () => {
        // width = window.innerWidth;
        // height = window.innerHeight;
        console.log(`🚀 ~ file: +page.svelte:32 ~ onMount ~ hexWidth, hexHeight:`, hexWidth, hexHeight)
        hexes = await generateCoords(hexWidth, hexHeight);
    });

    const generateCoords = (hexWidth, hexHeight) => {
		let x_hexes = PARAMS.numHexesInRow;
		let y_hexes = PARAMS.numHexesInCol;
		let hex, x, y
		for (let i = 0; i < x_hexes; i++) {
			for (let j = 0; j < y_hexes; j++) {
				// console.log(`🚀 ~ file: +page.svelte:23 ~ beforeUpdate ~ hex:`, hex);
				x = hexWidth * (i + 1);
				y = hexHeight * (j + 1);
                hex = calculateHexagonPoints(hexHeight, x, y, true);
                // console.log(`🚀 ~ file: +page.svelte:45 ~ generateCoords ~ hex:`, hex)
                hexes = [...hexes, hex];
			}
		}
        console.log(`🚀 ~ file: +page.svelte:51 ~ generateCoords ~ hexes:`, hexes)
		return hexes;
	};
  </script>
  <svelte:window bind:innerWidth={width} bind:innerHeight={height} />
  <main>
    {#await hexes}
    <p>Loading...</p>
    {:then}
    <Canvas>
      {#each hexes as hex}
        <Hex {hex} />
      {/each}
    </Canvas>
    {/await}
  </main>