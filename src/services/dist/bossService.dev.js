"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BossService = void 0;

var _authHeader = _interopRequireDefault(require("./auth-header"));

var _httpCommon = require("./http-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BossService =
/*#__PURE__*/
function () {
  function BossService() {
    _classCallCheck(this, BossService);
  }

  _createClass(BossService, null, [{
    key: "getUnverifiedJuniors",
    value: function getUnverifiedJuniors() {
      return _httpCommon.HTTP.get("sendUnverifiedJuniors", {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "getUnverifiedSeniors",
    value: function getUnverifiedSeniors() {
      return _httpCommon.HTTP.get("sendUnverifiedSeniors", {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "verifyManyJuniors",
    value: function verifyManyJuniors(stringsArray) {
      _httpCommon.HTTP.put("verifyManyJuniors", stringsArray, {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "verifyManySeniors",
    value: function verifyManySeniors(stringsArray) {
      _httpCommon.HTTP.put("verifyManySeniors", stringsArray, {
        headers: (0, _authHeader["default"])()
      });
    }
  }]);

  return BossService;
}();

exports.BossService = BossService;