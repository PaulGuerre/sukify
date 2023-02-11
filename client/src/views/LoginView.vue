<template>
  <div class="text-center align-items-center h-100" style="margin-top: 25vh;">
    <div class="form-signin">
      <form>
        <img class="ma-4" src="../assets/logo.png" alt="" width="64" height="64">

        <div class="form-group ma-1">
          <input v-model="username" type="email" class="form-control input-field" placeholder="Username">
        </div>
        <div class="form-group ma-3">
          <input v-model="password" type="password" class="form-control input-field" placeholder="Password" @keyup.enter="login()">
        </div>

        <button class="login-btn" type="button" @click="login()">Log in</button>
      </form>
    </div>
  </div>
</template>

<script>
import ApiManager from '@/services/ApiManager'

export default {
  name: 'LoginView',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      ApiManager.compareCredentials(this.username, this.password).then(response => {
        if (response.data.message === 'success') {
          sessionStorage.setItem('token', response.data.token)
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.input-field {
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
}

.login-btn {
  background-color: #1db954;
  color: white;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
}
</style>
