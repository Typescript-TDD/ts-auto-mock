"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_transformer_descriptor_generic_generic2_test_ts_Repository = __importStar(require("ts-auto-mock/repository"));
var test_transformer_descriptor_generic_generic2_test_ts_Extension = __importStar(require("ts-auto-mock/extension"));
var test_transformer_descriptor_generic_generic2_test_ts_Merge = __importStar(require("ts-auto-mock/merge"));
test_transformer_descriptor_generic_generic2_test_ts_Repository.ɵRepository.instance.registerFactory("create__generic__mock_1", function (__tsAutoMockGenericParameter) { return (function () { var _sproperty, _sproperty2, __tsAutoMockObjectReturnValue = {}; __tsAutoMockObjectReturnValue = {
    get property() { return _sproperty || (_sproperty = __tsAutoMockGenericParameter && __tsAutoMockGenericParameter[0] ? __tsAutoMockGenericParameter[0]() : null); },
    set property(_property) { _sproperty = _property; },
    get property2() { return _sproperty2 || (_sproperty2 = __tsAutoMockGenericParameter && __tsAutoMockGenericParameter[1] ? __tsAutoMockGenericParameter[1]() : null); },
    set property2(_property2) { _sproperty2 = _property2; }
}; __tsAutoMockObjectReturnValue; Object.defineProperty(__tsAutoMockObjectReturnValue, test_transformer_descriptor_generic_generic2_test_ts_Extension.ɵMarker.instance.get(), { value: true }); return __tsAutoMockObjectReturnValue; })(); });
test_transformer_descriptor_generic_generic2_test_ts_Repository.ɵRepository.instance.registerFactory("create__use_generic__mock_1",
    function (__tsAutoMockGenericParameter) {
    return (function () {
        var _sgeneric, _sproperty, __tsAutoMockObjectReturnValue = {};
        __tsAutoMockObjectReturnValue = {
            get generic() {
                return _sgeneric ||
                    (_sgeneric = test_transformer_descriptor_generic_generic2_test_ts_Repository.ɵRepository.instance.getFactory("create__generic__mock_1")([
                        function () { return __tsAutoMockGenericParameter && __tsAutoMockGenericParameter[0] ? __tsAutoMockGenericParameter[0]() : null; },
                        function () { return __tsAutoMockGenericParameter && __tsAutoMockGenericParameter[1] ? __tsAutoMockGenericParameter[1]() : null;
                    }]));
                },
            set generic(_generic) { _sgeneric = _generic; },
            get property() { return _sproperty || (_sproperty = __tsAutoMockGenericParameter && __tsAutoMockGenericParameter[1] ? __tsAutoMockGenericParameter[1]() : null); },
            set property(_property) { _sproperty = _property; }
        };
        __tsAutoMockObjectReturnValue;
        Object.defineProperty(__tsAutoMockObjectReturnValue, test_transformer_descriptor_generic_generic2_test_ts_Extension.ɵMarker.instance.get(), { value: true });
        return __tsAutoMockObjectReturnValue;
    })();
});


var ts_auto_mock_1 = require("ts-auto-mock");
describe('for generic', function () {
    describe('interface', function () {

        it('should set the value for child generics', function () {
            var properties = test_transformer_descriptor_generic_generic2_test_ts_Repository.ɵRepository.instance.getFactory("create__use_generic__mock_1")([function () { return 0; }, function () { return ""; }]);
            var properties2 = test_transformer_descriptor_generic_generic2_test_ts_Repository.ɵRepository.instance.getFactory("create__use_generic__mock_1")([function () { return ""; }, function () { return 0; }]);
            expect(properties.generic.property).toEqual(0);
            expect(properties.generic.property2).toEqual('');
            expect(properties.property).toEqual('');
            expect(properties2.generic.property).toEqual('');
            expect(properties2.generic.property2).toEqual(0);
            expect(properties2.property).toEqual(0);
        });
    });
});
//# sourceMappingURL=generic2.test.js.map
