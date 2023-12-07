<script>
    import { LoremIpsum } from "lorem-ipsum";
    import { onMount } from "svelte";

    function generateLoremIpsum(val) {
        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: 8,
                min: 4,
            },
            wordsPerSentence: {
                max: 16,
                min: 4,
            },
        });
        if(val === "title"){
            return lorem.generateWords(1);
        } else {
            return lorem.generateSentences(3).substring(0, 70) + '...';
        }
    }


    $: title = generateLoremIpsum("title");
    $: description = generateLoremIpsum();
    // clamp the description to fit in the card
</script>

<div class="flex card-wrapper">
    <div class="image-wrapper flex">
        <img
            src="https://loremflickr.com/320/240?t={Math.random()}"
            alt="Placeholder image from Flickr - probably a random cat" />
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
        height: 10rem;
    }
    :global(.flex) {
        display: flex;
    }

    .image-wrapper {
        width: 30%;
        height: 100%;
        background: #333;
        width: 10rem;
        height: 10rem;
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
        text-align: left;
    }

    h1 {
        font-size: 2rem;
        margin: 0;
    }

    p {
        font-size: .8rem;
        margin: 0;
        padding: 0.25rem;
        padding-top: 0.5rem;
    }
</style>
