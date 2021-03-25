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
                v-model="radioSelected" 
                @change="formCheck()"
                @click="themeClear()"
            >
            <label :for="button.value">{{button.text}}</label>
        </div>                   
        <input 
            type="text" 
            class="textInput textRadio"                        
            placeholder="Другое" 
            v-model="otherTheme"                        
            @input="formCheck();radioClear()"
        >
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
/* eslint-disable */
export default {
    name: 'ThemeBlock',
   
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
    
    computed: {
      ...mapState([]),
      
        radioSelected: {
            get () {
                    return this.$store.state.radioSelected
                },
                set (value) {
                    this.$store.commit('setRadio', value)
                }
        },
        otherTheme: {
                get () {
                    return this.$store.state.otherTheme
                },
                set (value) {
                    this.$store.commit('setTheme', value)
                }
            },
    },
    
    methods: {
        ...mapActions(['themeClear', 'radioClear', 'formCheck']),
    }
}
</script>

<style>

</style>