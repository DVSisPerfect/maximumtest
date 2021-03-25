<template>
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
</template>

<script>

export default {
    name: 'UploadBlock',

    data: function() {
        return {      
            message: "Приложите, пожалуйста, экранный скриншот<br>Это поможет быстрее решить проблему.",        
        }
    },
    
}
</script>

<style>

</style>