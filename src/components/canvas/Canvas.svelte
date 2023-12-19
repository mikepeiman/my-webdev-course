<script lang="ts">

    import { onMount, setContext, onDestroy } from "svelte";
    import type { DrawFn } from "./types";
    let clearFrames = true
    let frameId: number
  let canvasElement: HTMLCanvasElement;
  let fnsToDraw = [] as DrawFn[];

  setContext("canvas", {
    addDrawFn: (fn: DrawFn) => {
      fnsToDraw.push(fn);
    },
    removeDrawFn: (fn: DrawFn) => {
        let index = fnsToDraw.indexOf(fn);
        if (index > -1){
        fnsToDraw.splice(index, 1);
        }
    },
  });
  
    onMount(() => {
      // get canvas context
      let ctx = canvasElement.getContext("2d");
      frameId = requestAnimationFrame(() => draw(ctx));
    });
  
    onDestroy(() => {
      if (frameId){
          cancelAnimationFrame(frameId)
      }
    })
  
    function draw(ctx: CanvasRenderingContext2D, clearFrames) {
      if (clearFrames) {
          ctx.clearRect(0,0,canvasElement.width, canvasElement.width)
      }
      fnsToDraw.forEach((fn) => fn(ctx));
      frameId = requestAnimationFrame(() => draw(ctx))
    }
  </script>

<canvas id="canvas1" on:mousemove on:mouseleave bind:this={canvasElement} />
<slot />

<style>
  #canvas1 {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>