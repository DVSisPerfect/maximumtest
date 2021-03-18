<template>
  <div class="submitted">
    <div id="modal" :style="cssVars">
      <img src="../assets/success_img.png">
      <button id="remove-button" @click="goBack">X</button>
    </div>
    <div id="cover-div"></div>
  </div>
</template>

<script>
export default {
  name: 'Submitted',

computed: {
    cssVars() {
      return {
        '--modal-top': document.documentElement.clientHeight/2 - 75 + 'px',
        '--modal-left': document.documentElement.clientWidth/2 - 125 + 'px'
      }
    }
  },

methods: {
  goBack: function () {
    this.$router.go(-1)
  }
}
}
</script>

<style>
.submitted {
    width: 1000px;
    margin: 0px 10px;
}

#modal {
    position: fixed;
    z-index: 9999;
    background-color: white;
    padding: 10px;
    top: var(--modal-top);
    left: var(--modal-left);
    
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