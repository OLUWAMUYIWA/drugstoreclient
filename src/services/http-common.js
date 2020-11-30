import axios from 'axios';
// import axiosRetry, { isRetryableError } from 'axios-retry';

//const axios = _axios.create()

const BASE_URL = `http://adel-pcruq.ondigitalocean.app:8080/`
// const BASE_URL = `http://localhost:3000/`;

const HTTP = axios.create({
    baseURL: BASE_URL
})

// axiosRetry(HTTP, {
//     retries: 3,
//     retryDelay: (retryCount) => {
//       console.log(`retry attempt: ${retryCount}`);
//       return retryCount * 2000; 
//      },
//     retryCondition: (error) => {
//       return error.response.status === 503;
//     },
// });

export  {
    HTTP ,
    BASE_URL
};

