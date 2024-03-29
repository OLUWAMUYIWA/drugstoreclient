"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrugSearchService = void 0;

var _authHeader = _interopRequireDefault(require("./auth-header"));

var _httpCommon = require("./http-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DrugSearchService =
/*#__PURE__*/
function () {
  function DrugSearchService(query) {
    _classCallCheck(this, DrugSearchService);

    this.query = query;
  }

  _createClass(DrugSearchService, [{
    key: "searchDrug",
    value: function searchDrug() {
      return _httpCommon.HTTP.get("search/".concat(this.query), {
        headers: (0, _authHeader["default"])()
      });
    }
  }]);

  return DrugSearchService;
}(); //export  DrugSearchService(name);


exports.DrugSearchService = DrugSearchService;