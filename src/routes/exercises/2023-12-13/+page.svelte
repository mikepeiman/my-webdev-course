<script>
	import { onMount } from 'svelte';
	import anime from 'animejs';
	// your script goes here

	let data = {
		numHexes: 40
	};
	let settings = {
		targets: ['.svg-attributes-demo polygon', 'feTurbulence', 'feDisplacementMap'],
		points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
		baseFrequency: 0,
		scale: 1,
		loop: false,
		direction: 'alternate',
		easing: 'easeInOutExpo'
	};

	$: hue1 = Math.floor(Math.random() * 360);

	onMount(() => {
		function fitElementToParent(el, padding) {
			var timeout = null;
			function resize() {
				if (timeout) clearTimeout(timeout);
				anime.set(el, { scale: 1 });
				var pad = padding || 0;
				var parentEl = el.parentNode;
				var elOffsetWidth = el.offsetWidth - pad;
				var parentOffsetWidth = parentEl.offsetWidth;
				var ratio = parentOffsetWidth / elOffsetWidth;
				timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
			}
			resize();
			window.addEventListener('resize', resize);
		}

		anime(settings);
	});
</script>

<div class="grid hex-grid">
	{#each Array(data.numHexes) as hex, i}
		<div class="demo-content align-center svg-attributes-demo">
			<svg width="128" height="128" viewBox="0 0 128 128">
				<filter id="displacementFilter">
					<feTurbulence
						type="turbulence"
						baseFrequency="0.04649878370558896"
						numOctaves="2"
						result="turbulence"
						style="transform: scale(1);"
					/>
					<feDisplacementMap
						in2="turbulence"
						in="SourceGraphic"
						scale="14.019659437564908"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
				</filter>
				<polygon
					on:load={() => console.log(this)}
					points="64 72.7966439847248 8.574 99.71990269644712 59.60362518986154 65.18153205230828 64 3.7199026964471162 68.39637481013845 65.18153205230828 119.426 99.71990269644712 "
					style="filter: url(&quot;#displacementFilter&quot;); transform: scale(1);"
					fill="hsla({hue1}, 50%, 50%, 0.5)"
				/>
			</svg>
		</div>
	{/each}
</div>

<style>
	:global(#page-content) {
		height: calc(100vh - 5rem);
	}

	.hex-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(12, 1fr);
	}

	.demo-content {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		width: 100%;
		color: #00f;
		background: linear-gradient(45deg, hsla(330, 50%, 50%, 0.5), hsla(90, 50%, 50%, 0.5)),
			linear-gradient(45deg, hsla(0, 50%, 50%, 0.5), hsla(0, 50%, 51800%, 0.5));
		background: #222;

		height: 100%;
	}

	.demo-content svg polygon {
		background: linear-gradient(45deg, hsla(130, 50%, 50%, 0.5), hsla(190, 50%, 50%, 0.5)),
			linear-gradient(45deg, hsla(0, 50%, 50%, 0.5), hsla(0, 50%, 51800%, 0.5));
		fill: #111;
		stroke: hsla(200, 100%, 50%, 1);
		stroke-width: 1;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.svg-attributes-demo {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.svg-attributes-demo svg {
		width: 50%;
		height: 50%;
	}

	.svg-attributes-demo polygon {
		fill: none;
		stroke: #fff;
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
</style>
