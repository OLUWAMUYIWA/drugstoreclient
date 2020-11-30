<template>
<q-page padding>
  <div class="q-gutter-y-md column absolute-center" style="min-width: 400px" >
    <q-input rounded filled v-model="query" v-on:keyup.enter="submit">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
     </q-input>
     <q-btn no-caps flat rounded color="primary" label="Search" @click="submit"/>
  </div>
</q-page>

</template>


<script>
export default {
  name: 'Search',
  data() {
    return{
      query: ''

    }
  },
  methods: {
    submit() {
      if (this.query.length !== 0) {
        this.$router.push(`/user/search/${this.query}`)
      }
      else {
        this.$q.notify({
          message: 'Your search query is empty',
          color: 'primary'
        })
      }
    }
  }
}
</script>