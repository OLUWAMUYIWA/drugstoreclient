//import axios from 'axios';
import {HTTP} from './http-common'

//let HTTP = require('./http-common.js').default
export class AuthService {
  login(user) {
    return HTTP.post('api/no_auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {  
          localStorage.setItem('user', response.data);
          console.log(user)
        }

        return response.data;
      }
      );
  }

  logout() {
    localStorage.removeItem('user');
  }

  registerJun(user) {
    return HTTP.post(`api/no_auth/regJunior`, {
      name: user.name,
      email: user.email,
      password: user.password,
      address : user.address,
      verified: false,
      practice_area: user.practice_area,
      role: "junior",
      company_name: user.company_name,
    });
  }

  registerSen(user) {
    return HTTP.post(`api/no_auth/regSenior`, {
      name: user.name,
      email: user.email,
      password: user.password,
      address : user.address,
      verified: false,
      practice_area: user.practice_area,
      role: "senior",
      company_name: user.company_name,
      superintendentPharmName: user.superintendentPharmName,
      superintendentPharmRegNo: user.superintendentPharmRegNo,
      superintendentPharmLicenceNo: user.superintendentPharmLicenceNo

    });
  }
}

//export default new AuthService();
