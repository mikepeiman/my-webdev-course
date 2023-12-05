<script>
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Card from "./components/Card.svelte";
</script>

<main>
  <h1>Vite + Svelte + Kaya + Daddy</h1>
<div class="flex card-row">
  
  {#each [1, 2, 3] as row}
    <div class="flex card-col">
      {#each [1, 2, 3] as col}
        <Card
          title="Svelte"
          description="The official Svelte app framework powered by Vite!" />
      {/each}
    </div>
  {/each}
</div>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a
      href="https://github.com/sveltejs/kit#readme"
      target="_blank"
      rel="noreferrer">SvelteKit</a
    >, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">Click on the Vite and Svelte logos to learn more</p>
</main>

<style>
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
