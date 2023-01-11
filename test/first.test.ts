import { assert } from "chai";

describe('I start with the first test to my setUp', () =>{
    it("Should return my phone number", () =>{
        const phone = '0803513365'

        assert.equal(phone,'0803513365')
    })
})