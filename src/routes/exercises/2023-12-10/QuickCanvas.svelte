<script>
	import { onMount } from 'svelte';

	onMount(() => {
		console.log(`canvas component mounted`);
        sketchOnCanvas();
	});

    // create reactive variables for screen width and height, but that checks if window is defined
    let width = 0;
    let height = 0;
    $: if (typeof window !== 'undefined') {
        width = window.innerWidth;
        console.log(`🚀 ~ file: QuickCanvas.svelte:14 ~ width:`, width)
        height = window.innerHeight;
        console.log(`🚀 ~ file: QuickCanvas.svelte:16 ~ height:`, height)
    }
    
	function sketchOnCanvas() {
        let c = document.getElementById('canvas-1');
        console.log(`🚀 ~ file: QuickCanvas.svelte:21 ~ sketchOnCanvas ~ c:`, c)
        let ctx = c.getContext('2d');
        let center = {
            x: width / 2,
            y: height / 2
        }
        console.log(`🚀 ~ file: QuickCanvas.svelte:26 ~ sketchOnCanvas ~ center:`, center)
		ctx.beginPath();
        console.log(`🚀 ~ file: QuickCanvas.svelte:29 ~ sketchOnCanvas ~ ctx:`, ctx)
        
		ctx.arc(center.x, center.y, center.y / 2, 0, 2 * Math.PI);
        ctx.strokeStyle = '#af00f0';
        ctx.fillStyle = 'green';
        ctx.lineWidth = 10;
		ctx.stroke();
        ctx.fill();
	}
</script>

<canvas id="canvas-1" />

<style>
	#canvas-1 {
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
