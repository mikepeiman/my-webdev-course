<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		console.log(`canvas component mounted`);
		await sketchOnCanvas();
	});

	// create reactive variables for screen width and height, but that checks if window is defined
	let width = 0;
	let height = 0;
	$: if (typeof window !== 'undefined') {
		width = window.innerWidth;
		console.log(`🚀 ~ file: QuickCanvas.svelte:14 ~ width:`, width);
		height = window.innerHeight;
		console.log(`🚀 ~ file: QuickCanvas.svelte:16 ~ height:`, height);
	}
	let center = {
		x: 0,
		y: 0
	};
	$: center.x = width / 2;
	$: center.y = height / 2;

	function sketchOnCanvas() {
		let canvas = document.getElementById('canvas');
		console.log(
			`🚀 ~ file: QuickCanvas.svelte:22 ~ sketchOnCanvas ~ c?.clientWidth:`,
			canvas?.clientWidth
		);
		console.log(`🚀 ~ file: QuickCanvas.svelte:21 ~ sketchOnCanvas ~ canvas:`, canvas);
		let ctx = canvas.getContext('2d');
		// let center = {
		//     x: width / 2,
		//     y: height / 2
		// }
		console.log(`🚀 ~ file: QuickCanvas.svelte:26 ~ sketchOnCanvas ~ center:`, center);
		ctx.clearRect(0, 0, width, height);
		ctx.beginPath();
		console.log(`🚀 ~ file: QuickCanvas.svelte:29 ~ sketchOnCanvas ~ ctx:`, ctx);

		ctx.arc(center.x, center.y, center.y / 2, 0, 2 * Math.PI);
		ctx.strokeStyle = '#af00f0';
		ctx.fillStyle = '#00acff';
		ctx.lineWidth = 10;
		ctx.stroke();
		ctx.fill();

		ctx.lineTo(center.x, center.y);
		ctx.lineTo(0, center.y);
		ctx.lineTo(center.x, 0);
	}
</script>

<canvas id="canvas" />

<style>
	#canvas {
		width: 100%;
		height: 100%;
		display: block;
		box-shadow: 0px 2px 12px -2px rgba(0, 0, 0, 0.15);
		margin: 0;
		padding: 0;
		border: 0;
		outline: 0;
		background: #111;
	}
</style>
