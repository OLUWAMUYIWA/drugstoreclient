//import axios from 'axios';
import authHeader from './auth-header';
import {HTTP} from './http-common'
//const API_URL = 'http://localhost:3000/api/junUpdate/';

export class JuniorService {
  constructor(id) {
    this.id  = id;
  }
  updateJunior(user) {
    return HTTP.put( `api/junUpdate/${this.id}`,
    {
        company_name: user.company_name,
        email: user.email,
        address: user.address,
        name: user.name,
        password: user.password,
        verified: true,
        practice_area: user.practice_area,
        role: 'junior',
    },
    {headers: authHeader()});
  }
}

//export default new JuniorService(id);
