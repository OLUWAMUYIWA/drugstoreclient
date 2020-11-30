"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import axios from 'axios';
//const NO_AUTH_API_URL = 'http://localhost:3000/api/no_auth/';
// import {HTTP} from './http-common'
var HTTP = require('./http-common.js')["default"];

var AuthService =
/*#__PURE__*/
function () {
  function AuthService() {
    _classCallCheck(this, AuthService);
  }

  _createClass(AuthService, [{
    key: "login",
    value: function login(user) {
      return HTTP.post('no_auth/login', {
        email: user.email,
        password: user.password
      }).then(function (response) {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      localStorage.removeItem('user');
    }
  }, {
    key: "registerJun",
    value: function registerJun(user) {
      return HTTP.post("no_auth/regJunior", {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        verified: false,
        practice_area: user.practice_area,
        role: "junior",
        company_name: user.company_name
      });
    }
  }, {
    key: "registerSen",
    value: function registerSen(user) {
      return HTTP.post("no_auth/regSenior", {
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        verified: false,
        practice_area: user.practice_area,
        role: "senior",
        company_name: user.company_name,
        superintendentPharmName: user.superintendentPharmName,
        superintendentPharmRegNo: user.superintendentPharmRegNo,
        superintendentPharmLicenceNo: user.superintendentPharmLicenceNo
      });
    }
  }]);

  return AuthService;
}();

var _default = new AuthService();

exports["default"] = _default;