<template>
  <v-container class="overview d-inline-flex">
    <!-- Loading circle -->
    <div v-if="!loaded">
      <v-progress-circular
        class="loading"
        indeterminate
        rotate
        size="120"
        color="grey darken-2"
      ></v-progress-circular>
    </div>
    <v-row v-else>
      <!-- Note cards -->
      <v-col cols="3" v-for="note in filteredNotes" :key="note.id">
        <v-hover v-slot:default="{ hover }">
          <v-card @click="clickHandler(note)" :elevation="hover?'8':'2'" class="grey lighten-3 note">
            <v-checkbox
              v-if="multiselect"
              v-model="note.selected"
              @click="note.selected = !note.selected"
              :color="note.color.toLowerCase()"
              hide-details
              class="check-note"
            ></v-checkbox>
            <div class="filter-bar" :style="{background: note.color}"></div>
            <v-card-title>{{note.title | minifyTitle}}</v-card-title>
            <v-card-text>{{note.body | minifyContent}}</v-card-text>
          </v-card>
        </v-hover>
      </v-col>

      <!-- Add new note card -->
      <v-col cols="3" v-if="loaded">
        <v-hover v-slot:default="{ hover }">
          <v-card @click="addNewNote" outlined class="pa-3 note add-note" :elevation="hover?'8':'2'">
            <v-card-title>
              <span class="mx-auto">Add Note</span>
            </v-card-title>
            <v-card-text class="add-sign">
              <v-icon size="100">mdi-plus</v-icon>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Overview",
  data() {
    return {
      multiselect: false,
      options: [
        { 
          text: "Add note", 
          icon: "mdi-plus", 
          type: "normal", 
          click: ()=>{this.addNewNote()} 
        },
        {
          text: "Order By",
          slug: "order-by",
          first: 'Title',
          icon: "mdi-order-alphabetical-ascending",
          type: "dropdown",
          options: ["Title", "Creation", "Modification"],
          click: function(){}
        },
        {
          text: "Filter",
          slug: "filter",
          first: 'All',
          icon: "mdi-flag",
          type: "dropdown",
          options: [
            "All",
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
        { text: "Multiselection",
          icon: "mdi-vector-arrange-above",
          type: "normal",
          click: ()=>{this.multiselection()}
        },
        { 
          text: "Deleted notes", 
          icon: "mdi-trash-can-outline", 
          type: "normal",
          click: function(){console.log('deleted notes')} 
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["loaded", "notes", "search", "order", "filter", "currentNote"]),
    filteredNotes() {
      return this.notes.filter(note => {
        if (note.title.match(this.search)) {
          if (this.filter === "All") return note;
          else if (note.color === this.filter) return note;
        }
      }).sort((a, b)=>{
        if(a[this.order] > b[this.order]) return 1
        else if(a[this.order] < b[this.order]) return -1
        else return 0
      })
    }
  },
  methods: {
    ...mapActions(["setNotes", "setView", "setCurrentNote", "addNote"]),
    clickHandler(note) {
      if(!this.multiselect) {
        this.setCurrentNote(note)
        this.$emit('changeView', 'EditNote')
      }
      else note.selected = !note.selected
    },
    addNewNote() {
      const newNote = {
        title: 'untitled', 
        body: '', 
        color: 'Grey', 
        creation: Date.now(), 
        modification: Date.now(),
        selected: false
      }
      this.addNote(newNote)
        .then(()=>this.$emit('changeView', 'EditNote'))
        .catch(err=>console.warn('there has been an error:',err))
    },
    multiselection() {
      this.multiselect = !this.multiselect
    },
    capitalize(string) {
      console.log('before capitalize: ', string)
      let result = string.split('')
      result[0] = result[0].toLocaleUpperCase()
      return result.join('')
    }
  },
  created() {
    this.$emit("changeOptions", this.options)
    this.setView('Overview')
    this.setNotes()
    this.options[1].first = this.capitalize(this.order)
    this.options[2].first = this.filter
  },
  filters: {
    minifyTitle(value) {
      if (value.length > 30) return value.slice(0, 29) + "...";
      return value;
    },
    minifyContent(value) {
      if (value.length > 100) return value.slice(0, 99) + "...";
      return value;
    }
  }
};
</script>

<style>
.overview .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.overview .note {
  cursor: pointer;
  user-select: none;
  width: 250px;
  height: 250px;
  padding: 10px;
  overflow: auto;
}
.overview .add-sign {
  display: flex;
  align-items: center;
  justify-content: center;
}
.overview .filter-bar {
  width: 100%;
  height: 5px;
}
.overview .check-note {
  margin: 0 0 0 90%;
  width: fit-content;
  height: fit-content;
  padding: 0;
}
</style>