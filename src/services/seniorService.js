//import axios from 'axios';
import authHeader from './auth-header';
import {HTTP} from './http-common'
//const API_URL = 'http://localhost:3000/api/';

export class SeniorService {
  constructor(id, company_name, company_phone) {
    this.id  = id;
    this.company_name = company_name;
    this.company_phone = company_phone;
  }
  
  uploadDrug(drug) {
    return HTTP.post(`api/uploadDrug/${this.id}/ ${this.company_name}/${this.company_phone}` ,
    {
      name: drug.name,
      description: drug.description,
      brand: drug.brand,
      batcn_no: drug.batcn_no,
      quantity_available: parseInt(drug.quantity_available),
      price: parseInt(drug.price),
      location: drug.location,
      exp: drug.exp

    },
     {headers: authHeader()}).then(response => {
        return response.data;
      });;
  }
  uploadManyDdrugs(drugs) {
    return HTTP.post(`api/uploadManyDrugs/${this.id}/${this.company_name}/${this.company_phone}`, drugs, {headers: authHeader()})
  }

  getMyDrugs() {
    return HTTP.get(`api/sendMyDrugs/${this.id}/${this.company_name}`, {headers: authHeader()})
  }

  updateMyDrugs(drugs) {
    return HTTP.put(`api/updateMyDrugs/${this.id}/${this.company_name}`, drugs,  {headers: authHeader()})
  }

  updateDrug(drug) {
    return HTTP.put( `api/updateDrug/${this.id}/${this.company_name}` ,
    {
      name: drug.name,
      description: drug.description,
      brand: drug.brand,
      batcn_no: drug.batcn_no,
      quantity_available: parseInt(drug.quantity_available),
      price: parseInt(drug.price),
      location: drug.location,
      exp: drug.exp

    },
    {headers: authHeader()})
  }

  deleteDrug(drugId) {
      return HTTP.delete(`api/deleteDrug/${this.id}/${drugId}/${this.company_name}`, {headers: authHeader()})
  }

  updateSenior(user) {
      return HTTP.put(+ `api/updateSenior/${this.id}/${this.company_name}` ,
      {
        company_name: user.company_name,
        email: user.email,
        address: user.address,
        name: user.name,
        password: user.password,
        verified: true,
        practice_area: user.practice_area,
        role: 'senior',
        superintendentPharmName: user.superintendentPharmName,
        superintendentPharmRegNo: user.superintendentPharmRegNo,
        superintendentPharmLicenceNo: user.superintendentPharmLicenceNo
    },
      {headers: authHeader()});
  }

}

//export  {SeniorService};
