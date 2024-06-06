import { assert } from "chai";

describe(
    "Canary Test.", () => {
        it("Deve retornar true para o parametro true", () => {
            assert.isTrue(true);            
        });

        it("Deve retornar false para o parametro false", () => {
            assert.isFalse(false);            
        });

        it("Deve retornar 1 para o parametro 1", () => {
            assert.equal(1, 1);            
        });


});