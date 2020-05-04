import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebase/init.js'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
    notes: new Array(),
    search: new String(),
    order: 'Title',
    filter: 'All',
    view: 'Overview',
    currentNote: null
  },
  mutations: {
    setNotes(state, data) {
      state.loaded = true
      state.notes = data
    },
    addNote(state, newNote) {
      state.notes.push(newNote)
    },
    setSearch(state, searchItem) {
      state.search = searchItem
    },
    setOrder(state, newOrder) {
      state.order = newOrder
    },
    setFilter(state, newFilter) {
      state.filter = newFilter
    },
    setView(state, newView) {
      state.view = newView
    },
    setCurrentNote(state, newCurrentNote) {
      state.currentNote = newCurrentNote
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
    },
    view(state) {
      return state.view
    },
    currentNote(state) {
      return state.currentNote
    }
  },
  actions: {
    setNotes({commit}) {
      /*
        check if last order and filter choosen stay the same after editting note
      */
      this.state.loaded = false
      const user = firebase.auth().currentUser
      db.collection('users').doc(user.uid).get()
        .then(doc=>{ 
          commit('setNotes', doc.data().notes)
        })
    },
    addNote({commit}, newNote) {
      return new Promise((resolve, reject)=>{
        const user = firebase.auth().currentUser
        db.collection('users').doc(user.uid).get()
          .then(doc=>{
            const userNotes = doc.data().notes
            Object.assign(newNote, {id: userNotes.length, userId: user.uid})
            userNotes.push(newNote)
            db.collection('users').doc(user.uid).update({
              notes: userNotes
            }).then(()=>{
              commit('setCurrentNote', newNote)
              commit('addNote', newNote)
              resolve()
            }).catch(err=>{reject(err)})
          })
      })
    },
    updateNote({commit}, newData) {
      return new Promise((resolve, reject)=>{
        db.collection('users').doc(newData.userId).get()
        .then(doc=>{
          const userNotes = doc.data().notes
          for(let i=0; i < userNotes.length; i++) {
            if(userNotes[i].id === newData.id) {
              userNotes[i] = newData
              break
            }
          }
          db.collection('users').doc(newData.userId).update({
            notes: userNotes
          }).then(()=>{
            commit('setNotes', userNotes)
            resolve()
          }).catch(err=>reject(err))
        }).catch(err=>reject(err))
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
    },
    setView({commit}, newView) {
      commit('setView', newView)
    },
    setCurrentNote({commit}, newCurrentNote) {
      commit('setCurrentNote', newCurrentNote)
    }
  }
})
