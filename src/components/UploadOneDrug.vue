<template>
<q-page padding>
  <div class="q-gutter-md">
      <q-input
        filled
        v-model="drug.price"
        label="Price with 2 decimals"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        hint="Mask: #.##"
        input-class="text-right"
      />

        <q-input
            v-model="drug.description"
            filled
            autogrow
            />

        <q-input
        @input="val => { drug.product_image = val[0] }"
        filled
        type="file"
        hint="Product Image"
      />
    </div>
</q-page>
        
</template>

<script>
import Drug from 'pages/models/drugs'
export default {
    data () {
      return {
        drug: new Drug(),
         file: null,
      }
    }
}
</script>