<template>
  <div class="container"> 
        <h1 class="header">Форма подачи заявки в отдел сервиса и качества</h1>
        <div class="formContainer">
            <form>
                <div class="formBlock">
                    <span class="formHeader mustHave">Ваш филиал</span>
                    <div class="selectCity">
                        <select class="selectInput" id="selectInput">
                            <option disabled selected hidden>Выберите свой город</option>
                        </select>
                    </div>
                    <div>
                        <input class="checkOnline" type="checkbox" id="online" name="online">
                        <label for="online">Онлайн</label>
                    </div>
                </div>
                <div class="formBlock">
                    <span class="formHeader mustHave">Тема обращения</span>
                    <div class="radioBlock">
                        <input class="radioInput" type="radio" id="badService" name="radioButt">
                        <label for="badService">Недоволен качеством услуг</label>
                    </div>
                    <div class="radioBlock">
                        <input class="radioInput" type="radio" id="termination" name="radioButt">
                        <label for="termination">Расторжение договора</label>
                    </div>
                    <div class="radioBlock">
                        <input class="radioInput" type="radio" id="noLetter" name="radioButt">
                        <label for="noLetter">Не приходит письмо активации на почту</label>
                    </div>
                    <div class="radioBlock">
                        <input class="radioInput" type="radio" id="noCab" name="radioButt">
                        <label for="noCab">Не работает личный кабинет</label>
                    </div>
                    <input class="textInput textRadio" type="text" id="otherTheme" name="otherTheme" placeholder="Другое">
                </div>
                <div class="formBlock">
                    <span class="formHeader mustHave">Описание проблемы</span>
                    <textarea class="textInput textArea" id="problem" name="problem" placeholder="Введите текст"></textarea>
                </div>
                <div class="formBlock">
                    <span class="formHeader">Загрузка документов</span>
                    <p class="fileBlock">Приложите, пожалуйста, экранный скриншот<br>
                    Это поможет быстрее решить проблему
                    </p>
                    <input type="file" id="fileUpload" name="fileUpload" placeholder="Выберите файл">
                </div>
                <div class="formBlock">
                    <input type="submit" id="submit" name="submit" placeholder="Отправить">
                </div>
            </form>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    
  }
}
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.header {
    margin-bottom: 10px;
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
    font-size: 18px;
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
}

.textInput {
    border: 1px solid rgb(200, 200, 200);
    padding: 5px 10px;
}

.textRadio {
    width: 200px;
}

.fileBlock {
    margin-bottom: 10px;
    color: grey;
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
</style>
