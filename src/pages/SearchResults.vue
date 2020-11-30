<template>
  <div class="q-pa-md" >
    <div class="q-gutter-y-md column" style="max-width: 200px" >
      
    <q-input rounded filled v-model="query" v-on:keyup.enter="searchDrug">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
     </q-input>
     <q-btn no-caps flat rounded color="primary" label="Search" @click="searchDrug"/>
  </div>
  <div>
    <!-- <dcard :visible="visible" @close="visible=false" :drug="modalData" @update-vis="update"></dcard> -->
  </div>
  <q-separator/>
    <q-list v-if="data" bordered padding>
        <q-item v-for="drug in data" :key="drug.id">
       <q-item-section>
         <q-item-label class="text-capitalize">
           {{drug.name}}
         </q-item-label>
         <q-item-label caption>
            {{drug.description}} 
          </q-item-label>
         </q-item-section>
          <q-item-section side top>
            <q-badge color="teal" :label="drug.exp"/>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption>
              <q-btn no-caps flat label="More details" color="primary" @click="showModalMethod({name: drug.name, location: drug.location,
              brand: drug.brand, description: drug.description, exp: drug.exp, quantity_available: drug.quantity_available, price: drug.price, phone: drug.cphone
              , company_name: drug.company_name})"/>
            </q-item-label>
          </q-item-section>
      </q-item>
      
    </q-list>
<dcard v-if="showModal" :modal.sync="showModal" :passedObject="objectToPass"></dcard>
  </div>
  
</template>

<script>
import {DrugSearchService} from '../services/drugSearchService';
import {HTTP} from '../services/http-common';
import authHeader from '../services/auth-header';
import DrugCard from '../components/DrugCard'
import DrugCardVue from '../components/DrugCard.vue';
export default {
    name: 'SearchResultsHome',
    components: 
    {
      'dcard': DrugCard
    },
    data() {
        return{
            query: '',
            data: [],
            showModal: false,
            objectToPass: null,
        }
    },
    mounted() {
        this.getDrugs()
    },
    
    methods: {
      showModalMethod(item) {
        console.log('here')
        this.showModal = true;
        this.objectToPass = item;
      },


      getDrugs: function() {
            let search = new DrugSearchService(this.$route.params.query);
            search.searchDrug().then(
                (response) => {
                  this.data = response.data;
                }
            )
            console.log(this.data)
        },
      searchDrug: function() {
          let search = new DrugSearchService(this.query);
          this.$router.push(`/user/search/${this.query}`)
          search.searchDrug().then(
              (response) =>{
                  this.data = response.data;
                  console.log(this.data)
              })
              .catch(error => {
                  this.$q.notify({
                    message: 'No results'
                  })
                });
        },
        
    }
}
</script>

<style>

</style>
