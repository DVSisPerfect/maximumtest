import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      cityDisabled: false,
      citySelected: '',
      online: false,
      radioSelected: '',
      otherTheme: '',
      problem: '',
      submitDisabled: true,
    },
    mutations: {
      setCity (state, value) {
        state.citySelected = value;
      },
      setOnline (state, value) {
        state.online = value;
      },
      cityDisable (state) {
        state.cityDisabled = !state.cityDisabled;
        state.citySelected = '';
      },
      setRadio (state, value) {
        state.radioSelected = value;
      },
      setTheme (state, value) {
        state.otherTheme = value;
      },
      themeClear (state) {
        state.otherTheme = '';
      },
      setProblem (state, value) {
        state.problem = value;
      },
      radioClear (state) {
        if (state.otherTheme != '') {
            state.radioSelected = '';
        }
      },
      formCheck (state) {
        if ((state.citySelected !== '' || state.cityDisabled == true) &&
            (state.otherTheme !== '' || state.radioSelected !== '') &&
            state.problem !== '') {
                state.submitDisabled = false;
                
            } else {
                state.submitDisabled = true;
            }
      
    },
    },
    actions: {
      cityDisable ({ commit }) {
        commit('cityDisable');
      },
      themeClear ({ commit }) {
        commit('themeClear');
      },
      radioClear ({ commit }) {
        commit('radioClear');
      },
      formCheck ({ commit }) {
        commit('formCheck');
      }
    }
});