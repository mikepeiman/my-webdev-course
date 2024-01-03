<script lang="ts">
	import SideNav from '$components/SideNav.svelte';
	import type { LayoutData } from './$types';
	import Settings from '$components/Settings.svelte';
	export let data: LayoutData;
</script>

<div class="exercises-layout">
	<div class="leftpanel">
		<SideNav />
	</div>
	<div class="main-content">
		<slot />
	</div>
	<div class="rightpanel">
		<Settings />
	</div>
</div>

<style>
	.exercises-layout {
		display: grid;
		grid-template-columns: 5rem 1fr;
		height: calc(100vh - 5rem);
	}

	.main-content {
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;
		height: calc(100vh - 5rem);
	}
</style>
