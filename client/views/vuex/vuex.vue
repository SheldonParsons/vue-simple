<template>
  <div class="vuex-div">
    {{vuexFirstName}} {{vueLastName}}</br>
    {{defaulrFirstName}}{{defaulrLastName}}
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  mounted() {
    this['vuexModules/increment']()
    this.helloAction('123')
    this['vuexModules/helloAction']('321')
  },
  computed: {
    ...mapState({
      // 调用state时有些特殊，只要注册在modules中不管有没有namespace都需要指定路径来调用
      // 除非在根节点modules属性以外定义
      defaulrFirstName: state => state.defaultModules.firstName,
      defaulrLastName: state => state.defaultModules.lastName,
      vuexFirstName: state => state.vuexModules.vuexFirstName,
      vueLastName: state => state.vuexModules.vueLastName
    })
  },
  methods: {
    // 我在这里使用了两种调用方式，一种是跟目录下的store对象调用，一种是namespace对象的调用方式
    ...mapActions(['helloAction', 'vuexModules/helloAction']),
    ...mapMutations(['vuexModules/increment'])
  }
}
</script>
