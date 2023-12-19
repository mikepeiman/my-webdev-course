<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { Point, CanvasContext } from './types';
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';

	export let hex;
	// export let vertices: Number;

	// let hex = calculateHexagonPoints(60, 106/2, 62, true);
  let points = hex.pointsAsArray;
  // console.log(`🚀 ~ file: Hex.svelte:11 ~ points:`, points)
	// console.log(`🚀 ~ file: Hex.svelte:9 ~ hex:`, hex);



	let canvasContext = getContext('canvas') as CanvasContext;
	onMount(() => {
		canvasContext.addDrawFn(draw);
	});

	onDestroy(() => {
		canvasContext.removeDrawFn(draw);
	});

	function draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		for (let i = 0; i < points.length; i++) {
      let point = points[i].split(',');
      // console.log(`🚀 ~ file: Hex.svelte:27 ~ draw ~ point:`, point)
			ctx.lineTo(point[0], point[1]);
		}
		ctx.closePath();
		ctx.stroke();
	}
</script>
