"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authHeader;

function authHeader() {
  var user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return {
      'Authorization': "access_token " + "".concat(user.accessToken),
      'Accept': "application/json",
      'Content-Type': "application/json"
    };
  } else {
    return {};
  }
}