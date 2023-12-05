<script>
    let title = "Svelte"
    let description = "The official Svelte app framework powered by Vite!"
</script>

<div class="flex card-wrapper">
    <div class="image-wrapper flex">
        <img src="https://loremflickr.com/320/240" alt="Placeholder image from Flickr - proably a random cat">
    </div>
    <div class="card-content-wrapper">
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
</div>

<style>

    .card-wrapper {
        width: 70%;
        height: auto;
        background: #ccc;
        border-radius: 0 1rem 1rem 0;
    }
    :global(.flex) {
        display: flex;
    }

    .image-wrapper {
        width: 30%;
        height: 100%;

    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;

    }

    .card-content-wrapper {
        width: 70%;
        height: 100%;
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

    h1 {
        font-size: 2rem;
    }

    p {
        font-size: 1.2rem;
    }
</style>