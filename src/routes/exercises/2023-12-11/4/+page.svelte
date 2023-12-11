<script>
	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';

	onMount(() => {
        let canvas = document.getElementById('canvas');
		const app = new PIXI.Application({
			background: '#1099bb',
			resizeTo: canvas
		});
        canvas.style.width = '100%';
        canvas.style.height = '100%';
		canvas.appendChild(app.view);

		// create a new Sprite from an image path
		const bunny = PIXI.Sprite.from('https://pixijs.com/assets/bunny.png');

		// add to stage
		app.stage.addChild(bunny);

		// center the sprite's anchor point
		bunny.anchor.set(0.5);

		// move the sprite to the center of the screen
		bunny.x = app.width / 2;
		bunny.y = app.height / 2;
	});
</script>

<canvas id="canvas"></canvas>

<style>
    canvas {
        width: 100%;
        height: 100%;
        background: white;
    }
</style>
