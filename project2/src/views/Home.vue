<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <input type="checkbox" name="" id="switch">
        <div class="checkbox-l">123</div>
        <div class="checkbox-r">123</div>
      </div>
      <label for="switch">按我</label>
      <div class="row mb-4">
        <div class="col-xl-12 col-12"></div>
        <ul class="nav w-100 d-flex">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
          <li class="nav-item ml-auto pr-5">
            <button type="button" class="btn btn-outline-secondary ">shopOrder</button>
          </li>
        </ul>
      </div>
      <div class="row">
        <div class="col-3">
          <ul class="list-group">
            <li class="list-group-item">Cras justo odio</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
        <div class="col-9">
          <div class="card-columns">
            <div class="card">
              <img src="" class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-title">Card title that wraps to a new line</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <footer class="blockquote-footer">
                  <small class="text-muted">
                    Someone famous in <cite title="Source Title">Source Title</cite>
                  </small>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HelloWorld/>
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