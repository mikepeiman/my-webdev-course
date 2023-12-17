<script>
    import { onMount } from 'svelte';
    import { calculateHexagonPoints } from '$utils/CalculateHexPoints';
    import { GenerateHexGrid } from '$utils/GenerateHexGrid';

    let PARAMS = {
        radius: 20,
        numHexesInRow: 12,
        numHexesInCol: 12,
        hexagonSpacing: 0,
        hexagonColor: 'black',
        hexagonStrokeColor: 'white',
        hexagonStrokeWidth: 2,
        hexagonStrokeOpacity: 1,
        hexagonOpacity: 1
    };  
    
    onMount(() => {
        console.log('mounted');
        let firsthex = calculateHexagonPoints(PARAMS.radius, 20, 20);
        let grid = GenerateHexGrid(firsthex.width.x, firsthex.width.y, PARAMS.numHexesInRow, PARAMS.numHexesInCol, [0,0], [1,0] );
        console.log(`🚀 ~ file: DrawHexGrid.svelte:22 ~ onMount ~ grid:`, grid)
        console.log(`🚀 ~ file: +page.svelte:24 ~ onMount ~ firsthex:`, firsthex);
        
    })
</script>

{#each grid as hex}
    <!-- use the values for each coordinate to draw an svg hex -->
{/each}
<style>

</style>