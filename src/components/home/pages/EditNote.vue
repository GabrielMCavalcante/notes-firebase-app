<template>
  <div class="edit-note">
      <v-card>
          <v-card-text>
              <v-form @submit.prevent>
                <v-text-field
                    v-model="title"
                    shaped
                    label="Note Title"
                    maxlength="30"
                    counter
                    outlined
                    rounded
                    :rules="titleRules"
                    placeholder="Note Title"
                    class="note-title"
                ></v-text-field>

                <v-textarea
                    v-model="body"
                    shaped
                    label="Note Content"
                    outlined
                    rounded
                    auto-grow
                    placeholder="Note Content"
                    class="note-content"
                ></v-textarea>

                <div class="buttons">
                    <v-btn 
                        @click="save" 
                        large 
                        color="grey lighten-2"
                    >Save note</v-btn>
                    <v-btn 
                        @click="saveAndExit" 
                        large 
                        color="grey lighten-2"
                    >Save and exit</v-btn>
                    <v-btn 
                        @click="exit" 
                        large 
                        color="grey lighten-2"
                    >Exit without saving</v-btn>
                </div>

            </v-form>
          </v-card-text>
      </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'EditNote',
    data() {
        return {
            title: null,
            body: null,
            color: null,
            currentId: null,
            titleRules: [v=>v.length <= 30 || 'Max length exceeded'],
            options: [
                { 
                    text: "Save and exit", 
                    icon: "mdi-content-save", 
                    type: "normal",
                    click: ()=>{this.saveAndExit()} 
                },
                { 
                    text: "Change color", 
                    icon: "mdi-palette", 
                    type: "dropdown",
                    first: null,
                    options: [
                    "Orange",
                    "Green",
                    "Purple",
                    "Grey",
                    "Red",
                    "Yellow",
                    "Blue",
                    "Black",
                    "White"
                    ],
                    click: function(){} 
                },
                { 
                    text: "Delete note", 
                    icon: "mdi-delete-empty", 
                    type: "normal",
                    click: ()=>{this.deleteNote()} 
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['currentNote'])
    },
    methods: {
        ...mapActions(['setView', 'updateNote']),
        save() {
            const newNote = {
                title: this.title, 
                body: this.body, 
                color: this.options[1].first,
                id: this.currentId,
                userId: firebase.auth().currentUser.uid,
                modification: Date.now()
            }
            return this.updateNote(newNote)
        },
        saveAndExit() {
            this.save()
                .then(()=>this.exit())
                .catch(err=>alert('Error while saving note:', err.message))
        },
        exit() {
            this.$emit('changeView', 'Overview')
        },
        deleteNote() {
            console.log('deleteNote')
        }
    },
    created() {
        this.title = this.currentNote.title
        this.body = this.currentNote.body
        this.currentId = this.currentNote.id
        this.options[1].first = this.currentNote.color
        this.$emit('changeOptions', this.options)
        this.setView('EditNote')
    }
}
</script>

<style>
    .edit-note .note-title {
        font-size: 25px;
    }
    .edit-note .note-content {
        font-size: 20px;
    }
    .edit-note .buttons {
        width: fit-content;
        margin: 0 auto;
    }
    .edit-note .buttons button {
        margin-right: 10px;
    }
</style>