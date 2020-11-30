<template>
   <q-page>
  <div class="q-pa-md">
    <q-table
      title="My Drugs"
      :data="data"
      :columns="columns"
      row-key="name"
      binary-state-sort
      :visible-columns="myCols"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
            <q-popup-edit v-model="props.row.id">
              <q-input v-model="props.row.id" dense autofocus counter type="text" />
            </q-popup-edit>
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" title="Update name" buttons>
              <q-input type="text" v-model="props.row.name" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="brand" :props="props">
            {{ props.row.brand }}
             <q-popup-edit v-model="props.row.brand" title="Update Brand" buttons>
              <q-input type="text" v-model="props.row.brand" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
            </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
            <q-popup-edit v-model="props.row.price" title="Update Price" buttons>
              <q-input type="number" v-model="props.row.price" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
            <q-td key="quantity_available" :props="props">
            {{ props.row.quantity_available }}
            <q-popup-edit v-model="props.row.quantity_available" title="Update Quantity" buttons>
              <q-input type="number" v-model="props.row.quantity_available" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
          
            <!-- <q-td key="batch_no" :props="props">
            {{ props.row.batch_no }}
             <q-popup-edit v-model="props.row.batch_no" title="Update Batch No." buttons >
              <q-input type="text" v-model="props.row.batch_no" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
            </q-td> -->
          <q-td key="location" :props="props">
            {{ props.row.location }}
            <q-popup-edit v-model="props.row.location" title="Update Location" buttons >
              <q-input type="text" v-model="props.row.location" dense autofocus hint="Use buttons to close" />
            </q-popup-edit>
          </q-td>
        </q-tr>

      </template>
    </q-table>
    <!-- <div class="q-py-md"> -->
      <div class="row flex flex-center text-center q-pb-xl q-mt-md">
            <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12">
<q-btn no-caps outline rounded color="primary" label="Update Collection" @click="updateMyDrugs" />
            </div>
      </div>
    </div>
     
  <!-- </div> -->
   </q-page>
</template>


<script>
import {SeniorService} from '../services/seniorService'
export default {
  name: 'MyDrugs',
  data () {
    return {
      myCols : ['name', 'brand', 'price', 'quantity_available',  'location'],
      columns: [
        {
          name: 'id',
          required: false,
          label: '',
          align: 'left',
          field: row => row.id,
          //format: val => `${val}`,
          //sortable: true
        },
        { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true, classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-primary text-white'},
        { name: 'brand', label: 'Brand', field: 'brand' },
        { name: 'price', label: 'Price (Naira)', field: 'price', sortable: 'true' },
        { name: 'quantity_available', label: 'Quantity Available', field: 'quantity_available', sortable: true },
        // {name: 'batch_no', label: 'Batch No.', field: 'batch_no', sortable: false},
        { name: 'location', label: 'Location', field: 'location' }
      ],
      data: []
    }
  },

  created() {
    this.getMyDrugs()
  },
  methods: {
    getMyDrugs() {
      let myId = JSON.parse(localStorage.getItem('user')).id;
      let my_cname = JSON.parse(localStorage.getItem('user')).company_name;
      let serv = new SeniorService(myId, my_cname)
      let d = serv.getMyDrugs().then(
        resp => {
          this.data = resp.data;
          console.log(this.data);
        }
      ).catch(
        err => {
          if (err.status == 400) {
            this.$q.notify({
              message: 'You are not authorized',
              color: 'secondary',
              textColor: 'white',
              icon: 'not_accessible'
            })
          }
          else {
            this.$q.notify({
              message: 'You have no drugs yet',
              color: 'primary',
              textColor: 'white',
            })
          }
        }
      )
      
    },

    updateMyDrugs() {
      let cname = JSON.parse(localStorage.getItem("user")).company_name;
      let uId = JSON.parse(localStorage.getItem("user")).id;
        let serv = new SeniorService(uId, cname)
        serv.updateMyDrugs(this.data).then(
          this.$q.notify(
            {
              message: 'Drugs Added',
              color: 'primary',
              textColor: 'white',
              icon: 'check_circle'
            })
        ).catch(
          err => {
            this.$d.notify(
              {
              message: 'Sorry, a problem occured while adding your drugs',
              color: 'secondary',
              textColor: 'white',
              icon: 'sync_problem'
            }
            )
          }
        )
        
    }

  }
}
</script>

