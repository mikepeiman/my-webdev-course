<script>
	import { onMount } from "svelte";


    onMount(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        let time = 0;
        const radius = 50;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        function animate(timestamp) {
            context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

            // calculate new position
            let x = centerX + radius * Math.cos(time);
            let y = centerY + radius * Math.sin(time);

            // draw dot
            context.beginPath();
            context.arc(x, y, 2, 0, 2 * Math.PI);
            context.fill();

            time += 0.01; // adjust this to change the speed of the animation

            requestAnimationFrame(animate); // request next frame
        }

        animate();
    })
</script>

<canvas id="canvas"></canvas>

<style>
    canvas {
        width: 100%;
        height: 100%;

    }
</style>