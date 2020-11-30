"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authHeader = _interopRequireDefault(require("./auth-header"));

var _httpCommon = require("./http-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JuniorService =
/*#__PURE__*/
function () {
  function JuniorService(id) {
    _classCallCheck(this, JuniorService);

    this.id = id;
  }

  _createClass(JuniorService, [{
    key: "updateJunior",
    value: function updateJunior(user) {
      return _httpCommon.HTTP.put("junUpdate/".concat(this.id), {
        company_name: user.company_name,
        email: user.email,
        address: user.address,
        name: user.name,
        password: user.password,
        verified: true,
        practice_area: user.practice_area,
        role: 'junior'
      }, {
        headers: (0, _authHeader["default"])()
      });
    }
  }]);

  return JuniorService;
}();

var _default = new JuniorService(id);

exports["default"] = _default;