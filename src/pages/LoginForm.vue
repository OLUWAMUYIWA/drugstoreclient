<template>
<q-page padding>
<div class="q-pa-md  q-gutter-md" >
  <!-- <div class="row text-center flex flex-center">
    
    <div class="col-md-6 col-lg-6 col-sm-12"> 
      
      <q-btn
      rounded
      padding
      class="q-mx-lg q-my-md"
      color="teal"
      size="md"
      no-caps
      label="Register as a user"
      @click="gouser"
    />
    </div>
    <div class="col-md-6 col-lg-6 col-sm-12">
    <q-btn
      rounded
      padding
      color="teal"
      size="md"
      class="q-mx-lg q-my-md"
      no-caps
      label="Register as a Contributor"
      @click="gocontributor"
    />
    </div>
  </div> -->
  <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-lg absolute-center"
      style="max-width: 400px"
    >
      <q-input
        filled
        
        v-model="user.email"
        type="email"
        label="email"
        hint="e.g. yourmail@gmail.com"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please put in your email']"
      />

      <q-input 
      v-model="user.password" 
      filled :type="isPwd ? 'password' : 'text'" 
      hint="Input your password"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please put in your email']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
  </q-input>
      <div>
        <div class="row flex flex-center text-center q-pb-xl q-mt-md">
            <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12">
        <q-btn no-caps label="Submit" type="submit" color="primary" flat @click="handleLogin"/>
        <q-btn no-caps label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
        </div>

      </div>    
      </q-form>

  <!-- </div> -->
  </div>
</q-page>
</template>

<script>
import User from 'pages/models/userLogin';
import store from "../store";
import {AUTH_REQUEST} from '../store/actions/auth'
export default {
    name: 'LoginForm',
    data () {
        return {
          user: {
            email: '',
            password: ''
          },
          isPwd: true,
          accept: false,
          message: '',
          color: ''   
        }
    },
    methods: {
    
    gouser() {
      this.$router.push('/register_user')
    },
    gocontributor() {
      this.$router.push('/register_contributor')
    },
    onSubmit () {
        this.handleLogin()
    },
    notif(col, mess) {
        this.$q.notify({
          color: col,
          textColor: 'white',
          icon: 'cloud_done',
          message: mess
        })
    },
    onReset () {
      this.user.name = null
      this.user.age = null
      this.accept = false
    }, 
    handleLogin: function() {
        if (this.user.email && this.user.password) {
          console.log('entered request')
          this.$store.dispatch(`newauth/${AUTH_REQUEST}`, this.user).then(() => {

              this.notif('primary', 'Logged in successfully');
              let u = JSON.parse(localStorage.getItem("user"))
              if (u) {
                if (u.role  === 'boss') {
                  const path = `/boss/`
                    if (this.$route.path !== path) this.$router.push({path:'/boss/'});
                }
                else if (u.role  === 'senior') {
                  let path = `/contributor/`;
                  if (this.$route.path !== path) this.$router.push(path);
                }

                else if (u.role === 'junior') {
                    const path = `/user/search`
                    if (this.$route.path !== path) this.$router.push({path: '/user/search'});
                }
              }
              else {
                this.$q.notify(
                {
                  message: 'Problem occured during login, please try',
                  color: 'secondary'
                }
              );
              if (this.$route !== "/login") this.$router.push({path: '/login'})
              }
              
              
            })
            .catch((error) => {
              this.$q.notify(
                {
                  message: 'Access denied. You have no account with us',
                  color: 'secondary'
                }
              );
              this.$router.push({path: '/'})
          });
        }
        else {
          this.notif('secondary', 'Fill in all fields')
        };
    }
  }

}
</script>

<style scoped>
.my-center {
  text-align: center
}
</style>