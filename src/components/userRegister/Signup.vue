<template>
  <div class="signup">
    <v-card-title style="width: fit-content" class="mx-auto">Signup</v-card-title>
    <v-form style="width: 300px" v-model="valid" class="mx-auto">
      <v-container>
        <v-row>
          <v-icon left>mdi-email-plus</v-icon>
          <v-text-field 
            v-model="email" 
            :rules="emailRules" 
            required 
            label="Your email"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-icon left>mdi-lock-plus</v-icon>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            required
            label="New password"
            type="password"
          ></v-text-field>
        </v-row>
        <v-row>
            <v-col cols="12" >
                <v-btn :loading="loading" @click="signup" block>Signup</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="feedback">
          <v-col cols="12">
            <div class="red--text caption">{{feedback}}</div>
          </v-col>
        </v-row>
        <v-row>
          <p class="caption mx-auto">
            <a class="link" @click.prevent="$emit('login')">I have an account</a>
          </p>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import db from '@/firebase/init.js'
import firebase from 'firebase'
export default {
    name: 'Signup',
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
      signup() {
        if(this.email && this.password) {
          if(this.password.length >= 8) {
            const user = {email: this.email, password: this.password}
            this.loading = true
            this.feedback = null
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
              .then(res=>{
                const userData = res.user
                db.collection('users').doc(userData.uid).set({
                  notes: [],
                  trash: []
                }).then(()=>{
                  this.loading = false
                  this.$router.push('/home')
                })
              })
              .catch(err=>{
                this.feedback = err.message
                this.loading = false
              })
          } else {
            this.loading = false
            this.feedback = 'Password must be at least 8 characters long'
          }
        } else {
          this.loading = false
          this.feedback = 'You must fill all required fields'
        }
      }
    }
};
</script>