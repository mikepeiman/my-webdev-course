<script>
	import { onMount } from 'svelte';
	import { Tower, Projectile } from '$components/tower-defense/TowerAndProjectile.js';

	let numTowers = 3;
	let towers = [];
    let projectiles = [];
	let target = { x: 0, y: 0 };
	let activeTower = null;
	function isBrowser() {
		return typeof window !== 'undefined';
	}

	if (isBrowser()) {
		towers = generateTowers();
	}

	onMount(async () => {
		console.log('mounted');
		console.log(towers, towers.length);
	});

	function generateTowers() {
		let towers = [];
		for (let i = 0; i < numTowers; i++) {
			let w = window.innerWidth * 0.8;
			let h = window.innerHeight * 0.8;
			let x = w * Math.random() + 80;
			let y = h * Math.random() + 80;
			let tower = new Tower(x, y);

			towers = [...towers, new Tower(x, y, 1, 10, 1)];
		}
		return towers;
	}

	function towerClicked(event, tower) {
		console.log('tower clicked', event);
		target = { x: event.clientX, y: event.clientY };
        fireProjectile(tower);
		console.log(`🚀 ~ file: +page.svelte:32 ~ tower.addEventListener ~ target:`, target);
        activeTower === tower ? activeTower = null : activeTower = tower;
	}

    function fireProjectile(tower) {
        console.log(`🚀 ~ file: +page.svelte:32 ~ tower.addEventListener ~ target:`, target);
        let shot = new Projectile(tower, target)
        console.log(`🚀 ~ file: +page.svelte:47 ~ fireProjectile ~ shot:`, shot)
        projectiles = [...projectiles, shot];
    }

	function setTarget(event) {
		target = { x: event.clientX, y: event.clientY };
		console.log(`🚀 ~ file: +page.svelte:43 ~ setTarget ~ target:`, target);
	}

	function update() {
		console.log('update');
		towers = towers.map((tower) => {
			tower.update();
			return tower;
		});
	}
</script>

<div class="h-full w-full flex flex-col justify-center align-center relative">
	<div class="h-full w-full flex flex-col justify-center align-center relative">
		{#await towers}
			<h1>await</h1>
		{:then towers}
			{#each towers as tower (tower.x + ',' + tower.y)}
				<div
					class="tower absolute {activeTower === tower ? 'active' : ''}"
					style="left: {tower.x}px; top: {tower.y}px;"
					on:click|preventDefault={(event) => towerClicked(event, tower)}
				/>
			{/each}
		{/await}
	</div>
</div>
<button on:click={update}>Update</button>

<style>
	/* your styles go here */
	:global(.tower) {
		width: 50px;
		height: 50px;
		background: hsl(200, 50%, 45%);
		color: white;
		position: absolute;
	}

	:global(.tower.active) {
		animation: flash .5s infinite;
	}

	@keyframes flash {
		0%,
		50%,
		100% {
			opacity: 1;
		}
		25%,
		75% {
			opacity: 0.5;
		}
	}
</style>
