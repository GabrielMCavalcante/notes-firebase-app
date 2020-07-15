<template>
  <div class="login">
    <v-card-title style="width: fit-content" class="mx-auto">Login</v-card-title>
    <v-form style="width: 300px" v-model="valid" class="mx-auto">
      <v-container>
        <v-row>
          <v-icon left>mdi-email</v-icon>
          <v-text-field 
            v-model="email" 
            :rules="emailRules" 
            required 
            label="Email"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-icon left>mdi-lock</v-icon>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            required
            label="Password"
            type="password"
          ></v-text-field>
        </v-row>
        <v-row>
            <v-col cols="12" >
                <v-btn :loading="loading" @click="login" block>Login</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="feedback">
          <v-col cols="12">
            <div class="red--text caption">{{feedback}}</div>
          </v-col>
        </v-row>
        <v-row>
          <p class="caption mx-auto">
            <a class="link" @click.prevent="$emit('signup')">I don´t have an account</a>
          </p>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
    name: 'Login',
    data() {
      return {
        valid: false,
        loading: false,
        email: new String(),
        feedback: null,
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid'
        ],
        password: new String(),
        passwordRules: [
          v => !!v || 'Password is required',
          v => /(?=.{8,})/.test(v) || 'Password must have 8 characters or long'
        ]
      }
    },
    methods: {
      login() {
        const user = {email: this.email, password: this.password}
        this.loading = true
        this.feedback = null
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(()=>{
          this.loading = false
          this.$router.push('/home')
        }).catch(err=>{
          this.feedback = err.message
          this.loading = false
        })
      }
    }
};
</script>