<template>
  <div class="vuex-div">
    {{firstName}} {{lastName}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      firstName: state => state.defaultModules.firstName,
      lastName: state => state.defaultModules.lastName
    })
  }
}
</script>
