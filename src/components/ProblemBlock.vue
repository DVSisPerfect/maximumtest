<template>
  <div class="formBlock">
        <span class="formHeader required">Описание проблемы</span>
        <textarea 
            class="textInput textArea" 
            placeholder="Введите текст"
            v-model="problemValue"
        >
        </textarea>
    </div>
</template>

<script>

export default {
    name: 'ProblemBlock',

    model: {
        prop: 'problemValue'
    },

    props: {
        problemValue: String
    },
    
    watch: {
        problemValue () {
            this.$emit('input', this.problemValue)
        }
    },
}
</script>

<style>

</style>