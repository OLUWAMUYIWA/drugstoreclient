<template>
    <q-page padding>
    <div classs="absolute-center">
        <h1 class="text-center">Welcome {{myname}}</h1>
    </div>
    </q-page>
</template>

<script>
export default {
    name: 'BossHome',
    data() {
        return {

        }
    },
    methods: {
        logout: function () {
            this.$store.dispatch(AUTH_LOGOUT)
            .then(() => {
            this.$router.push('/login')
            })
  }
    },
    computed: {
        myname: function() {
            return JSON.parse(localStorage.getItem("user")).name;
        }
    }
}

</script>