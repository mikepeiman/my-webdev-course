<script context="module">
	// import fs from 'fs';
	// import path from 'path';
  
	// // Get the directory of the pages
	// const pagesDirectory = path.join(process.cwd(), './src/routes');
  
	// // Read the directory and filter out non-directory files
	// const pages = fs.readdirSync(pagesDirectory).filter(file => {
	//   return fs.statSync(path.join(pagesDirectory, file)).isDirectory();
	// });
  
	// export const load = async () => {
	//   return {
	// 	props: {
	// 	  pages
	// 	}
	//   };
	// };
  </script>

<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	// export let pages = [];
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">MWDC</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="/about"> About </a>
				<a class="btn btn-sm variant-ghost-surface" href="/blog"> Blog </a>
				<a class="btn btn-sm variant-ghost-surface" href="/exercises"> Exercises </a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>


<style>
	:global(#shell-header) {
		height: 5rem;
	}

	:global(.app-bar) {
		height: 100%;
	}
</style>