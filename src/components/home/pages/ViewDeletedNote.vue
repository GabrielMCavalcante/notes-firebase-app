<template>
  <div class="view-deleted-note">
      <v-card>
          <v-card-text>
              <div class="time">
                  <v-card flat>
                      <v-card-text>
                          Last deleted: {{deleted}}
                      </v-card-text>
                  </v-card>
              </div>
              <v-form @submit.prevent>
                <v-text-field
                    v-model="title"
                    shaped
                    readonly
                    label="Note Title"
                    outlined
                    rounded
                    placeholder="Note Title"
                    class="note-title"
                ></v-text-field>

                <v-textarea
                    v-model="body"
                    shaped
                    readonly
                    label="Note Content"
                    outlined
                    rounded
                    auto-grow
                    placeholder="Note Content"
                    class="note-content"
                ></v-textarea>

                <div class="buttons">
                    <v-btn 
                        @click="exit" 
                        large 
                        color="grey lighten-2"
                    >Return</v-btn>
                    <v-btn 
                        @click="restoreNote" 
                        large 
                        color="grey lighten-2"
                    >Restore note</v-btn>
                    <v-btn 
                        @click="deleteNote" 
                        large 
                        color="grey lighten-2"
                    >Delete note</v-btn>
                </div>

            </v-form>
          </v-card-text>
      </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'ViewDeletedNote',
    data() {
        return {
            title: null,
            body: null,
            deleted: null,
            options: [
                { 
                    text: "Return", 
                    icon: "mdi-keyboard-return", 
                    type: "normal",
                    click: ()=>{this.exit()} 
                },
                { 
                    text: "Delete note", 
                    icon: "mdi-delete-empty", 
                    type: "normal",
                    click: ()=>{this.deleteNote()} 
                },
                {
                    text: "Restore note",
                    icon: "mdi-restore",
                    type: "normal",
                    click: ()=>{this.restoreNote()}
                }
            ]
        }
    },
    computed: {
        ...mapGetters(['currentNote', 'trash', 'setTrash'])
    },
    methods: {
        ...mapActions(['setView', 'deletePermanently', 'restoreNotes']),
        exit() {
           this.$emit('changeView', 'DeletedNotes')
        },
        deleteNote() {
            const response = confirm('This note will be deleted PERMANENTLY.')
            if(response) {
                this.deletePermanently([this.currentNote])
                    .then(()=>this.exit())
                    .catch(err=>alert(`Error while deleting note: ${err.message}`))
            }
        },
        restoreNote() {
            this.restoreNotes([this.currentNote])
                .then(()=>this.exit())
                .catch(err=>alert(`Error while restoring note: ${err.message}`))
        }
    },
    created() {
        this.title = this.currentNote.title
        this.body = this.currentNote.body
        this.deleted = moment(this.currentNote.deletion).format('lll')
        this.$emit('changeOptions', this.options)
        this.setView('ViewDeletedNote')
    }
}
</script>

<style>
    .view-deleted-note .time {
        text-align: right;
    }
    .view-deleted-note .note-title {
        font-size: 25px;
    }
    .view-deleted-note .note-content {
        font-size: 20px;
    }
    .view-deleted-note .buttons {
        width: fit-content;
        margin: 0 auto;
    }
    .view-deleted-note .buttons button {
        margin-right: 10px;
    }
</style>