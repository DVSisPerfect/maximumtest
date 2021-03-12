<template>
  <div class="container"> 
        <h1 class="header">Форма подачи заявки в отдел сервиса и качества</h1>
        <div class="formContainer">
            <form @submit="submitForm" id="rnd">
                <div class="formBlock">
                    <span class="formHeader mustHave">Ваш филиал</span>
                    <div class="selectCity">
                        <select class="selectInput" id="selectInput" v-model="selectInput" :disabled='disabledCity'>
                            <option disabled value='' hidden>Выберите свой город</option>
                            <option v-for="city in cities" v-bind:key="city.id">{{city.title}}</option>
                        </select>
                    </div>
                    <div>
                        <input class="checkOnline" type="checkbox" id="online" v-model="online" @click="disableCity();checkForm()">
                        <label for="online">Онлайн</label>
                    </div>
                </div>
                <div class="formBlock">
                    <span class="formHeader mustHave">Тема обращения</span>
                    <div class="radioBlock">
                        <input class="radioInput" type="radio" id="badService" v-model="radioButt" value="badService" @click="checkForm();clearTheme()">
                        <label for="badService">Недоволен качеством услуг</label>
                    </div>
                    <div class="radioBlock">
                        <input class="radioInput" type="radio" id="termination" v-model="radioButt" value="termination" @click="checkForm();clearTheme()">
                        <label for="termination">Расторжение договора</label>
                    </div>
                    <div class="radioBlock">
                        <input class="radioInput" type="radio" id="noLetter" v-model="radioButt" value="noLetter" @click="checkForm();clearTheme()">
                        <label for="noLetter">Не приходит письмо активации на почту</label>
                    </div>
                    <div class="radioBlock">
                        <input class="radioInput" type="radio" id="noCab" v-model="radioButt" value="noCab" @click="checkForm();clearTheme()">
                        <label for="noCab">Не работает личный кабинет</label>
                    </div>
                    <input class="textInput textRadio" type="text" v-model="otherTheme"  placeholder="Другое" @keyup="checkForm();clearRadio()">
                </div>
                <div class="formBlock">
                    <span class="formHeader mustHave">Описание проблемы</span>
                    <textarea class="textInput textArea" v-model="problem" placeholder="Введите текст" @keyup="checkForm()"></textarea>
                </div>
                <div class="formBlock">
                    <span class="formHeader">Загрузка документов</span>
                    <p class="fileBlock" v-html="message">
                    </p>
                    <input type="file" id="fileUpload" name="fileUpload" placeholder="Выберите файл">
                </div>
                <div class="formBlock">
                    <input class="button" type="submit" id="submit" name="submit" placeholder="Отправить" :disabled='disabledSub'>
                </div>
            </form>
        </div>
            <div id="modal">
                <img src="../assets/success_img.png" id="gucci">
                <button id="remove-button" @click="hideModal()">X</button>
            </div>
     </div>
</template>

<script>

/* eslint-disable */
export default {
  name: 'Form',
  data: function() {
      return {
        cities: [],
        disabledCity: false,
        selectInput: '',
        online: '',
        radioButt: '',
        otherTheme: '',
        problem: '',
        message: "Приложите, пожалуйста, экранный скриншот<br>Это поможет быстрее решить проблему.",
        disabledSub: true,
      }
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
    //Выкл выбор города
    disableCity : function () {
        this.disabledCity = !this.disabledCity;
    },
    
    //Очищаем поле темы (при выборе радио-кнопки)
    clearTheme: function () {
        this.otherTheme = '';
    },

    //Очищаем радио-кнопки
    clearButt: function () {
        this.radioButt = '';
    },
    
    //Очищаем радио-кнопки при заполнении поля
    clearRadio: function () {
        if (this.otherTheme != '') {
            this.radioButt = '';
        }
    },
    
    //Валидация формы
    checkForm: function () {
        if ((this.selectInput !== '' || this.disabledCity == true) &&
            (this.otherTheme !== '' || this.radioButt !== '') &&
            this.problem !== '') {
                this.disabledSub = false;
            } else {
                this.disabledSub = true;
            }
    },

    //Отправка формы
    
    submitForm: async function (e) {
        e.preventDefault();
        let response = await fetch('https://60254fac36244d001797bfe8.mockapi.io/api/v1/send-form', {
        method: 'POST',
        body: new FormData(document.getElementById('rnd'))
        });
        let result = await response.json();
        if (result.success) {
            this.selectInput = '';
            this.disabledCity = false;
            this.online = '';
            this.radioButt = '';
            this.otherTheme = '';
            this.problem = "";
            this.disabledSub = true;          
            this.showModal();
        } else {
            alert("Ошибка отправки заявки");
            
        }
    },

    //Показать модалку
    showModal: function () {
        let modal = document.getElementById("modal");
        let img = document.getElementById("gucci");
        modal.style.display = "block";
        modal.style.top = document.documentElement.clientHeight/2 - img.height/2 + "px";
        modal.style.left = document.documentElement.clientWidth/2 - img.width/2 + "px";
        this.showCover();
    },

    //Убрать модалку
    hideModal: function () {
        let modal = document.getElementById("modal");
        modal.style.display = "none";
        this.hideCover();
    },

    //Фон для модалки
    showCover: function () {
        let coverDiv = document.createElement('div');
        coverDiv.id = 'cover-div';
        document.body.style.overflowY = 'hidden';
        document.body.append(coverDiv);
    },

    //Убираем фон
    hideCover: function () {
        document.getElementById('cover-div').remove();
        document.body.style.overflowY = '';
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

.selectCity {
    margin-bottom: 10px;
}

.selectInput {
    padding: 5px 10px;
    width: 200px;
    border: 1px solid rgb(200, 200, 200);
}
.checkOnline {
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

.mustHave::after {
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

#modal {
    position: fixed;
    z-index: 9999;
    background-color: white;
    padding: 10px;
    top: var(--modal-top);
    left: var(--modal-left);
    display: none;
}

#cover-div {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9000;
    width: 100%;
    height: 100%;
    background-color: gray;
    opacity: 0.3;
  }

#remove-button {
    position: absolute;
    font-size: 110%;
    top: 10px;
    right: 10px;
    display: block;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
  }
</style>
