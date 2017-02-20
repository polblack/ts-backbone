var assert=require('assert');
var types = require('../modbus/types/ModbusType');
var langs = require('../modbus/Lang/i18nHelper');

describe('types/NumericType', function() {
     var NumericTypeObj = new types.ModbusTypes.NumericType({
           offset:1,
            length:1,
            max:300,
            min:1,
            catetory:'cat',
            description:'descr',
            type:'uint16',
            multiplier:100,
            stringkits:0,
            tofile:false
     },new langs.i8nHelper('en')) ;
     console.log("asertando");
     describe('onRange',function(){
        it('NumericType add inner range',function(){
            assert.equal(NumericTypeObj.Set(90),true);
        });

     });
     describe('outRange',function(){
        it('NumericType add Out of range',function(){
        assert.equal(false,NumericTypeObj.Set(310));
        });
        it('NumericType add Out of range low',function(){
         assert.equal(NumericTypeObj.Set(-1),false);
        });

     });
     describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
        assert.equal(-1, [1,2,3].indexOf(4));
        });
    });
     
});

