<template>
    <div class="formBlock">
        <span class="formHeader required">Ваш филиал</span>
        <div class="cityBlock">
            <select 
                class="citySelected" 
                id="citySelected" 
                v-model="cityValue.selected" 
                :disabled="cityValue.disabled"
            >
                <option 
                    disabled 
                    value='' 
                    hidden
                >
                    Выберите свой город
                </option>
                <option 
                    v-for="city in cities" 
                    :key="city.id"
                    :value="city.title"
                >
                {{city.title}}
                </option>
            </select>
        </div>
        <div>
            <input 
            type="checkbox" 
            class="online"                        
            id="online"
            v-model="cityValue.online"
            @click="cityDisable()">
            <label for="online">Онлайн</label>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'CityBlock',
    
    model: {
        prop: 'cityValue'
    },

    props: {
        cityValue: Object
    },

    watch: {
        cityValue () {
            this.$emit('input', this.cityValue)
        }
    },

    data: function() {
        return {
            cities: []
        }
    },

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
        cityDisable: function () {
            this.cityValue.disabled = !this.cityValue.disabled;
            this.cityValue.selected = ''
        }
    }
}
</script>

<style>

</style>