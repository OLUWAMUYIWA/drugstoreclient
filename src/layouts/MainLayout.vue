<template>
    <q-layout view="lHh lpr lFf" style="height: 1000px" class="shadow-2 rounded-borders">
      <q-header elevated class="blue-1" style="height: 50px">
        <!-- <q-toolbar> 
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-space ></q-space>
        </q-toolbar> -->
         <q-toolbar class="text-h4">
          <q-space></q-space>
          <q-tabs  shrink no-caps>
            <q-route-tab style="backgroundColor:'green';width:120px;min-height:auto !important;color: white" class="q-mr-xs q-py-xs custom_tab"
                   :to="'/'"
                   label="Home"/>
            <q-route-tab style="backgroundColor:'green';width:120px;min-height:auto !important;color: white" class="q-mr-xs q-py-xs custom_tab"
                   :to="_use" 
                   label="Use"/>
            <q-route-tab style="backgroundColor:'green';width:120px;min-height:auto !important;color: white" class="q-mr-xs q-py-xs custom_tab"
                   :to="_contribute"
                   label="Contribute"/>
            <q-route-tab v-if="isBoss" style="backgroundColor:'green';width:120px;min-height:auto !important;color: white" class="q-mr-xs q-py-xs custom_tab"
                   :to="_bossme"
                   label="Boss"/>
            <q-route-tab style="backgroundColor:'green';width:120px;min-height:auto !important;color: white" class="q-mr-xs q-py-xs custom_tab"
                   :to="'/login'"
                   label="Sign in"/>
          </q-tabs>
        </q-toolbar>
        
      </q-header>

     

      <q-page-container class="bg-grey-1">
        <q-page class="q-pa-md">
          <router-view/>
        </q-page>
      </q-page-container>
      
      <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <div class="col text-center q-mt-md">
        <p>Copywright © 2020 by Adel inc.</p>
        </div>
      </q-toolbar>
    </q-footer>
   
        
    </q-layout>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      left: false,
      query: '',
    }
  },
  methods: {
    goto(r) {
      this.$router.push(r)
    },
    loggedIn: function() {
      let u = JSON.parse(localStorage.getItem("user"));
      if (u !== null) {
        return true
      }
      return false;
    },
  },
  computed: {
  isBoss: function () {
    let u = JSON.parse(localStorage.getItem("user"))
    if (u){
      if (this.loggedIn) {
      if (this.$store.getters['newauth/isBoss']) {
        return true
      }
      else {
        return false
      }   
    } else {
      return false
    }
    }
    else {
      return false
    }
    
   },
  _use: function() {
    let u = JSON.parse(localStorage.getItem("user"))
    if (u){
      if (this.loggedIn) {
          return `/user/search`
      }
      else {
          return '/register_user'
      }
    }
    else {
      return '/login'
    }
  },

  _contribute: function() {
    let u = JSON.parse(localStorage.getItem("user"));
    if (u){
    if (this.loggedIn) {
      if ( u.role === 'senior' ||  u.role === 'boss') {
         return  `/contributor`
      } else {
        return `/user/search`
      }
   } 
   else {
     return '/login'
   }
    }
    else {
      return '/login'
    }
  },

  _bossme: function() {
    let u = JSON.parse(localStorage.getItem("user"));
    if (u){
    if (this.loggedIn) {
      if (u.role === 'boss') {
         return  `/boss/`
      } else {
        return `/user/search`
      }
   } 
   else {
     return '/login'
   }
  } else {
    return '/login'
  }
}
  }
}
</script>