<script lang="ts">
	import { page } from '$app/stores';
	console.log(`🚀 ~ file: +page.svelte:3 ~ page:`, $page)
	let { slug } = $page.params;
</script>

<!-- loop through object properties on $page data -->
{#each Object.entries($page) as [key, value]}
    <p>{key}: {value}</p>
    <p>Type of key: {typeof key} ({key}): {value}</p>
{/each}
