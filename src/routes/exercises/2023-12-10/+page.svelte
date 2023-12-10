<script>
    import { Canvas, Layer } from 'svelte-canvas';
  
    const render = ({ context, width, height }) => {
		context.clearRect(0, 0, width, height);
		context.beginPath();
		console.log(`🚀 ~ file: QuickCanvas.svelte:29 ~ sketchOnCanvas ~ context:`, context);

		context.arc(width / 2, height / 2, height / 4, 0, 2 * Math.PI);
		context.strokeStyle = '#af00f0';
		context.fillStyle = '#00acff';
		context.lineWidth = 10;
		context.stroke();
		context.fill();

		context.lineTo(width, height);
		context.lineTo(0, height);
		context.lineTo(width, 0);
    };
  </script>
  
  <Canvas autoplay>
    <Layer {render} />
  </Canvas>
  