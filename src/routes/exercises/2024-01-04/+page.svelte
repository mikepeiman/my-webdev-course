<script>
    import { onMount, tick } from 'svelte';
    import { Tower, Projectile, Creep } from '$components/tower-defense/TowerAndProjectile.js';

    let numTowers = 3;
    let towers = [];
    let creeps = [];
    let projectiles = [];
    let gameSpeed = 1;
    let isGamePaused = false;
    let lastUpdateTime = Date.now();

    onMount(() => {
        towers = generateTowers();
        creeps = generateCreeps();
        // gameLoop();
    });

    function generateTowers() {
        return Array.from({ length: numTowers }, (_, i) => {
            const x = i * 100 + 50;
            const y = 100;
            return new Tower(x, y, 1, 10, 1);
        });
    }

    function generateCreeps() {
        // Generate a few creeps with different speeds
        return [new Creep(0, 0, 1), new Creep(0, 50, 2), new Creep(0, 100, 1.5)];
    }

    async function gameLoop() {
        while (!isGamePaused) {
            let currentTime = Date.now();
            let deltaTime = (currentTime - lastUpdateTime) / 1000;
            lastUpdateTime = currentTime;

            updateCreeps(deltaTime * gameSpeed);
            updateProjectiles(deltaTime * gameSpeed);
            checkCollisions();

            await tick(); // Ensures the DOM is updated before next loop
        }
    }

    function updateCreeps(deltaTime) {
        creeps.forEach(creep => creep.move(deltaTime));
    }

    function updateProjectiles(deltaTime) {
        // Update projectile positions
        projectiles.forEach(projectile => projectile.move(deltaTime));
    }

    function checkCollisions() {
        projectiles = projectiles.filter(projectile => {
            let hit = false;
            creeps.forEach(creep => {
                if (projectile.hit(creep)) {
                    hit = true;
                    // Handle creep being hit
                }
            });
            return !hit; // Keep projectiles that didn't hit a creep
        });
    }

    function fireProjectile(tower) {
        let shot = new Projectile(tower, target)
        console.log(`🚀 ~ file: +page.svelte:70 ~ fireProjectile ~ shot:`, shot)
        projectiles = [...projectiles, shot];
    }

    function togglePause() {
        isGamePaused = !isGamePaused;
        if (!isGamePaused) {
            lastUpdateTime = Date.now();
            gameLoop();
        }
    }

    function changeSpeed(factor) {
        gameSpeed = factor;
    }
</script>

<div class="game-container">
    {#each towers as tower}
        <div class="tower" style="left: {tower.x}px; top: {tower.y}px;" />
    {/each}
    {#each creeps as creep}
        <div class="creep" style="left: {creep.x}px; top: {creep.y}px;" />
    {/each}
</div>
<button on:click={togglePause}>{isGamePaused ? 'Play' : 'Pause'}</button>
<button on:click={() => changeSpeed(1)}>1x Speed</button>
<button on:click={() => changeSpeed(3)}>3x Speed</button>
<button on:click={() => changeSpeed(9)}>9x Speed</button>

<style>
    .game-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .tower, .creep {
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
