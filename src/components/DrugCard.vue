<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="modal" persistent transition-show="scale" transition-hide="scale">
      <q-card >
          <!-- drug picture or placeholder -->
        <q-img v-if="passedObject.product_image" src="passedObject.product_image"/>
        <q-img v-else src="https://cdn.quasar.dev/img/chicken-salad.jpg" /> 
        <!-- <q-img src="../assets/placeholder.png" />      -->
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="local_pharmacy"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
            no-caps
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{passedObject.name}}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place" />
              {{passedObject.location}}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{passedObject.brand}}
          </div>
          <div class="text-caption text-grey">
            {{passedObject.description}}
          </div>
          <div class="text-caption text-grey">
           <p> Expires in {{passedObject.exp}} months </p>
          </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
            <div class="text-subtitle2 text-grey">
               <p> In stock:  {{passedObject.quantity_available}} </p>
            </div>
            <div class="text-subtitle2 text-grey">
                <q-icon name="local_offer" />
                {{passedObject.price}}
            </div>
            <div class="text-subtitle2 text-grey">
                <q-icon name="local_hospital" />
                {{passedObject.company_name}}
            </div>
            <div class="text-subtitle2 text-grey">
                <q-icon name="call" />
                {{passedObject.phone}}
            </div>


        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Close" @click="closeModal" no-caps/>
        </q-card-actions>
      </q-card>
    </q-dialog>

   
  </div>
</template>

<script>
export default {
  props: {
        modal:{
            default:false
        },
        passedObject: {
            type: Object
        }
        },
  data() {
    return {
      
    }
  },
  methods: {
    closeModal() {
          this.$emit('update:modal', !this.modal)
    }
  }
}
</script>
