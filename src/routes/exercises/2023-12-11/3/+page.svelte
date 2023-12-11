<script>
	import { onMount } from "svelte";


    onMount(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        let time = 0;
        const radius = 50;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        let planetPath = new Path2D('M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2');

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

            // calculate new position
            let x = centerX + radius * Math.cos(time);
            let y = centerY + radius * Math.sin(time);

            // draw dot
            context.beginPath();
            context.strokeStyle = `hsl(${time * 100}, 100%, 50%)`;
            context.stroke(planetPath);

            context.arc(x, y, 2, 0, 2 * Math.PI);
            context.fillStyle = `hsl(${time * 100}, 100%, 50%)`;
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