import House from "./controllers/house";
import Media from "./controllers/media";
import Test from "./controllers/test";
import Upload from "./controllers/upload";

class Routes {

    constructor(private app: any) {
        this.routing();
    }

    /**
     * Routing to target requested
     */
    public routing() {
        this.app.use("/test", Test);
        this.app.use("/house", House);
        this.app.use("/upload", Upload);
        this.app.use("/media", Media);
    }

}

export default Routes;
