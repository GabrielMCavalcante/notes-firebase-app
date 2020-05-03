import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
    notes: new Array(),
    search: new String(),
    order: new String(),
    filter: new String()
  },
  mutations: {
    setNotes(state, data) {
      state.loaded = true
      state.notes = data
    },
    setSearch(state, searchItem) {
      state.search = searchItem
    },
    setOrder(state, newOrder) {
      state.order = newOrder
    },
    setFilter(state, newFilter) {
      state.filter = newFilter
    }
  },
  getters: {
    notes(state) {
      return state.notes
    },
    loaded(state) {
      return state.loaded
    },
    search(state) {
      return state.search
    },
    order(state) {
      return state.order
    },
    filter(state) {
      return state.filter
    }
  },
  actions: {
    setNotes({commit}) {
      this.state.loaded = false
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=20").then(res => {
        res.json().then(data => {
          data.forEach(note=>Object.assign(note, {
            color: [
              "Orange",
              "Green",
              "Purple",
              "Grey",
              "Red",
              "Yellow",
              "Blue",
              "Black",
              "White"
            ][Math.abs(8 - Math.round(Math.random()*10))], 
            creation: Date.now() + Math.round(Math.random()*1000), 
            modification: Date.now() + Math.round(Math.random()*1000)
          }))
          console.log(data)
          commit('setNotes', data)
        })
      })
    },
    setSearch({commit}, searchItem) {
      commit('setSearch', searchItem)
    },
    setOrder({commit}, newOrder) {
      commit('setOrder', newOrder)
    },
    setFilter({commit}, newFilter) {
      commit('setFilter', newFilter)
    }
  }
})
