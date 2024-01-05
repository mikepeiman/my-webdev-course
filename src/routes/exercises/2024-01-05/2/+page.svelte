<script>
	import { onMount, tick } from 'svelte';
	import { Tower, Projectile, Creep } from '$components/tower-defense/TowerAndProjectile.js';
	import RandomMapGenerator from './RandomMapGenerator.svelte';

	let numTowers = 3;
	let numCreeps = 50;
	let towers = [];
	let creeps = [];
	let projectiles = [];
	let gameSpeed = 1;
	let isGamePaused = false;
	let lastUpdateTime = Date.now();
	let counter = 0;
	let animationFrameId;

	onMount(() => {

		// gameLoop();
	});


	function gameLoop() {
		if (isGamePaused) {
			cancelAnimationFrame(animationFrameId);
			return;
		}

		const currentTime = Date.now();
		const deltaTime = (currentTime - lastUpdateTime) / 1000;
		lastUpdateTime = currentTime;

		updateCreeps(deltaTime * gameSpeed);
		updateProjectiles(deltaTime * gameSpeed);
		checkCollisions();

		animationFrameId = requestAnimationFrame(gameLoop);
	}

	function togglePause() {
		isGamePaused = !isGamePaused;
		if (!isGamePaused) {
			lastUpdateTime = Date.now();
			gameLoop();
		} else {
			cancelAnimationFrame(animationFrameId);
		}
	}

</script>

<div class="flex gap-4">
	<button class="button bg-green-700 p-4 rounded" on:click={togglePause}
		>{isGamePaused ? 'Play' : 'Pause'}</button
	>
	<button class="button bg-green-700 p-4 rounded" on:click={() => changeSpeed(1)}>1x Speed</button>
	<button class="button bg-yellow-700 p-4 rounded" on:click={() => changeSpeed(3)}>3x Speed</button>
	<button class="button bg-amber-700 p-4 rounded" on:click={() => changeSpeed(9)}>9x Speed</button>
</div>
<div class="game-container">
<RandomMapGenerator/>
</div>

<style>
	.game-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.tower,
	.creep {
		position: absolute;
		width: 50px;
		height: 50px;
	}
	.tower {
		background-color: blue;
	}
	.creep {
		background-color: red;
	}
</style>


