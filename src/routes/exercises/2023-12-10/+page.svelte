<script>
	import { Canvas, Layer } from 'svelte-canvas';
	// import Orbits1 from './Orbits1.svelte';

    let speck = {
        arc: {
            start: 0,
            end: 2 * Math.PI / 60
        },
        speed: .005,
        angle: 0,

    }

    const update = (time) => {
        // speck.angle += speck.speed;
        let d = speck.arc.end - speck.arc.start;

        speck.arc.start += time;
        speck.arc.end +=  time;
    }

	const render = ({ context, width, height, time }) => {
		// console.log(`🚀 ~ file: +page.svelte:7 ~ render ~ time:`, time)
		// context.clearRect(0, 0, width, height);
        let moment = time % (60) / 3600;
        update(moment);
		context.save();
		context.beginPath();

		context.arc(width / 2, height / 2, height / 4, speck.arc.start, speck.arc.end);
		context.strokeStyle = '#af00f0';
    
		context.fillStyle = '#00acff';
		context.lineWidth = 250;
		context.stroke();
		context.restore();
	};
</script>

<!-- <Orbits1 /> -->
<!-- <Orbits2 {render} /> -->

<Canvas autoplay>
	<Layer {render} />
</Canvas>
