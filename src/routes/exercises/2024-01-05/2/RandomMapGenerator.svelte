<script>
    import { onMount } from 'svelte';
  
    let dimensions = 20;
    let maxTunnels = 50;
    let maxLength = 8;
    let grid;
  
    onMount(() => {
      grid = createMap();
    });
  
    function createArray(num, dimensions) {
      let array = [];
      for (let i = 0; i < dimensions; i++) {
        array.push([]);
        for (let j = 0; j < dimensions; j++) {
          array[i].push(num);
        }
      }
      return array;
    }
  
    function validator(x) {
      let input = Number(x);
      return isNaN(input) ? 0 : input;
    }
  
    function createMap() {
      // ...same logic as your React component...
    }
  
    function updateValue(e) {
      switch (e.target.name) {
        case 'dimensions':
          dimensions = validator(e.target.value);
          break;
        case 'maxTunnels':
          maxTunnels = validator(e.target.value);
          break;
        case 'maxLength':
          maxLength = validator(e.target.value);
          break;
      }
      grid = createMap();
    }
  
    function onClick() {
      grid = createMap();
    }
  </script>
  
  <div>
    <div class="form-group row">
      <!-- Input fields similar to your React component -->
    </div>
    <table class="grid" on:click={onClick}>
      <!-- Grid rendering logic -->
    </table>
  </div>
  