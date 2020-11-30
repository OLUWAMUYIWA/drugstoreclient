"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeniorService = void 0;

var _authHeader = _interopRequireDefault(require("./auth-header"));

var _httpCommon = require("./http-common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SeniorService =
/*#__PURE__*/
function () {
  function SeniorService(id) {
    _classCallCheck(this, SeniorService);

    this.id = id;
  }

  _createClass(SeniorService, [{
    key: "uploadDrug",
    value: function uploadDrug(drug) {
      return _httpCommon.HTTP.post("uploadDrug/".concat(this.id), {
        name: drug.name,
        description: drug.description,
        brand: drug.brand,
        batcn_no: drug.batcn_no,
        quantity_available: parseInt(drug.quantity_available),
        price: parseInt(drug.price),
        location: drug.location,
        uploader_id: drug.uploader_id,
        time_uploaded: drug.time_uploaded,
        expiry_date: drug.expiry_date
      }, {
        headers: (0, _authHeader["default"])()
      }).then(function (response) {
        return response.data;
      });
      ;
    }
  }, {
    key: "uploadManyDdrugs",
    value: function uploadManyDdrugs(drugs) {
      return _httpCommon.HTTP.post("uploadManyDrugs/".concat(this.id), drugs, {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "getMyDrugs",
    value: function getMyDrugs() {
      return _httpCommon.HTTP.get("/sendMyDrugs/".concat(this.id), {
        headers: (0, _authHeader["default"])()
      }).then(function (response) {
        return response.data;
      });
    }
  }, {
    key: "updateMyDrugs",
    value: function updateMyDrugs(drugs) {
      return _httpCommon.HTTP.put("updateMyDrugs/".concat(this.id), drugs, {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "updateDrug",
    value: function updateDrug(drug) {
      return _httpCommon.HTTP.put("/updateDrug/".concat(this.id), {
        name: drug.name,
        description: drug.description,
        brand: drug.brand,
        batcn_no: drug.batcn_no,
        quantity_available: parseInt(drug.quantity_available),
        price: parseInt(drug.price),
        location: drug.location,
        uploader_id: drug.uploader_id,
        time_uploaded: drug.time_uploaded,
        expiry_date: drug.expiry_date
      }, {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "deleteDrug",
    value: function deleteDrug(drugId) {
      return _httpCommon.HTTP["delete"]("deleteDrug/".concat(this.id, "/").concat(drugId), {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "updateSenior",
    value: function updateSenior(user) {
      return _httpCommon.HTTP.put(+"/updateSenior/".concat(this.id), {
        company_name: user.company_name,
        email: user.email,
        address: user.address,
        name: user.name,
        password: user.password,
        verified: true,
        practice_area: user.practice_area,
        role: 'senior',
        superintendentPharmName: user.superintendentPharmName,
        superintendentPharmRegNo: user.superintendentPharmRegNo,
        superintendentPharmLicenceNo: user.superintendentPharmLicenceNo
      }, {
        headers: (0, _authHeader["default"])()
      });
    }
  }]);

  return SeniorService;
}(); //export  {SeniorService};


exports.SeniorService = SeniorService;