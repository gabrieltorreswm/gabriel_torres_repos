"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
describe('I start with the first test to my setUp', () => {
    it("Should return my phone number", () => {
        const phone = '0803513365';
        chai_1.assert.equal(phone, '0803513365');
    });
});
