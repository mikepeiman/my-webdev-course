<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    let { slug } = $page.params
    console.log(`🚀 ~ file: +page.svelte:5 ~ $page:`, $page)
    console.log(`🚀 ~ file: +page.svelte:5 ~ slug:`, slug)
    export let data: PageData;
    console.log(`🚀 ~ file: +page.svelte:5 ~ data:`, data)
</script>

A day's exercise. {slug}