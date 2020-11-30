<template>
<q-page padding>
 <div class="q-pa-md">
    <q-table
      title="Unverified Users"
      :data="data"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      no-data-label="You have no unverified users"
    />

    <div class="q-mt-md">
       <q-btn no-caps flat rounded @click="verify" :ripple="{ color: 'primary' }" color="secondary" label="Verify"/>
    </div>
  </div>
</q-page>
 
</template>

<script>
import {BossService} from '../services/bossService'
import _ from 'lodash'

export default {
  data () {
    return {
      selected: [],
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          classes: '-gbgrey-2 ellipsis',
          headerClasses: 'bg-primary text-white'
        },
        { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
        { name: 'company_name', label: 'Company Name', field: 'company_name', sortable: true },
        { name: 'address', label: 'Address', field: 'address' },
        { name: 'practice_area', label: 'Practice Area', field: 'practice_area' },
        { name: 'phone', label: 'Phone', field: 'phone' }
        ],
      data: []
    }
  },
  created() {
    //let boss = new BossService()
    BossService.getUnverifiedJuniors().then(response=> {
      this.data = response.data;
      console.log(this.data);
    })
  },
  methods: {
   getStringsToVerify() {
    return  _.flatMap(this.selected, function getStr(i) {
       return i.id
     })
   },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    verify() {
      BossService.verifyManyJuniors(this.getStringsToVerify())
        this.$q.notify({
          message: 'All verified',
          color: 'primary',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
        });
      location.reload()      
    }
  }
}
</script>