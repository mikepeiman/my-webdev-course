<script>
	import { onMount } from 'svelte';

	let map = Array(10)
		.fill()
		.map(() => Array(10).fill({ terrainType: 'passable', tower: null }));
	let creeps = [];
	let towers = [];
	let rows = 10;
	let cols = 10;
	let projectiles = [];
	let gameRunning = false;
	let placingTower = false;

	function generateRandomMap(cols, rows) {
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				console.log(
					`🚀 ~ file: +page.svelte:19 ~ generateRandomTerrainType ~ map[i: ${i}][j: ${j}]:`,
					map[i][j]
				);
				map[i][j] = {
					terrainType: generateRandomTerrainType(),
					hasTower: false,
					towerType: 'none'
				};
				if (i === 0 || j === 0 || i === cols - 1 || j === rows - 1) {
					map[i][j] = {
						terrainType: 'wall'
					};
				}
			}
		}
	}

	function generateRandomTerrainType() {
		let rand = Math.floor(Math.random() * 3);

		if (rand === 0) {
			return 'passable';
		}

		if (rand === 1) {
			return 'difficult';
		}

		if (rand === 2) {
			return 'obstacle';
		}
	}

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
		console.log(`🚀 ~ file: +page.svelte:33 ~ placeTower ~ map:`, map);
		if (map[y][x] === 0) {
			let hue = Math.floor(Math.random() * 360);
			console.log(`🚀 ~ file: +page.svelte:35 ~ placeTower ~ hue:`, hue);
			let tower = { x, y, hue };
			console.log(`🚀 ~ file: +page.svelte:38 ~ placeTower ~ tower:`, tower);
			towers.push(tower);
			map[y][x]['tower'] = true;
		}
		console.log(`🚀 ~ file: +page.svelte:39 ~ placeTower ~ towers:`, towers);
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
		generateRandomMap(cols, rows);
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
		class:opacity-50={placingTower}
		on:click={toggleTowerPlacement}>Place Tower</button
	>
</div>
<div id="game" class="grid grid-cols-10 gap-1 p-4">
	{#each map as row, y}
		<div class="row">
			{#each row as cell, x}
				<div
					class={`cell h-10 w-10 m-2 hover:bg-amber-300 ${
						cell.terrainType === 'passable'
							? 'terrain-passable bg-green-200'
							: 'terrain-impassable bg-gray-500'
					}`}
					on:click={() => placingTower && placeTower(x, y)}
				>
					{#if cell.hasTower}
						<div class="tower h-10 w-10 bg-blue-500 rounded absolute" />
					{/if}
				</div>
			{/each}
		</div>
	{/each}
	{#each creeps as creep (creep)}
		<div
			class="creep h-8 w-8 bg-red-500 rounded-full absolute"
			style="left: {creep.x * 20}px; top: {creep.y * 20}px; "
		/>
	{/each}
	{#each towers as tower (tower)}
		<div
			class="tower h-10 w-10 rounded absolute"
			style="left: {tower.x * 20}px; top: {tower.y *
				20}px; background: hsl({tower.hue}, 100%, 50%);"
		>
			<div class="text-black">{tower.x}</div>
		</div>
	{/each}
	{#each projectiles as projectile (projectile)}
		<div
			class="projectile h-2 w-2 bg-yellow-500 rounded-full absolute"
			style="left: {projectile.x * 20}px; top: {projectile.y * 20}px;"
		/>
	{/each}
</div>
