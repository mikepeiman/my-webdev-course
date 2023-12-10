<script>
    import { Canvas, Layer } from 'svelte-canvas';
  
    const render = ({ context, width, height }) => {
      context.font = `${width / 10}px sans-serif`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = 'tomato';
      context.fillText('Canvas, finally', width / 2, height / 2);
    };
  </script>
  
  <Canvas autoplay>
    <Layer {render} />
  </Canvas>
  