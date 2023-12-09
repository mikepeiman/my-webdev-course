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
<div class="layout-item" id="animated-background">
    <AnimatedBackground />
</div>

<div class="layout-item" id="side-nav">
    <Sidenav />
</div>

<!-- svelte-ignore missing-declaration -->
<div class="layout-item" id="top-nav">
    <Topnav />
</div>

<div class="layout-item main">
    <slot />
</div>

<div class="layout-item" id="footer">
    <Footer />
</div>

<style>
    :global(#app) {
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-areas: 
        "topnav topnav topnav" 
        "sidenav main main" 
        "footer footer footer";
        grid-template-rows: 2.5rem 1fr 2.5rem;
        grid-template-columns: 5rem 1fr;
    }

    .layout-item {
        display: grid;
    }

    #top-nav {
        grid-area: topnav;
        /* background: red; */
    }
    
    #side-nav {
        grid-area: sidenav;
        /* background: green; */
    }
    
    #footer {
        grid-area: footer;
        /* background: blue; */
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
