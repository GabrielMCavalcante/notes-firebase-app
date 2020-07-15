<template>
  <v-container class="register">
    <v-row>
      <v-col cols="12">
        <div style="width: 600px" class="register container">
          <v-card width="600" class="grey lighten-3 py-5">
            <v-img
              width="384"
              height="179"
              src="@/assets/logo.png"
              class="mx-auto"
            ></v-img>
            <component 
              :is="component" 
              @signup="component='Signup'" 
              @login="component='Login'"
            ></component>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Login from "./Login.vue"
  import Signup from "./Signup.vue"
  import {mapActions} from 'vuex'
  export default {
    name: "Register",
    data() {
      return {
        component: "Login"
      }
    },
    components: {
      Login: Login,
      Signup: Signup
    },
    methods: {
      ...mapActions(['setLogout'])
    },
    created() {
      this.setLogout(false)
    }
  }
</script>

<style>
  .register {
    margin-top: 10px;
  }
  a.link {
    color: grey !important;
  }
  a.link:hover {
    font-weight: 500;
  }
</style>
