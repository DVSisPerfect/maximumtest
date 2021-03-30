<template>
    <div class="formBlock">
        <span class="formHeader required">Тема обращения</span>
        <div 
            class="radioBlock" 
            v-for="button in radioBtns" 
            :key="button.value"
        >
            <input
                type="radio"
                class="radioInput"                             
                :id="button.value" 
                :value="button.value"
                v-model="themeValue.radio"
                @click="themeClear()"
            >
            <label :for="button.value">{{button.text}}</label>
        </div>              
        <input 
            type="text" 
            class="textInput textRadio"                        
            placeholder="Другое" 
            v-model="themeValue.theme"
            @input="radioClear()"
        >
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'ThemeBlock',
    
    model: {
        prop: 'themeValue'
    },

    props: {
        themeValue: Object
    },

    watch: {
        themeValue () {
            this.$emit('input', this.themeValue)
        }
    },

    data: function() {
        return {                      
            radioBtns: [
                {value: 'badService', text: 'Недоволен качеством услуг'},
                {value: 'termination', text: 'Расторжение договора'},
                {value: 'noActivation', text: 'Не приходит письмо активации на почту'},
                {value: 'noLMS', text: 'Не работает личный кабинет'},
            ],
    }
    },
    
    methods: {
        
        themeClear: function() {
            this.themeValue.theme = '';
        },

        radioClear: function() {
            if (this.themeValue.theme != '') {
                this.themeValue.radio = ''
            }
        }
    }
}
</script>

<style>

</style>