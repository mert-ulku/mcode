<template>
  <div id="app">
    <RuleInit/> 
  </div>
</template>

<script>
import RuleInit from './components/RuleInit'

export default {
  name: 'app',
  components: {
    RuleInit
  }
}
</script>

<style lang="scss">

  #app {
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    

  }

</style>
