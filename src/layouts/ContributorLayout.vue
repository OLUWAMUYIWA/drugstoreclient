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
          class="absolute-right"
          icon-right="account_circle"
          label="Login"
        />
        <q-btn
          v-else
          flat
          @click="logout"
          class="absolute-right"
          icon-right="account_circle"
          label="Logout"
          no-caps
        />
      </q-toolbar>
    </q-header>

    <q-drawer 
    show-if-above 
    v-model="left" 
    side="left" 
    elevated
    bordered
    content-class="bg-primary"
    :breakpoint="767"
    :width="250">

     <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          exact
          clickable
          v-for="(nav, index) in navs"
          :to="nav.to"
          :key="index"
          class="text-grey-4"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
 
      </q-list>

    </q-drawer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>

    <q-footer
      style="height=40"
    >
      <q-tabs>
        <q-route-tab
          no-caps
          exact
          v-for="(nav, index) in navs"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
          :key="index"
        />
      </q-tabs>
       <div class="col text-center q-mt-md">
        <p >Copywright © 2020 by Adel inc.</p>
        </div>
    </q-footer>

    <q-drawer
    v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-primary"
      :breakpoint="767"
      :width="250"
      >
      <q-list dark>
        <q-item-label header>Navigation</q-item-label>
        <q-item
          exact
          clickable
          v-for="(nav, index) in navs"
          :to="nav.to"
          :key="index"
          class="text-grey-4"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

  </q-layout>
</template>

<script>
import {AUTH_LOGOUT} from '../store/actions/auth';
export default {
  data () {
    return {
      id: '',
      cname: '',
      left: false,
      leftDrawerOpen: this.$q.platform.is.desktop,
      copystyle: {
        'text-align': 'center'
      },
      navs: [
        {
          label: 'My Drugs',
          icon: 'list',
          to: `/contributor`
        },
        {
          label: 'Upload Many',
          icon: 'backup',
          to: `/contributor/uploadManyDrugs`
        },
        {
          label: 'Search',
          icon: 'search',
          to: `/user/search`
        }
        
      ]
    }
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
  },
  methods: {
     logout: function () {
        this.$store.dispatch(`newauth/${AUTH_LOGOUT}`)
        .then(() => {
          this.$router.push({name : 'Login'})
        })
      },
  }
}
</script>