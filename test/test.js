// var assert = require('assert');
const assert = chai.assert;
describe('Array', function () {
    describe('#indexOf()', function () {
        it('Is testing .equal()', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
            assert.notEqual(4, 1);

        });
        it('Is testing .isNull() and .isNotNull()',function(){
            assert.isNull(null);
            assert.isNotNull("hi");
        });
        it('assert that .isUndefined and isDefined',()=>{
            // assert.fail(null);
            assert.isUndefined(undefined);
            assert.isDefined(1);
        });
        it('assert .isOk() and .isNotOk()',()=>{
            assert.isOk('hi');
            assert.isNotOk(null);
        });
        it('assert .isTrue() and .isNotTrue()', () => {
            assert.isTrue(1==1, 'This is true because');
            assert.isNotTrue(0!=0);
        });
    });
});
