<script>
	import { onDestroy, onMount } from 'svelte';
	import Canvas from '$components/canvas/Canvas.svelte';
	import Hex from '$components/canvas/Hex.svelte';
	import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
	import { Pane } from 'tweakpane';


	$: global_width = 0;
	$: global_height = 0;
	$: console.log(`🚀 ~ file: Canvas.svelte:12 ~ global_height:`, global_height);

	$: settings = {
		radius: 60,
		numHexesInRow: 30,
		numHexesInCol: 12,
		hexWidth: 103.92304845413264,
		hexHeight: 120,
	};

	$: unitWidth =
		settings.radius > (global_width - settings.radius * 2) / settings.numHexesInRow
			? (global_width - settings.radius * 2) / settings.numHexesInRow
			: settings.radius;
	$: unitHeight =
		settings.radius > (global_height - settings.radius * 2) / settings.numHexesInCol
			? (global_height - settings.radius * 2) / settings.numHexesInCol
			: settings.radius;
	$: calculatedRadius = unitWidth > unitHeight ? unitWidth : unitHeight;

	$: hexes = [];

	onMount(() => {
		console.log('mounted');
		console.log(`update global_width ${global_width} global_height ${global_height}`);
		
		unitWidth = (global_width - settings.radius * 2) / settings.numHexesInRow
		unitHeight = (global_height - settings.radius * 2) / settings.numHexesInCol
		console.log(`update unitWidth ${unitWidth} unitHeight ${unitHeight}`);
		const pane = new Pane();

		let radiusBinding = pane.addBinding(settings, 'radius', {
			min: 10,
			max: 100,
			step: 1,
		});
		
		radiusBinding.on('change', () => {
			console.log(`🚀 ~ file: +page.svelte:37 ~ radiusBinding.on ~ radiusBinding:`, radiusBinding)
			hexes = generateHexGridCoordinates();
		});

		generateHexGridCoordinates();
	});

	onDestroy(() => {
		console.log('destroyed');
	});

	const generateHexGridCoordinates = () => {
		for (let i = 0; i < settings.numHexesInRow; i++) {
			for (let j = 0; j < settings.numHexesInCol; j++) {
				let x = i * unitWidth + unitWidth;
				console.log(`🚀 ~ file: +page.svelte:46 ~ generateHexGridCoordinates ~ unitWidth:`, unitWidth)
				let y = (j * unitHeight * 3) / 4 + (unitHeight * 3) / 4;
				console.log(`🚀 ~ file: +page.svelte:48 ~ generateHexGridCoordinates ~ unitHeight :`, unitHeight )
				if (j % 2 === 1) {
					x += unitWidth / 2;
				}

				const hex = calculateHexagonPoints(unitWidth, x, y);
				console.log(`🚀 ~ file: Canvas.svelte:29 ~ generateHexGridCoordinates ~ hex:`, hex);
				hexes = [...hexes, hex];
			}
		}
		return hexes
	};


</script>

<svelte:window bind:innerWidth={global_width} bind:innerHeight={global_height} />

<main>
	<Canvas clearFrames={true}>
		{#each hexes as hex}
			<Hex {hex} />
		{/each}
	</Canvas>
</main>


<style>

	:global(.tp-dfwv) {
		top: 10rem !important;
	}
</style>