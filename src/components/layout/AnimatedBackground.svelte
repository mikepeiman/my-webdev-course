<script>
    import Box from "../Box.svelte";

    export let columns = 30;
    export let rows = 30;
</script>

{#each Array(columns) as col}
    <div class="flex card-col">
        {#each Array(rows) as row}
            <Box let:hue1 let:hue2 let:hue3 let:alpha>
                <div
                    class="box-color flex"
                    style="background: linear-gradient({hue3}deg, hsla({hue1}, 50%, 50%, {alpha}), hsla({hue2}, 50%, 50%, .5) 100%);">
                </div>
            </Box>
        {/each}
    </div>
{/each}

<style>
    .box-color {
        flex: 1;
    }
</style>