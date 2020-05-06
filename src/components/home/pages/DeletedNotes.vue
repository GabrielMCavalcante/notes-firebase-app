<template>
  <div class="deleted-notes">
    <div v-if="trashSelected.length >= 1">
      <div class="buttons">
        <div class="d-inline-flex">
          <v-btn @click="selectAll" class="multiselection-option">
            <v-icon left>mdi-select-all</v-icon>
            Select all
          </v-btn>
          <v-btn @click="unselectAll" class="multiselection-option">
            <v-icon left>mdi-select-off</v-icon>
            Unselect all
          </v-btn>
          <v-btn @click="invertAll" class="multiselection-option">
            <v-icon left>mdi-select-inverse</v-icon>
            Invert selection
          </v-btn>
          <v-btn @click="deleteSelected" class="red lighten-1 white--text">
            <v-icon left>mdi-delete-circle-outline</v-icon>
            Delete
          </v-btn>
        </div>
      </div>
    </div>

    <v-container class="d-inline-flex">
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
          <div v-if="trash.length === 0" class="trash-info">
              <v-img
                src="@/assets/empty-trash-icon.png"
                width="200"
                height="200"
              ></v-img>
              <span class="display-2">Trash empty</span>
          </div>

          <div v-else-if="filteredTrash.length === 0" class="trash-info">
              <v-img
                src="@/assets/not-found-icon.png"
                width="200"
                height="200"
              ></v-img>
              <span class="display-2">No notes found. Try a different filter</span>
          </div>

        <!-- Note cards -->
        <v-col v-else cols="12" sm="4" md="3" v-for="note in filteredTrash" :key="note.id">
          <v-hover v-slot:default="{ hover }">
            <v-card 
              @click="clickHandler(note)" 
              :elevation="hover?'8':'2'" 
              class="grey lighten-3 note"
            >
              <v-checkbox
                v-if="multiselect"
                :value="hovering"
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

      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DeletedNotes",
  data() {
    return {
      multiselect: false,
      hovering: false,
      trashSelected: new Array(),
      options: [
        { 
          text: "Home", 
          icon: "mdi-home", 
          type: "normal", 
          click: ()=>{this.gotoOverview()} 
        },
        {
          text: "Order By",
          slug: "order-by",
          first: 'Title',
          icon: "mdi-order-alphabetical-ascending",
          type: "dropdown",
          options: ["Title", "Creation", "Modification", "Deletion"],
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
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["loaded", "search", "order", "filter", "currentNote", "trash"]),
    filteredTrash() {
      return this.trash.filter(note => {
        if (note.title.toLowerCase().match(this.search.toLowerCase())) {
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
    ...mapActions(["setTrash", "setView", "setCurrentNote", "setOrder", "setFilter"]),
    clickHandler(note) {
      if(!this.multiselect) {
        // this.setCurrentNote(note)
        // this.$emit('changeView', 'ViewDeletedNote')
      }
      else {
        note.selected = !note.selected
        if(note.selected) {
          this.trashSelected.push(note)
        } else {
          this.trashSelected = this.trashSelected.filter(n=>n.id!==note.id)
        }
      } 
    },
    multiselection() {
      this.multiselect = !this.multiselect
      if(!this.multiselect) {
        const resetNotesSelectedState = this.trash.filter(note=>{
          if(note.selected)
            note.selected = false
          return note
        })
        this.$store.commit('setTrash', resetNotesSelectedState)
        this.setTrash(resetNotesSelectedState)
        this.trashSelected = new Array()
      }
    },
    selectAll() {
      this.trash.forEach(note=>note.selected = true)
      this.trashSelected = this.trash
    },
    unselectAll() {
      this.trash.forEach(note=>note.selected = false)
      this.trashSelected = new Array()
    },
    invertAll() {
      this.trashSelected = new Array()
      this.trash.forEach(note=>{
        note.selected = note.selected ? false : true
        if(note.selected) this.trashSelected.push(note)
      })
    },
    deleteSelected() {
      const response = confirm('All notes selected will be sent to the trash. Continue?')
      if(response) {
        this.sendToTrash(this.trashSelected)
          .catch(err=>alert(`Error while deleting note: ${err.message}`))
      }
    },
    capitalize(string) {
      let result = string.split('')
      result[0] = result[0].toLocaleUpperCase()
      return result.join('')
    },
    gotoOverview() {
      this.setOrder('title')
      this.setFilter('All')
      this.$emit('changeView', 'Overview')
    }
  },
  created() {
    this.$emit("changeOptions", this.options)
    this.setView('DeletedNotes')
    this.setTrash()
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
.deleted-notes .trash-info {
  width: 100%;
  height: fit-content;
  transform: translateY(50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
}
.deleted-notes .buttons {
  width: fit-content;
  margin: 0 auto;
}
.deleted-notes .multiselection-option {
  margin-right: 10px;
}
.deleted-notes .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.deleted-notes .note {
  cursor: pointer;
  user-select: none;
  width: 250px;
  height: 250px;
  padding: 10px;
  overflow: auto;
}
.deleted-notes .add-sign {
  display: flex;
  align-items: center;
  justify-content: center;
}
.deleted-notes .filter-bar {
  width: 100%;
  height: 5px;
}
.deleted-notes .check-note {
  margin: 0 0 0 90%;
  width: fit-content;
  height: fit-content;
  padding: 0;
}
</style>