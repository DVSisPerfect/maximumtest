<template>
    <div class="formBlock">
        <span class="formHeader required">Ваш филиал</span>
        <div class="cityBlock">
            <select 
                class="citySelected" 
                id="citySelected" 
                v-model="citySelected" 
                :disabled="cityDisabled"
                @click="formCheck()"
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
            v-model="online"
            @click="cityDisable();formCheck()">
            <label for="online">Онлайн</label>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
/* eslint-disable */
export default {
    name: 'CityBlock',
    
    data: function() {
        return {
            cities: [],
        }
    },

    computed: {
        ...mapState(['cityDisabled']),
        citySelected: {
            get () {
                    return this.$store.state.citySelected
                },
                set (value) {
                    this.$store.commit('setCity', value)
                }
            },
            online: {
                get () {
                    return this.$store.state.online
                },
                set (value) {
                    this.$store.commit('setOnline', value)
                }
      },
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
        ...mapActions(['cityDisable', 'formCheck'])
    }
}
</script>

<style>

</style>