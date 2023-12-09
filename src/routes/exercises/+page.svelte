<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

    let courseDays = [
        "2023-12-09",
        "2023-12-10",
        "2023-12-11",
    ]
</script>

<div class="main flex flex-col align-center justify-center">
	<div class="flex justify-center">
		<h1 class="flex items-center text-2xl text-cyan-200 px-8 py-4 bg-secondary-500 rounded-xl">Exercises</h1>
	</div>
	<ul class="flex flex-col justify-center items-center">
        {#each courseDays as day}
            
		<li>
			<div class="flex"><a href="/exercises/{day}">{day}</a></div>
		</li>
        {/each}
	</ul>
</div>


<style>
    li {
        padding: 1rem;
        font-family: 'Quicksand', sans-serif;
        font-size: 1.2rem;
    }
</style>