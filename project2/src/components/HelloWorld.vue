<template>
  <div class="hello">
    <label :for="'Q1'">question1</label>
    <input type="checkbox" :id="'Q1'">
    <div class="input-group">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <form action="">
            <label :for="'eat'">吃糖?</label>
            <input type="radio" name="sug" :id="'eat'">
            <label :for="'noteat'">不吃糖?</label>
            <input type="radio" name="sug" :id="'noteat'">
          </form>
        </div>
      </div>
      <input type="text" class="form-control" aria-label="Text input with radio button">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
