<script lang="ts">
	import { onMount, setContext, onDestroy } from 'svelte';
	import type { DrawFn } from './types';
	export let clearFrames = true;
	let frameId: number;
	let canvasElement: HTMLCanvasElement;
	let fnsToDraw = [] as DrawFn[];
	$: dpi = 4;

	setContext('canvas', {
		addDrawFn: (fn: DrawFn) => {
			fnsToDraw.push(fn);
		},
		removeDrawFn: (fn: DrawFn) => {
			let index = fnsToDraw.indexOf(fn);
			if (index > -1) {
				fnsToDraw.splice(index, 1);
			}
		}
	});

	onMount(() => {
		dpi = window.devicePixelRatio;
		// get canvas context
		let ctx = canvasElement.getContext('2d');
		let style_height = +getComputedStyle(canvasElement).getPropertyValue('height').slice(0, -2);
		//get CSS width
		let style_width = +getComputedStyle(canvasElement).getPropertyValue('width').slice(0, -2);
		canvasElement.setAttribute('height', style_height * dpi);
		canvasElement.setAttribute('width', style_width * dpi);
		frameId = requestAnimationFrame(() => draw(ctx, clearFrames));
	});

	onDestroy(() => {
		if (frameId) {
			cancelAnimationFrame(frameId);
		}
	});

	function draw(ctx: CanvasRenderingContext2D, clearFrames) {
		if (clearFrames) {
			ctx.clearRect(0, 0, canvasElement.width, canvasElement.width);
		}
		fnsToDraw.forEach((fn) => fn(ctx));
		frameId = requestAnimationFrame(() => draw(ctx, clearFrames));
	}

	function registerMouseEvents(e) {
		// console.log(`🚀 ~ file: Canvas.svelte:43 ~ registerMouseEvents ~ e:`, e);
	}
</script>

<canvas
	id="canvas1"
	on:mousemove={registerMouseEvents}
	on:mouseleave={registerMouseEvents}
	bind:this={canvasElement}
/>
<slot />

<style>
	#canvas1 {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
</style>
