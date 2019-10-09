import { expect } from "chai";
import jwt from "jsonwebtoken";
import "mocha";
import Token from "./token.class";

describe("Test --> Token Class", () => {

    it("should return an encoded token", () => {
        const token = Token.generateToken(1);
        expect(token).be.a("string");
    });

    it("check decoded token", () => {
        const token = Token.generateToken(1);
        const decodedToken = jwt.decode(token);

        expect(decodedToken).be.a("object");
        expect(decodedToken).have.property("idUser");
        expect(decodedToken).have.property("iat");
        expect(decodedToken).have.property("exp");

        expect(decodedToken.idUser).be.a("number");
        expect(decodedToken.iat).be.a("number");
        expect(decodedToken.exp).be.a("number");

        expect(decodedToken.idUser).to.equal(1);
    });

    it("if 5 token are different", () => {
        const token1 = Token.generateToken(1);
        const token2 = Token.generateToken(2);
        const token3 = Token.generateToken(3);
        const token4 = Token.generateToken(4);
        const token5 = Token.generateToken(5);

        expect(token2).to.not.equal(token1);
        expect(token3).to.not.equal(token2);
        expect(token4).to.not.equal(token3);
        expect(token5).to.not.equal(token4);

    });

    it("if idUser <= 0", () => {
        const token0 = Token.generateToken(0);
        expect(token0).be.a("object");
        expect(token0).have.property("error");
        expect(token0).have.property("errCode");
        expect(token0).have.property("errMsg");

        expect(token0.error).be.a("boolean");
        expect(token0.errCode).be.a("string");
        expect(token0.errMsg).be.a("string");

        expect(token0.error).to.equal(true);
        expect(token0.errCode).to.equal("ERR_TOKEN");
        expect(token0.errMsg).to.equal(`IdUser must be positiv number !`);

        const tokenNegatif = Token.generateToken(-1);
        expect(tokenNegatif).be.a("object");
        expect(tokenNegatif).have.property("error");
        expect(tokenNegatif).have.property("errCode");
        expect(tokenNegatif).have.property("errMsg");

        expect(tokenNegatif.error).be.a("boolean");
        expect(tokenNegatif.errCode).be.a("string");
        expect(tokenNegatif.errMsg).be.a("string");

        expect(tokenNegatif.error).to.equal(true);
        expect(tokenNegatif.errCode).to.equal("ERR_TOKEN");
        expect(tokenNegatif.errMsg).to.equal(`IdUser must be positiv number !`);
    });

    it("if token exist return undefined", () => {
        const token = Token.generateToken(2);
        const action = "test_generate";
        const checkToken = Token.checkAuth(token, action, (error) => {
            expect(error).to.equal(undefined);
        });
    });

    it("if token doesn't exist return a message error", () => {
        const token = "fakeToken2531428";
        const action = "test_error";
        const checkToken = Token.checkAuth(token, action, (error) => {
            expect(error).be.a("object");

            expect(error).have.property("error");
            expect(error).have.property("errCode");
            expect(error).have.property("errMsg");

            expect(error.error).be.a("boolean");
            expect(error.errCode).be.a("string");
            expect(error.errMsg).be.a("string");

            expect(error.error).to.equal(true);
            expect(error.errCode).to.equal("ERR_TOKEN");
            expect(error.errMsg).to.equal(`The "${action}" request need a identification token !`);
        });
    });
});
