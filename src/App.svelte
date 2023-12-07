<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Card from "./components/Card.svelte";

  let rows = [1, 2];
  let cols = [1, 2];
</script>

<main>
  <h1 class="banner-heading">Vite + Svelte + Kaya + Daddy</h1>
  <div class="buttons-wrapper">
    <button type="button" class="button" on:click={() => rows  = [...rows, rows.length + 1]}>Add Row</button>
    <button type="button" class="button" on:click={() => cols  = [...cols, cols.length + 1]}>Add Col</button>
  </div>
<div class="flex card-row">
  
  {#each rows as row}
    <div class="flex card-col">
      {#each cols as col}
        <Card
          title="Svelte"
          description="The official Svelte app framework powered by Vite!" />
      {/each}
    </div>
  {/each}
</div>


</main>

<style>
.button {
  background: linear-gradient(90deg, #004255 0%, #005609 100%);
  color: white;
  padding: 1.25rem;
  border-radius: .25rem;
}
  .banner-heading {
    text-align: center;
    font-size: 3rem;
    margin: 0;
    padding: 3rem;
    /* cool tasteful gradient */
    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
  }
  .card-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
.card-col {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
