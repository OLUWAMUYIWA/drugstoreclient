<template>
<q-page class=" q-pa-mdq-ma-md">
  <q-form 
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
        <q-input
        filled
        v-model="user.name"
        label="Full name"
        hint="Firstname and Lastname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please fill in your name']"
      />



        <q-input 
        v-model="user.phone_no" 
        filled 
        type="tel" 
        label="Phone"
        lazy-rules
        hint="e.g. 0801......." 
        :rules="[ val => val && val.length == 11  || 'Please put in an eleven-digit number']"
        />

        <q-input
        filled
        v-model="user.address"
        label="Address"
        hint="Your local address"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please put in a value here']"
      />

        <q-input
        filled
        v-model="user.email"
        type="email"
        label="Email"
        hint="Your personal email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please put in your email']"
      />

        <q-input v-model="user.password" filled :type="isPwd ? 'password' : 'text'" hint="Choose something truly secret">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Passwords are compulsory']"
          />
        </template>
      </q-input>

        <q-input
        filled
        v-model="user.company_name"
        label="Company name"
        hint="Name of the company you represent"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please put in a value here']"
      />

        <q-input
        filled
        v-model="user.practice_area"
        label="Practice Area"
        hint="Your parctice area"
      />

       <div>
         <div class="row flex flex-center text-center q-pb-xl q-mt-md">
            <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12">
        <q-btn no-caps flat rounded label="Submit" type="submit" color="primary"/>
        <q-btn no-caps rounded label="Clear" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
      </div>
      </div>
    </q-form>
</q-page>
    
</template>

<script>
import User from 'pages/models/junior';
import {AuthService} from '../services/authService'
import Axios from 'axios';
export default {
  name: 'UserRegForm',
  data () {
    return {
      
      isPwd: true,
      accept: false,
      message: '',
      user: {
        name: '',
        phone_no: '',
        email: '',
        address: '',
        company_name: '',
        password: '',
        practice_area: ''
      },
    }
  },

  methods: {
    onSubmit () {
        let auth = new AuthService();
        console.log(this.user)
        auth.registerJun(this.user).then(
            response=> {
            this.message = response.data;
              this.$q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted, Await verification.'
                })
          }).catch(err => {
            if (err.response.status == 401) {
              this.$q.notify({
                color: 'red-4',
                textColor: 'white',
                icon: 'not_accessible',
                message: "You have registered before"
            })}
            else {
              this.$q.notify({
                  color: 'red-4',
                  textColor: 'white',
                  icon: 'mood_bad',
                  message: "Problem occured, check your connection"
            })}
            });
            this.$router.push('/')
    },
    
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    } 
  }
}
</script>