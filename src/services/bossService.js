//import axios from 'axios';
import authHeader from './auth-header';
import {HTTP} from './http-common'

//const API_URL = 'http://localhost:3000/api/';

export class BossService {
    static getUnverifiedJuniors() {
        return HTTP.get(`api/sendUnverifiedJuniors`, {headers: authHeader()});
    }
    static getUnverifiedSeniors() {
        return HTTP.get( `api/sendUnverifiedSeniors`, {headers: authHeader()});
    }
    static verifyManyJuniors(stringsArray) {
        HTTP.put(`api/verifyManyJuniors`, stringsArray,   {headers: authHeader()});
    }
    static verifyManySeniors(stringsArray) {
        HTTP.put(`api/verifyManySeniors`, stringsArray,   {headers: authHeader()});
    }
}
