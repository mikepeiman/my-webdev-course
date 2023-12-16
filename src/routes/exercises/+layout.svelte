<script lang="ts">
    import SideNav from '$components/SideNav.svelte';
import type { LayoutData } from './$types';
    
    export let data: LayoutData;
</script>


<div class="exercises-layout">
    <div class="sidenav">
        <SideNav />
        
    </div>
    <div class="main-content">
        <slot />
    </div>
</div>

<style>
    .exercises-layout {
        display: grid;
        grid-template-columns: 5rem 1fr;
        height: 100vh;
        
    }
</style>