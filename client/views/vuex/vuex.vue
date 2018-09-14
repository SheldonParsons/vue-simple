<template>
  <div class="vuex-div">
    {{firstName}} {{lastName}}</br>
    {{vuexFirstName}} {{vueLastName}}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      firstName: state => state.defaultModules.firstName,
      lastName: state => state.defaultModules.lastName,
      vuexFirstName: state => state.vuexModules.vuexFirstName,
      vueLastName: state => state.vuexModules.vueLastName
    })
  }
}
</script>
