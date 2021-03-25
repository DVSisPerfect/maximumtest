<template>
  <div class="container"> 
        <h1 class="header">Форма подачи заявки в отдел сервиса и качества</h1>
        <div class="formContainer">
            <form 
                id="rnd"
                @submit="formSubmit"                
            >
                <CityBlock/>
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
                <div class="formBlock">
                    <span class="formHeader">Загрузка документов</span>
                    <p 
                        class="fileBlock" 
                        v-html="message"
                    >
                    </p>
                    <input 
                        type="file" 
                        id="fileUpload" 
                        name="fileUpload" 
                        placeholder="Выберите файл"
                    >
                </div>
                <div class="formBlock">
                    <input 
                        type="submit" 
                        class="button"                        
                        id="submit" 
                        name="submit" 
                        placeholder="Отправить" 
                        :disabled='submitDisabled'
                    >
                </div>
            </form>
        </div>
     </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CityBlock from './CityBlock.vue';
/* eslint-disable */
export default {
  components: { CityBlock },
  name: 'Form',
  data: function() {
      return {
                      
        radioBtns: [
            {value: 'badService', text: 'Недоволен качеством услуг'},
            {value: 'termination', text: 'Расторжение договора'},
            {value: 'noActivation', text: 'Не приходит письмо активации на почту'},
            {value: 'noLMS', text: 'Не работает личный кабинет'},
        ],        
        message: "Приложите, пожалуйста, экранный скриншот<br>Это поможет быстрее решить проблему.",        
      }
  },

  computed: {
      ...mapState(['cityDisabled', 'submitDisabled']),
      
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
      problem: {
            get () {
                return this.$store.state.problem
            },
            set (value) {
                this.$store.commit('setProblem', value)
            }
      },
  },

  //Запрашиваем города
  created: function() {
        var vm = this;
        fetch("https://60254fac36244d001797bfe8.mockapi.io/api/v1/city")
        .then(function(response) {
            return response.json();
            })
        .then(function(data) {
            vm.cities = data;
            })
        
  },

  methods: {

    ...mapActions(['cityDisable', 'themeClear', 'radioClear', 'formCheck', 'formClear']),
    
    formSubmit: async function (e) {
        e.preventDefault();
        let response = await fetch('https://60254fac36244d001797bfe8.mockapi.io/api/v1/send-form', {
        method: 'POST',
        body: new FormData(document.getElementById('rnd'))
        });
        let result = await response.json();
        if (result.success) {
            this.citySelected = '';
            this.cityDisabled = false;
            this.online = '';
            this.radioSelected = '';
            this.otherTheme = '';
            this.problem = "";
            this.submitDisabled = true;
            this.show = true;
            this.$router.push('submitted');
        } else {
            alert("Ошибка отправки заявки");
        }
    },
    
    },
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.95rem;

}
.header {
    margin-bottom: 10px;
    font-size: 1.5rem;
    line-height: 2;
}

.container {
    width: 1000px;
    margin: 0px 10px;
}

.formContainer {
    border: 1px solid rgb(200, 200, 200);
    padding: 20px;
}

.formBlock {
    margin-bottom: 20px;
}

.formHeader {
    display: inline-block;
    margin-bottom: 10px;
}

.cityBlock {
    margin-bottom: 10px;
}

.citySelected {
    padding: 5px 10px;
    width: 200px;
    border: 1px solid rgb(200, 200, 200);
}
.online {
    margin-right: 5px;
    width: 20px;
    height: 20px;
    vertical-align: middle;
}

.radioBlock {
    margin-bottom: 10px;
}

.radioInput {
    margin-right: 5px;
    height: 20px;
    width: 20px;
    vertical-align: middle;
    font-size: 0.9rem;
}

.textInput {
    border: 1px solid rgb(200, 200, 200);
    padding: 5px 10px;
    font-family: 'Open Sans', sans-serif;
}

.textRadio {
    width: 200px;
}

.fileBlock {
    margin-bottom: 10px;
    color: grey;
    font-size: 0.9rem;
    line-height: 1.2;
}

.textArea {
    width: 100%;
    height: 100px;

}

label {
    vertical-align: middle;
}

.required::after {
    content: " *";
    color: red;
}

input[type="submit"]:enabled {
	margin-top: 15px;
	background-color: #FF905A;
	color: white;
	padding: 8px 20px;
	font-size: 0.9rem;
	text-align: center;
	font-weight: bold;
	text-transform: uppercase;
	border-radius: 2px;
    font-family: 'Open Sans', sans-serif;
    border: none;
}

.button {
	margin-top: 15px;
	background-color: #D5D5D5;
	color: white;
	padding: 8px 20px;
	font-size: 0.9rem;
	text-align: center;
	font-weight: bold;
	text-transform: uppercase;
	border-radius: 2px;
    font-family: 'Open Sans', sans-serif;
    border: none;
}
</style>
