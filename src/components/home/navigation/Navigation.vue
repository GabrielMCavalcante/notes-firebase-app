<template>
  <nav>
    <v-app-bar app >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img 
          width="150" 
          height="93" 
          src="@/assets/logo.png" 
          class="mx-auto"
        ></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="view === 'Overview'" class="d-inline-flex" style="width: 400px;">
          <v-icon left>mdi-magnify</v-icon>
          <v-text-field
            @keyup="updateSearch" 
            placeholder="Search note..." 
            solo 
            style="margin-top: 25px;">
          </v-text-field>
      </div>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" width="300">
      <v-img width="200" height="93" src="@/assets/logo.png" class="mx-auto"></v-img>
      <v-list>
        <v-list-item>
          <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
          <v-list-item-content>
            <span 
              v-if="currentUser" 
              class="subtitle-1 font-weight-bold"
            >{{currentUser.email}}</span>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <a @click.prevent="logout" class="grey--text text--darken-2">Logout</a>
          </v-list-item-content>
        </v-list-item>
        <v-list-item-group>
          <v-list-item 
            @click="option.click" 
            v-for="option in navOptions" 
            :key="option.icon"
          >
            <div class="container d-inline-flex" v-if="option.type === 'normal'">
              <v-list-item-content>{{option.text}}</v-list-item-content>
              <v-list-item-icon>
                <v-icon>{{option.icon}}</v-icon>
              </v-list-item-icon>
            </div>
            <div class="container" v-else-if="option.type === 'dropdown'">
                <span class="caption">{{option.text}}</span>
                <v-select  
                  solo 
                  v-model="option.first" 
                  :items="option.options"
                  @change="updateOrderFilter(option.first)"
                ></v-select>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from 'firebase'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: "Navigation",
  data() {
    return {
      drawer: false,
      selected: 0,
      currentUser: null
    };
  },
  computed: {
    ...mapGetters(['search', 'order', 'filter', 'view', 'user'])
  },
  methods: {
      ...mapActions(['setSearch', 'setOrder', 'setFilter']),
      updateSearch(e) {
        this.setSearch(e.target.value)
      },
      updateOrderFilter(option) {
        if(this.view === 'Overview' || this.view === 'DeletedNotes') {
          if(['Title', 'Creation', 'Modification', 'Deletion'].includes(option)) 
            this.setOrder(option.toLowerCase())
          else this.setFilter(option)
        }
      },
      logout() {
        firebase.auth().signOut()
          .then(()=>this.$router.push('/'))
          .catch(err=>alert(`Error while logging out: ${err.message}`))
      }
  },
  props: ["navOptions"],
  created() {
    this.setOrder('title')
    this.setFilter('All')
    for(const option of this.navOptions) {
      if(option.type === 'dropdown') {
        this.updateOrderFilter(option.first)
      }
    }
    firebase.auth().onAuthStateChanged(auth=>{
      if(auth) this.currentUser = firebase.auth().currentUser 
    })
  }
};
</script>