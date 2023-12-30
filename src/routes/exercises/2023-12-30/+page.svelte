<script>
	import { onMount } from 'svelte';

	let map = Array(10)
		.fill()
		.map(() => Array(10).fill(0));
	let creeps = [];
	let towers = [];
	let projectiles = [];
	let gameRunning = false;
	let placingTower = false;

	function startGame() {
		gameRunning = true;
		spawnCreep();
		placeTower(5, 5);
	}

	function pauseGame() {
		gameRunning = false;
	}

	function toggleTowerPlacement() {
		placingTower = !placingTower;
	}

	function spawnCreep() {
		creeps.push({ x: 0, y: 0, health: 1 });
	}

	function placeTower(x, y) {
		console.log(`🚀 ~ file: +page.svelte:33 ~ placeTower ~ map[${y}][${x}]:`, map[y][x]);
		if (map[y][x] === 0) {
			let hue = Math.floor(Math.random() * 360);
			towers.push({ x, y, hue });
			map[y][x] = 1;
		}
	}

	function fireProjectile(tower, creep) {
		projectiles.push({ x: tower.x, y: tower.y, target: creep });
	}

	function update() {
		// Move creeps
		for (let creep of creeps) {
			creep.x += 1;
			creep.y += 1;
		}

		// Move projectiles and check for collisions
		for (let projectile of projectiles) {
			projectile.x += (projectile.target.x - projectile.x) * 0.1;
			projectile.y += (projectile.target.y - projectile.y) * 0.1;

			for (let creep of creeps) {
				if (Math.abs(projectile.x - creep.x) < 1 && Math.abs(projectile.y - creep.y) < 1) {
					creep.health -= 1;
					if (creep.health <= 0) {
						creeps = creeps.filter((c) => c !== creep);
					}
					projectiles = projectiles.filter((p) => p !== projectile);
				}
			}
		}

		// Fire projectiles from towers
		for (let tower of towers) {
			let target = creeps.find(
				(creep) => Math.abs(tower.x - creep.x) < 10 && Math.abs(tower.y - creep.y) < 10
			);
			if (target) {
				fireProjectile(tower, target);
			}
		}
	}

	onMount(() => {
		const interval = setInterval(() => {
			if (gameRunning) {
				update();
			}
		}, 100);
		return () => clearInterval(interval);
	});
</script>

<div id="controls" class="flex justify-center space-x-4 p-4">
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={startGame}>Start</button
	>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={pauseGame}>Pause</button
	>
	<button
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		on:click={toggleTowerPlacement}>Place Tower</button
	>
</div>
<div id="game" class="grid grid-cols-10 gap-1 p-4">
	{#each map as row, y}
		<div class="row">
			{#each row as cell, x}
				<div
					class="cell h-10 w-10 bg-green-200 m-2"
					on:click={() => placingTower && placeTower(x, y)}
				/>
			{/each}
		</div>
	{/each}
	{#each creeps as creep (creep)}
		<div
			class="creep h-8 w-8 bg-red-500 rounded-full absolute"
			style="left: {creep.x * 20}px; top: {creep.y *
				20}px; "
		/>
	{/each}
	{#each towers as tower (tower)}
		<div
			class="tower h-10 w-10  rounded absolute"
			style="left: {tower.x * 20}px; top: {tower.y * 20}px; background: hsl({tower.hue}, 100%, 50%);">
			{() => console.log(`🚀 ~ HTML ~~file: +page.svelte:125 ~ tower:`, tower)}
		
		</div>
	{/each}
	{#each projectiles as projectile (projectile)}
		<div
			class="projectile h-2 w-2 bg-yellow-500 rounded-full absolute"
			style="left: {projectile.x * 20}px; top: {projectile.y * 20}px;"
		/>
	{/each}
</div>
