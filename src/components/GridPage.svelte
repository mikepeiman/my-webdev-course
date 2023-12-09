<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "../lib/Counter.svelte";
  import Card from "./Card.svelte";
  import Box from "./Box.svelte";

  let columns = 30;
  let rows = 30;
</script>

<main class="flex flex-col">
  <h1 class="banner-heading">Vite + Svelte + Kaya + Daddy</h1>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <div class="flex">
        <div class="badge">columns: {columns}</div>
        <div class="badge">rows: {rows}</div>
      </div>
      <div class="buttons-wrapper flex">
        <div class="buttons-inner">
          <button
            type="button"
            class="button-add"
            on:click={() => (columns = columns + 1)}>Add column</button>
            <button
              type="button"
              class="button-remove"
              on:click={() => (columns = columns - 1)}>Remove column</button>
        </div>
        <div class="buttons-inner">
          <button
            type="button"
            class="button-add"
            on:click={() => (rows = rows + 1)}>Add Row</button>
          <button
            type="button"
            class="button-remove"
            on:click={() => (rows = rows - 1)}>Remove Row</button>
        </div>
      </div>
    </div>
    <div class="flex grid-area">
      {#each Array(columns) as column}
        <div class="flex card-col">
          {#each Array(rows) as row, i}
            <Box let:hue1 let:hue2 let:hue3 let:alpha>
              <div
                class="box-color flex"
                style="background: linear-gradient({hue3}deg, hsla({hue1}, 50%, 50%, {alpha}), hsla({hue2}, 50%, 50%, .5) 100%);">
              </div>
            </Box>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  main {
    /* max-width: 80vw; */
    width: 1280px;
  }
  .grid-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* gap: 0.25rem; */
    max-width: 1280px;
    width: 100%;
    height: 60vh;
    overflow: hidden;
  }

  .badge {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    background: #ccc;
    color: white;
  }
  .box-color {
    flex: 1;
  }
  .buttons-wrapper {
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }
  .buttons-inner {
    display: flex;;
    flex-direction: column;
  }
  .button-add {
    background: linear-gradient(90deg, #00f2f5 0%, #0056c9 100%);
    color: white;
    padding: 1.25rem;
    border-radius: 0.25rem;
  }
  .button-remove {
    background: linear-gradient(270deg, #7f5500 0%, #cfcf00 100%);
    color: white;
    padding: 1.25rem;
    border-radius: 0.25rem;
  }
  .banner-heading {
    text-align: center;
    font-size: 3rem;
    margin: 0;
    padding: 3rem;
    /* cool tasteful gradient */
    background: linear-gradient(90deg, #00f2f5 0%, #cfcf00 100%);
  }
  .card-col {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    /* gap: 0.25rem; */
    /* gap: 1rem; */
  }
  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
