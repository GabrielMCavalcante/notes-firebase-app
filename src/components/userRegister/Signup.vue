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
                <v-btn :loading="loading" block>Signup</v-btn>
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
export default {
    name: 'Signup',
    data() {
      return {
        valid: false,
        loading: false,
        email: new String(),
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
    }
};
</script>