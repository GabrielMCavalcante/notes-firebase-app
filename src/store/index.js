import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebase/init.js'
import firebase from 'firebase'
import {v4 as uuidv4} from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
    notes: new Array(),
    trash: new Array(),
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
    setTrash(state, data) {
      state.loaded = true
      state.trash = data
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
    trash(state) {
      return state.trash
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
      this.state.loaded = false
      firebase.auth().onAuthStateChanged(()=>{
        const user = firebase.auth().currentUser
        db.collection('users').doc(user.uid).get()
          .then(doc=>{ 
            commit('setNotes', doc.data().notes)
          })
      })
    },
    setTrash({commit}) {
      this.state.loaded = false
      firebase.auth().onAuthStateChanged(()=>{
        const user = firebase.auth().currentUser
        db.collection('users').doc(user.uid).get()
          .then(doc=>{ 
            commit('setTrash', doc.data().trash)
          })
      })
    },
    addNote({commit}, newNote) {
      return new Promise((resolve, reject)=>{
        const user = firebase.auth().currentUser
        db.collection('users').doc(user.uid).get()
          .then(doc=>{
            const userNotes = doc.data().notes
            Object.assign(newNote, {id: uuidv4(), userId: user.uid})
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
    sendToTrash({commit}, notesToTrash) {
      return new Promise((resolve, reject)=>{
        const user = firebase.auth().currentUser
        
        db.collection('users').doc(user.uid).get()
          .then(snapshot=>{
            const notes = snapshot.data().notes
            const trash = snapshot.data().trash

            notesToTrash.forEach(noteToTrash=>{
              notes.forEach((note, index)=>{
                if(noteToTrash.id === note.id) {
                  notes.splice(index, 1)
                  Object.assign(noteToTrash, {deletion: Date.now()})
                  noteToTrash.selected = false
                  trash.push(noteToTrash)
                }
              })
            })

            db.collection('users').doc(user.uid).update({notes, trash})
              .then(()=>{
                commit('setNotes', notes)
                commit('setTrash', trash)
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
