<script>
	import { onMount } from 'svelte';
	import anime from 'animejs';
	// your script goes here

	$: hue1 = anime.random(0, 360);
	$: hue2 = anime.random(0, 360);
	$: hue3 = anime.random(0, 360);
	$: hue4 = anime.random(0, 360);
	$: hue5 = anime.random(0, 360);
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

		anime({
			targets: ['.svg-attributes-demo polygon', 'feTurbulence', 'feDisplacementMap'],
			points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
			baseFrequency: 0,
			scale: 1,
			loop: true,
			direction: 'alternate',
			easing: 'easeInOutExpo'
		});
	});
</script>

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
			points="64 72.7966439847248 8.574 99.71990269644712 59.60362518986154 65.18153205230828 64 3.7199026964471162 68.39637481013845 65.18153205230828 119.426 99.71990269644712 "
			style="filter: url(&quot;#displacementFilter&quot;); transform: scale(1);"
			fill="currentColor"
		/>
	</svg>
</div>

<style>
	.demo-content {
		position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
	color: #00f;
	background: linear-gradient(45deg, hsla(330, 50%, 50%, 0.5), hsla(90, 50%, 50%, 0.5)), linear-gradient(45deg, hsla(0, 50%, 50%, 0.5), hsla(0, 50%, 51800%, 0.5));
	background: #222;

    height: 100%;
	}

	.demo-content svg polygon {
		background: linear-gradient(45deg, hsla(130, 50%, 50%, 0.5), hsla(190, 50%, 50%, 0.5)), linear-gradient(45deg, hsla(0, 50%, 50%, 0.5), hsla(0, 50%, 51800%, 0.5));
		fill: #111;
		stroke: hsla(20, 100%, 50%, 1);
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-linecap: round;
	} 
	

	.svg-attributes-demo {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.svg-attributes-demo svg {
		width: 100%;
		height: 100%;
	}

	.svg-attributes-demo polygon {
		fill: none;
		stroke: #fff;
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	</style>	