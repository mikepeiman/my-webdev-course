<script>
    export let hue = 0;

    const randomHue = () => {
        hue = Math.floor(Math.random() * 360);
        console.log(`🚀 ~ file: Box.svelte:6 ~ randomHue ~ hue:`, hue)
        return hue
    };

    const root = document.documentElement;

    randomHue();
    root.style.setProperty("--hue", hue);

</script>

<div class="box" style="linear-gradient(90deg, hsla({() => randomHue()}, 50%, 50%, 1), #92fe9d 100%);"></div>

<style>
    .box {
        min-width: 1rem;
        min-height: 1rem;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, hsla(var(--hue), 50%, 50%, 1), #92fe9d 100%);
    }
</style>
