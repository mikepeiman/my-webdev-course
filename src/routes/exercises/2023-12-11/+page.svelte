<script>
	import { Canvas, Layer } from 'svelte-canvas';
	// import Orbits1 from './Orbits1.svelte';

	let speck = {
		arc: {
			start: 0,
			end: (2 * Math.PI) / 60
		},
		speed: 0.005,
		angle: 0
	};

	let data = {
		numPlanets: 3,
		planets: [],
		time: 0
	};

	let updateHasRun = false;
	const update = (time, context, width, height) => {
		// speck.angle += speck.speed;
		let d = speck.arc.end - speck.arc.start;
		for (let i = 0; i < data.numPlanets; i++) {
			let planet = new Planet();
			planet.arc.start += time;
			planet.arc.end += time;
			planet.center.x = i * 100;
			planet.center.y = height / 2;
			data.planets.push(planet);
		}
		data.planets.forEach((planet) => {
			console.log(`planet `, planet);
			context.save();
			context.beginPath();
            context.strokeStyle = '#af00f0';
            context.fillStyle = '#00acff';
			context.arc(width / 2 - planet.center.x, height / 2, 50, 0, 2 * Math.PI);
			console.log(
				`🚀 ~ file: +page.svelte:41 ~ update ~ planet.center.x, planet.center.y, height / 4, planet.arc.start, planet.arc.end:`,
				planet.center.x,
				planet.center.y,
				height / 4,
				planet.arc.start,
				planet.arc.end
			);
			context.lineWidth = 5;
			context.fill();
			context.stroke();
			context.restore();
		});
		speck.arc.start += time;
		speck.arc.end += time;
		updateHasRun = true;
	};

	class Planet {
		constructor() {
			this.arc = {
				start: 0,
				end: (2 * Math.PI) 
			};
			this.center = {
				x: 0,
				y: 0
			};
			this.speed = 0.005;
			this.angle = 0;
		}
	}

	const render = ({ context, width, height, time }) => {
        context.translate(width / 2, height / 2);
		// console.log(`🚀 ~ file: +page.svelte:7 ~ render ~ time:`, time)
		// context.clearRect(0, 0, width, height);
		data.time = time;
		let moment = time / 3600;
		if (!updateHasRun) {
			update(moment, context, width, height);
		}
		// context.save();
		// context.beginPath();

		// context.lineWidth = 250;
		// // context.arc(width / 2, height / 2, height / 4, speck.arc.start, speck.arc.end);
		// context.strokeStyle = '#0ff0f0';
		// context.stroke();
		// context.lineWidth = 2;
		// context.arc(width / 2 - 100, height / 2, 10, 0, 2 * Math.PI);
		// context.fillStyle = '#00acff';
		// context.fill();
		// // context.strokeStyle = '#af00f0';
		// context.stroke();
		// context.restore();
	};
</script>

<!-- <Orbits1 /> -->
<!-- <Orbits2 {render} /> -->

<Canvas autoplay>
	<Layer {render} />
</Canvas>
