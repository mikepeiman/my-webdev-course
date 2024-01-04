<script>
	import { onMount, tick } from 'svelte';
	import { Tower, Projectile, Creep } from '$components/tower-defense/TowerAndProjectile.js';

	let numTowers = 3;
	let numCreeps = 50;
	let towers = [];
	let creeps = [];
	let projectiles = [];
	let gameSpeed = 1;
	let isGamePaused = false;
	let lastUpdateTime = Date.now();
	let counter = 0;

	onMount(() => {
		generateTowers();
		creeps = generateCreeps();
		console.log(`🚀 ~ file: +page.svelte:19 ~ onMount ~ creeps:`, creeps);
		gameLoop();
	});

	function makeSingleTower(i) {
		console.log(`🚀 ~ file: +page.svelte:23 ~ makeSingleTower ~ i:`, i)
		let w = window.innerWidth * 0.8;
		let h = window.innerHeight * 0.8;
		let x = w * Math.random() + 80;
		let y = h * Math.random() + 80;
		let tower = new Tower(i, x, y);
		console.log(`🚀 ~ file: +page.svelte:29 ~ makeSingleTower ~ tower:`, tower)
		return tower
	}

	function generateTowers() {
		for(let i = 0; i < numTowers; i++){
			towers = [...towers, makeSingleTower(i)]
		}
	}

	function generateCreeps() {
		// Generate a few creeps with different speeds
		return Array.from({ length: numCreeps }, (_, i) => {
			const x = i * 100 + 50;
			const y = 100;
			const speed = Math.random() + 0.5;
			return new Creep(x, y, speed, 100);
		});
	}

	let animationFrameId;

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

	function updateCreeps(deltaTime) {
		creeps.forEach((creep) => creep.move(deltaTime));
	}

	function updateProjectiles(deltaTime) {
		// Update projectile positions
		projectiles.forEach((projectile) => projectile.move(deltaTime));
	}

	function checkCollisions() {
		projectiles = projectiles.filter((projectile) => {
			let hit = false;
			creeps.forEach((creep) => {
				if (projectile.hit(creep)) {
					hit = true;
					// Handle creep being hit
				}
			});
			return !hit; // Keep projectiles that didn't hit a creep
		});
	}

	function fireProjectile(tower) {
		let shot = new Projectile(tower, target);
		console.log(`🚀 ~ file: +page.svelte:70 ~ fireProjectile ~ shot:`, shot);
		projectiles = [...projectiles, shot];
	}

	function changeSpeed(factor) {
		gameSpeed = factor;
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
	{#each towers as tower}
		<div class="tower" style="left: {tower.x}px; top: {tower.y}px;" />
	{/each}
	{#each creeps as creep}
		<div class="creep" style="left: {creep.x}px; top: {creep.y}px;" />
	{/each}
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
