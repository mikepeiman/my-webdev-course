<script>
    export let hue = 0;

    const randomHue = () => { return Math.floor(Math.random() * 360); }
    const randomAlpha = () => { return Math.random(); }
    $: hue1 = randomHue();
    $: hue2 = randomHue();
    $: hue3 = randomHue();
    $: alpha = randomAlpha();
    // const root = document.documentElement;

    // randomHue();
    // root.style.setProperty("--hue", hue);
    // root.style.setProperty("--hue1", hue1);
    // root.style.setProperty("--hue2", hue2);
</script>

<div class="box flex">
    <slot {hue1} {hue2} {hue3} {alpha} />
</div>

<style>
    .box {
        width: 100%;
        height: 100%;
        /* background: linear-gradient(90deg, hsla(var(--hue1), 50%, 50%, 1), hsla(var(--hue2), 50%, 50%, 1) 100%); */
    }
</style>
