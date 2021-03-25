<template>
  <div class="formBlock">
        <span class="formHeader required">Описание проблемы</span>
        <textarea 
            class="textInput textArea" 
            placeholder="Введите текст"
            v-model="problem"                        
            @input="formCheck()"
        >
        </textarea>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'ProblemBlock',
    
    computed: {
      ...mapState([]),
      problem: {
            get () {
                return this.$store.state.problem
            },
            set (value) {
                this.$store.commit('setProblem', value)
            }
      },
    },
    
    methods: {
    ...mapActions(['formCheck']),
    }
}
</script>

<style>

</style>