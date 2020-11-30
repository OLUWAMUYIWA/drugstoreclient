<template>
    <div>
<div id="UploadManyDrugs">
  <div class="q-pa-sm q-gutter-sm">
    <q-table title="Upload Drugs" 
    :data="data" 
    :columns="columns" 
    row-key="name" 
    binary-state-sort
    no-data-label="Start by adding the first row"
    >
      <template v-slot:top>
          <q-btn no-caps dense color="secondary" label="Add Drug" @click="show_dialog = true" ></q-btn>
        <div class="q-pa-sm q-gutter-sm">
        <q-dialog v-model="show_dialog">
        <q-card class="bg-grey-4">
          <q-card-section>
            <div class="text-h6">Add new drug</div>
          </q-card-section>

          <q-card-section>
            <div class="row">
              <q-input class="q-px-md q-ma-sm " v-model="editedItem.name" label="Name" type="text"></q-input>
              <q-input class="q-px-md   q-ma-sm" v-model="editedItem.description" label="Description" type="textarea"></q-input>
              <q-input class="q-px-md  q-ma-sm" v-model="editedItem.exp" label="Months before expiry" type="number"></q-input>
              <q-input class="q-px-md  q-ma-sm" v-model="editedItem.brand" label="Brand" type="text"></q-input>
              <q-input class="q-px-md  q-ma-sm" v-model="editedItem.batch_no" label="Batch No" type="text"></q-input>
              <q-input class="q-px-md  q-ma-sm" v-model="editedItem.quantity_available" label="Quantity Available" type="number"></q-input>
              <q-input class="q-px-md  q-ma-sm" v-model="editedItem.price" label="Price (₦)" type="number"></q-input>
              <q-input class="q-px-md  q-ma-sm" v-model="editedItem.location" label="Location" type="text"></q-input>
              
              <!-- <q-uploader
                style="max-width: 300px"
                url="../assets"
                label="Images only"
                accept=".jpg,.png, image/*"
                max-file-size="2048"
                field-name="drugImg"
                @rejected="onRejected"
                :factory="factoryFunc"
              /> -->
            </div>
          </q-card-section>
          
          <q-card-actions align="right">
            <q-btn no-caps flat label="OK" color="primary" v-close-popup @click="addRow" ></q-btn>
          </q-card-actions>
        </q-card>
    </q-dialog>
          </div>
        
      </template>

      <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
              <q-popup-edit v-model="props.row.name">
                <q-input v-model="props.row.name" dense autofocus  ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="description" :props="props">
              {{ props.row.description }}
              <q-popup-edit v-model="props.row.description" title="Update Description" buttons>
                <q-input type="text"  v-model="props.row.description" autogrow dense autofocus ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="brand" :props="props">
              <div class="text-pre-wrap">{{ props.row.brand }}</div>
              <q-popup-edit v-model="props.row.brand" title="Update Brand">
                <q-input v-model="props.row.brand" dense autofocus ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="batch_no" :props="props">
              {{ props.row.batch_no }}
              <q-popup-edit v-model="props.row.batch_no" title="Update Batch No." buttons>
                <q-input type="text" v-model="props.row.batch_no" dense autofocus hint="Use buttons to close" ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="exp" :props="props">
              {{ props.row.exp }}
              <q-popup-edit v-model="props.row.exp" title="Update Expiry month" buttons>
                <q-input type="text" v-model="props.row.exp" dense autofocus hint="Use buttons to close" ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="price" :props="props">
                {{ props.row.price }}
                <q-popup-edit v-model="props.row.price" title="Update price" buttons>
                    <q-input type="number" v-model="props.row.price" dense autofocus=""></q-input>
                </q-popup-edit>
                </q-td>
            <q-td key="quantity_available" :props="props">
                {{props.row.quantity_available}}
                <q-popup-edit v-model="props.row.quantity_available" title="Update qty" buttons >
                    <q-input type="number" v-model="props.row.quantity_available" dense autofocus=""></q-input>
                </q-popup-edit>
            </q-td>
            <q-td key="location" :props="props">
                {{props.row.location}}
                <q-popup-edit v-model="props.row.location" title="Update location" buttons>
                    <q-input type="text" v-model="props.row.location" dense autofocus=""></q-input>
                </q-popup-edit>
            </q-td>
            <q-td key="actions" :props="props">
              <q-btn   color="blue" rounded label="Update" @click="editItem(props.row)" size=sm no-caps></q-btn>
              <q-btn  color="red" rounded label="Delete"  @click="deleteItem(props.row)" size=sm no-caps></q-btn>
            </q-td>
          </q-tr>
        </template>
    </q-table>
    <q-separator/>
     <div class="row flex flex-center text-center q-pb-xl q-mt-md">
            <div class="col-md-12 col-lg-12 col-sx-12 col-sm-12">
        <q-btn no-caps size="xl" rounded outlined color="teal" icon="cloud_upload" class="" @click="send" />
            </div>
     </div>
  </div>
</div>
    </div>
</template>


<script>
import {SeniorService} from '../services/seniorService';
import {BASE_URL} from '../services/http-common';
import authHeader from '../services/auth-header';
export default {
  name: "UploadManyDrugs",
  methods: {
    addRow() {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } else {
        this.data.push(this.editedItem);
      }
      this.close()
    },
    deleteItem(item) {
      const index = this.data.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.data.splice(index, 1);
    },
    editItem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.show_dialog = true;
    },
    close () {
      this.show_dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    send() {
        if (this.data.length == 0) {
          this.$q.notify(
            {
              message: 'You need to fill the table first',
              color: 'secondary'
            }
          )
          return;
        }
        let u =JSON.parse(localStorage.getItem("user"));
        let myId = u.id;
        let my_cname = u.company_name;
        let my_cphone = u.cphone;
        console.log(my_cphone)
        let sen = new SeniorService(myId, my_cname, my_cphone)
        console.log(sen)
         let up = this.data.map((obj)=> {
              obj.quantity_available = parseInt(obj.quantity_available);
              obj.exp = parseInt(obj.exp);
              obj.price = parseFloat(obj.price);
              return obj;
            })
        sen.uploadManyDdrugs(up).then(
          resp => {
            this.$q.notify({
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Drugs uploaded'
        });
        location.reload()
        console.log(sen)
        }).catch(
          err => {
            console.log(err)
            this.$q.notify({
              color: 'secondary',
              textColor: 'white',
              icon: 'sync_problem',
              message: 'Problem occured'})
        }
      );
    },

    onRejected (rejectedEntries) {
        this.$q.notify({
          type: 'negative',
          message: `${rejectedEntries.length} File size too large`
        })
    },
    factoryFunc (file) {
      return new Promise((resolve, reject) => {
        // Retrieve JWT token from your store.
        let user = JSON.parse(localStorage.getItem('user'));
        // port = process.env.PORT
        resolve({
          url: `${BASE_URL}/upload`,
          method: 'POST',
          headers: [
            { name: 'Content-Type', value: 'application/json-patch+json'},
            { name: 'Authorization', value:  `access_token ` + `${user.accessToken}`},
          ]
        })
      })
    }
  },
  
  data() {
    return {
      show_dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        description: '',
        brand: '',
        batch_no: '',
        quantity_available: 0,
        price: 0.0,
        location: '',
        exp: 0,
        // product_image: ""
      },
      defaultItem: {
        name: '',
        description: '',
        brand: '',
        batch_no: '',
        quantity_available: 10,
        price: 50.0,
        location: '',
        exp: 1,
        // product_image: ""
      },
      columns: [
        {
          name: "name",
          required: true,
          label: "Name",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "description",
          align: "center",
          label: "Description",
          field: "description"
        },
        {
          name: "brand",
          label: "Brand",
          field: "brand",
          sortable: true,
          style: "width: 10px"
        },
        { 
          name: "batch_no", 
          label: "Batch No", 
          field: 'batch_no',
        },
        { name: "quantity_available", label: "Quantity Available", field: "quantity_available" },
        { name: "price", label: "Price ", field: "price" },
        { name: "location", label: "Location ", field: "location" },
        { name: "exp", label: "Months before expiry ", field: "exp" },
        // {name: "product_image", label: "Image", field: "product_image"},
        
        {
          name: "actions",
          label: "Action",
          field: "actions"
        }
      ],
      data: []
    };
  }
}
</script>