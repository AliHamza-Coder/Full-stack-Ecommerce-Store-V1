"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mod = require("node-xmllint");
var saml_schema_protocol_2_0_xsd_1 = require("./schemas/saml-schema-protocol-2.0.xsd");
var saml_schema_assertion_2_0_xsd_1 = require("./schemas/saml-schema-assertion-2.0.xsd");
var xmldsig_core_schema_xsd_1 = require("./schemas/xmldsig-core-schema.xsd");
var xenc_schema_xsd_1 = require("./schemas/xenc-schema.xsd");
// file fix for virtual filesystem of emscripten
var schemaProto = saml_schema_protocol_2_0_xsd_1.default.replace('saml-schema-assertion-2.0.xsd', 'file_0.xsd').replace('xmldsig-core-schema.xsd', 'file_1.xsd');
var schemaAssert = saml_schema_assertion_2_0_xsd_1.default.replace('xmldsig-core-schema.xsd', 'file_1.xsd').replace('xenc-schema.xsd', 'file_2.xsd');
var schemaXenc = xenc_schema_xsd_1.default.replace('xmldsig-core-schema.xsd', 'file_1.xsd');
exports.validate = function (xml) {
    return new Promise(function (resolve, reject) {
        var validationResult = mod.validateXML({
            xml: xml,
            schema: [schemaAssert, xmldsig_core_schema_xsd_1.default, schemaXenc, schemaProto]
        });
        if (!validationResult.errors) {
            return resolve('SUCCESS_VALIDATE_XML');
        }
        console.error("this is not a valid saml response with errors: " + validationResult.errors);
        return reject('ERR_EXCEPTION_VALIDATE_XML');
    });
};
//# sourceMappingURL=index.js.map