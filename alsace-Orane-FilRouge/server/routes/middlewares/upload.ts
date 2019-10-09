import Mysql from "../../services/database";
import Token from "../../services/secure/token.class";

class UploadMidware {

    public fileUpload(cb) {
        console.log("test fileUpload");
        return cb(null, {
            success: true,
            message: "Ce message vient de l'API !"
        });
    }

}

export default new UploadMidware();
