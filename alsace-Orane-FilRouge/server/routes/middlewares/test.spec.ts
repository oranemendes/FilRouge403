import { expect } from "chai";
import "mocha";
import TestMidware from "./test";

describe("TestMidware Class", () => {

    it("should return test response", () => {
        const result = TestMidware.testCase();
        expect(result).be.a("object");
        expect(result).have.property("success");
        expect(result).have.property("message");
        expect(result.success).be.a("boolean");
        expect(result.message).be.a("string");
        expect(result.success).to.equal(true);
        expect(result.message).to.equal("Ce message vient de l'API !");
    });

});
