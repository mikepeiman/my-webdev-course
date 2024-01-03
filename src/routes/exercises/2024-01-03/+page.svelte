<script>
	import { onMount } from "svelte";

    // your script goes here
let numTowers = 10;
    onMount(() => {
        console.log('mounted');
        let towers = document.querySelectorAll('.tower');
        console.log(towers);
        for(let i = 0; i < numTowers; i++){
            let rand = Math.floor(Math.random() * 10) + 1;
            let x = window.innerWidth * rand / 10;
            let y = window.innerHeight * Math.random();
            console.log(x, y);
            placeTower(x, y);
        }
    })

    function placeTower(x, y) {
        let tower = document.createElement('div');
        let view = document.querySelector('.main-content');
        console.log(`🚀 ~ file: +page.svelte:16 ~ placeTower ~ view:`, view)
        console.log(`🚀 ~ file: +page.svelte:16 ~ placeTower ~ view:`, view)
        tower.classList.add('tower');
        tower.style.left = `${x}px`;
        tower.style.top = `${y}px`;
        view.appendChild(tower);
        console.log(`🚀 ~ file: +page.svelte:22 ~ placeTower ~ tower:`, tower)
    }
</script>


<div class="h-full flex flex-col justify-center align-center relative">
    <div class="tower"></div>
</div>
<style>
    /* your styles go here */
    :global(.tower) {
        width: 50px;
        height: 50px;
        background: hsl(200, 50%, 25%);
        color: white;
        position: absolute;
    }
</style>