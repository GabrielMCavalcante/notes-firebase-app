<template>
  <v-container class="overview d-inline-flex">
    <v-row>
      <v-col cols="3" v-for="note in notes" :key="note.id">
        <v-hover v-slot:default="{ hover }">
          <v-card :elevation="hover?'8':'2'" class="grey lighten-3 note">
            <v-card-title>{{note.title | minifyTitle}}</v-card-title>
            <v-card-content>{{note.body | minifyContent}}</v-card-content>
          </v-card>
        </v-hover>
      </v-col>
      <v-col cols="3" v-if="loaded">
        <v-hover v-slot:default="{ hover }">
          <v-card outlined="true" class="pa-3 note add-note" :elevation="hover?'8':'2'">
            <v-card-title>
              <span class="mx-auto">Add Note</span>
            </v-card-title>
            <v-card-content class="add-sign">
              <v-icon size="100">mdi-plus</v-icon>
            </v-card-content>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Overview",
  data() {
    return {
      loaded: false,
      options: [
        { text: "Add note", icon: "mdi-plus", type: "normal" },
        {
          text: "Order By",
          first: "Name",
          icon: "mdi-order-alphabetical-ascending",
          type: "dropdown",
          options: ["Name", "Creation", "Modification"]
        },
        {
          text: "Filter",
          first: "All",
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
          ]
        },
        {
          text: "Multiselection",
          icon: "mdi-vector-arrange-above",
          type: "normal"
        },
        { text: "Deleted notes", icon: "mdi-trash-can-outline", type: "normal" }
      ],
      notes: [
        {
          id: 1,
          title: "List of books",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        },
        {
          id: 2,
          title: "Another anotation",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        },
        {
          id: 3,
          title: "My wonderfull day",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
        }
      ]
    };
  },
  created() {
    this.loaded = false;
    this.$emit("overview", this.options);
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=20").then(res => {
      res.json().then(data => {
        this.loaded = true;
        this.notes = data;
      });
    });
  },
  filters: {
    minifyTitle(value) {
      if (value.length > 20) return value.slice(0, 19) + "...";
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
</style>