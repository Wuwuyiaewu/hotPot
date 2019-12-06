<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style scoped>
.home{
  position: relative;
}
#switch{
  opacity: 0;
  visibility: hidden;
  width: 0;
  height: 0;
}
.checkbox-l{
  opacity: 0;
  visibility: hidden;
  width: 0;
  height: 0;
  transform: translateX(-100%);
  transition: all 0.2s;
}
.checkbox-r{
  width: 100%;
  height: 30px;
  transition: all .2s;
}
#switch:checked + .checkbox-l{
  width: 25%;
  height: 30px;
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}
#switch:checked ~ .checkbox-r{
  width: 75%;
  height: 30px;
}
</style>