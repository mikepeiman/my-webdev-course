<script>
    import AnimatedBackground from "./AnimatedBackground.svelte";
    import Sidenav from "./Sidenav.svelte";
    import Topnav from "./Topnav.svelte";
    import Footer from "./Footer.svelte";
</script>
<!-- create a layout template for the app, using the following components: 
AnimatedBackground
Sidenav
Topnav
Footer
 
-->
<div id="animated-background">
    <AnimatedBackground />
</div>

<div id="side-nav">
    <Sidenav />
</div>

<!-- svelte-ignore missing-declaration -->
<div id="top-nav">
    <Topnav />
</div>

<div class="main">
    <slot />
</div>

<div id="footer">
    <Footer />
</div>

<style>
    .main {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-areas: "topnav topnav topnav" "sidenav main main" "footer footer footer";
        grid-template-rows: 30px 1fr 30px;
        grid-template-columns: 200px 1fr;
    }

#top-nav {
    grid-area: topnav;
}

#side-nav {
    grid-area: sidenav;
}

#footer {
    grid-area: footer;
}

#animated-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(90deg, #00c2c5 0%, #0056c9 100%);
}

</style>