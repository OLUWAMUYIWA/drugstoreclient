<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

      <q-toolbar-title class="absolute-center text-capitalize">Welcome, {{myname}}</q-toolbar-title>
        <q-btn
          to="/login"
          v-if="!loggedIn"
          flat
          rounded
          class="absolute-right"
          icon-right="account_circle"
          label="Login"
          no-caps
        />
        <q-btn
          v-else
          flat
          rounded
          @click="logout"
          class="absolute-right"
          icon-right="account_circle"
          label="Logout"
          no-caps
        />
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <q-footer>
      <div class=" col text-center q-mt-md">
        <p >Copywright © 2020 by Adel inc.</p>
        </div>
    </q-footer>


  </q-layout>
</template>

<script>
import {AUTH_LOGOUT} from '../store/actions/auth';
export default {
  data () {
    return {
      id: '',
      left: false,
      query: '',
    }
  },
  methods: {
    logout: function () {
      this.$router.push('/login')
      this.$store.dispatch(`newauth/${AUTH_LOGOUT}`)
          
      },
  },
  
  computed: {
    loggedIn: function() {
      let u = JSON.parse(localStorage.getItem("user"));
      if (u !== null) {
        return true
      }
      return false;
    },
      myname: function() {
            return JSON.parse(localStorage.getItem("user")).name;
        }
  }
}
</script>