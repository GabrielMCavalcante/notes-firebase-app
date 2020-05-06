<template>
  <div class="edit-note">
      <v-card>
          <v-card-text>
              <div class="time">
                  <v-card flat>
                      <v-card-text>
                          Last modified: {{modified}}
                      </v-card-text>
                  </v-card>
              </div>
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
                        @click="exit(1)" 
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
import moment from 'moment'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'EditNote',
    data() {
        return {
            title: null,
            body: null,
            color: null,
            modified: null,
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
        ...mapActions(['setView', 'updateNote', 'sendToTrash']),
        save() {
            const newNote = {
                title: this.title, 
                body: this.body, 
                color: this.options[1].first,
                id: this.currentId,
                userId: firebase.auth().currentUser.uid,
                modification: Date.now(),
                creation: this.currentNote.creation
            }
            return this.updateNote(newNote)
        },
        saveAndExit() {
            this.save()
                .then(()=>this.exit(0))
                .catch(err=>alert('Error while saving note:', err.message))
        },
        exit(type) {
            if(type === 1) {
                const response = confirm('The note has not been saved. Exit anyway?')
                if(response) this.$emit('changeView', 'Overview')
            } else this.$emit('changeView', 'Overview')
        },
        deleteNote() {
            const response = confirm('This note will be sent to the trash.')
            if(response) {
                this.sendToTrash([this.currentNote])
                    .then(()=>this.exit())
                    .catch(err=>alert(`Error while deleting note: ${err.message}`))
            }
        }
    },
    created() {
        this.title = this.currentNote.title
        this.body = this.currentNote.body
        this.currentId = this.currentNote.id
        this.modified = moment(this.currentNote.modification).format('lll')
        this.options[1].first = this.currentNote.color
        this.$emit('changeOptions', this.options)
        this.setView('EditNote')
    }
}
</script>

<style>
    .edit-note .time {
        text-align: right;
    }
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