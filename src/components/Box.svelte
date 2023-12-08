<script>
    export let hue = 0;

    const randomHue = () => {
        hue = Math.floor(Math.random() * 360);
        console.log(`🚀 ~ file: Box.svelte:6 ~ randomHue ~ hue:`, hue);
        return hue;
    };
    $: hue1 = randomHue();
    $: hue2 = randomHue();
    const root = document.documentElement;

    randomHue();
    root.style.setProperty("--hue", hue);
    root.style.setProperty("--hue1", hue1);
    root.style.setProperty("--hue2", hue2);
</script>

<div class="box">
    <slot {hue1} {hue2} />
</div>

<style>
    .box {
        min-width: 3rem;
        min-height: 3rem;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, hsla(var(--hue1), 50%, 50%, 1), hsla(var(--hue2), 50%, 50%, 1) 100%);
    }
</style>
