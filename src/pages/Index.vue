<template>
  <q-page >
    <section> 
        <div class=" main full-height full-width flex flex-center text-center"
           style="background-color: rgba(0, 0, 0, 0.68) !important;z-index:0;height: 100vh !important;">
        <div class="">
          <div class="text-h6 text-grey-5">Welcome to</div>
          <div class="text-h2 text-white q-py-sm q-my-md"
               style="border-top:3px solid #1595de;border-bottom: 3px solid #2faa64;">drustores.ng
          </div>
          <div class="text-h6" style="color: #f4b825;">
            Search | Contribute
          </div>
        </div>
      </div>
    </section>
    <q-space>
    </q-space>

        
    <div>
     <div class="col-md-12 col-md-12 col-xs-12 col-sm-12 q-mb-xl flex flex-center">
       <q-card class="q-pa-md q-py-xl q-my-xl q-ma-md my-card" background-color="#eb4f71" >
      <q-card-section class="text-center">
        <div class="text-h6">What we offer you</div>
        <div class="text-subtitle2"></div>
      </q-card-section>

      <q-tabs v-model="tab" class="text-teal text-center">
        <q-tab label="Search" name="one" />
        <q-tab label="Contribute" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one" class="text-center">
          Seach our massive and regurlarly updated database for drugs that are available in stores all over Nigeria. 
          You will most likely find any drug you're looking fore here <br/>
        <q-btn 
                outline
                rounded
                no-caps
                to="/register_user"
                color="teal" label="Register as a User" class="q-mt-md">
                </q-btn>
        </q-tab-panel>

        <q-tab-panel name="two" class="text-center">
          Register with us and contribute to this repository of drugs. You are the one who reaps all the 
          benefits as drugs in your store become more accessible to buyers. Contribute today.

           <q-btn
                outline
                no-caps
                rounded
                to="/register_contributor"
                color="teal" label="Register as a Contributor" class="q-mt-md">
                </q-btn> 
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
     </div>
    
  </div>

     
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data() {
    return {
       tab: 'one'
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px
}
  


.main {

    background: url(../assets/pharmacy1.png) no-repeat center center fixed ;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh !important;
    
  }
</style>