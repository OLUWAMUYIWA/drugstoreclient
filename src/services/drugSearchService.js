//import axios from 'axios';
import authHeader from './auth-header';
import {HTTP} from './http-common'

//const API_URL = 'http://localhost:3000/';

export class DrugSearchService {
    constructor(query) {
        this.query = query;
    }
    searchDrug() {
        return HTTP.get(`api/search/${this.query}`, {headers: authHeader()})
    }

}

//export  DrugSearchService(name);