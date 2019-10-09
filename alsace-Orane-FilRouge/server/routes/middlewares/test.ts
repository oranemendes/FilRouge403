import Mysql from "../../services/database";
import Token from "../../services/secure/token.class";

class TestMidware {

    public testCase() {
        console.log("test API");
        return {
            success: true,
            message: "Ce message vient de l'API !"
        };
    }

}

export default new TestMidware();
