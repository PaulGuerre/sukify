<template>
  <div class="text-center align-items-center h-100" style="margin-top: 25vh;">
    <div class="form-signin" style="width:100%; max-width: 330px; padding: 15px; margin:auto;">
      <form>
        <img class="mb-4" src="../assets/logo.png" alt="" width="64" height="64">

        <div class="form-floating mb-1">
          <input v-model="username" type="email" class="form-control" id="floatingInput" placeholder="Username">
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-success" type="button" @click="login()">Log in</button>
      </form>
    </div>

    <info-displayer />
  </div>
</template>

<script>
import ApiManager from '@/services/ApiManager'
import InfoManager from '@/services/InfoManager'
import InfoDisplayer from '@/components/Utils/InfoDisplayer'

export default {
  name: 'LoginView',
  components: {
    InfoDisplayer
  },
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
          localStorage.setItem('token', response.data.token)
          this.$router.push('/')
        } else {
          InfoManager.showInfo('Login failed', 'danger')
        }
      })
    }
  },
  created () {
    ApiManager.compareToken(localStorage.getItem('token')).then(response => {
      if (response.data.message === 'success') {
        this.$router.push('/')
      }
    })
  }
}
</script>
