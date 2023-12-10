<script lang="ts">
	import { page } from '$app/stores';
	import QuickCanvas from './QuickCanvas.svelte';

    let content = {
        date: "2023-12-10",
        tags: ["skeleton-ui", 'tailwindcss','sveltekit'],
        title: "Getting started with skeleton-ui, tailwindcss, sveltekit",
        main: "This is the main content"
    }

    

</script>

<div class="container flex justify-center flex-col items-center">
    <h1 class="date-item">Today - {content.date}</h1>
    <p class="title">{content.title}</p>
    <p class="content">{content.main}</p>
</div>

<QuickCanvas {content} />

<style>
    .date-item {
        @apply text-xl;
    }
    .title {
        @apply text-3xl;
        
    }
    .content {
        @apply text-lg;
    }
    
</style>