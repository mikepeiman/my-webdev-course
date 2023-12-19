<script lang="ts">
    import { getContext, onDestroy, onMount } from "svelte";
    import type { Point, CanvasContext } from "./types";
  
    export let points: Array<Point>;
    export let vertices: Number;
  
    let canvasContext = getContext("canvas") as CanvasContext;
    let hexPoints = convertHexPointsStringToArray()
    console.log(`🚀 ~ file: Hex.svelte:10 ~ hexPoints:`, hexPoints)
    function convertHexPointsStringToArray() {
        let points = "51.96050807568878,50 34.64,60 17.31949192431123,50.00000000000001 17.319491924311222,30.000000000000007 34.63999999999999,20 51.960508075688765,29.999999999999993"
        return points.split(" ").map((point) => {
          return point.split(",").map((num) => {
            return Number(num);
          
          })

        })

      }
    onMount(() => {
      canvasContext.addDrawFn(draw);
    });
  
    onDestroy(() => {
      canvasContext.removeDrawFn(draw);
    });
  
    function draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      for(let i = 0; i < hexPoints.length; i++) {
        // console.log(`🚀 ~ file: Hex.svelte:22 ~ draw ~ points[i]:`, points[i])
        i === hexPoints.length - 1 ? ctx.lineTo(hexPoints[i][0], hexPoints[0][1]) :
        ctx.lineTo(hexPoints[i][0], hexPoints[i][1]);


      }
      // ctx.moveTo(...start);
      // ctx.lineTo(...end);
      ctx.stroke();
    }
  </script>