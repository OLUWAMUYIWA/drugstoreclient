import authHeader from './auth-header';
import {HTTP} from './http-common'

export class DrugSearchService {
    constructor(query) {
        this.query = query;
    }
    searchDrug() {
        return HTTP.get(`api/search/${this.query}`, {headers: authHeader()})
    }

}

//export  DrugSearchService(name);