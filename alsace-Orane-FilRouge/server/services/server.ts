import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import Routes from "../routes/routes";

class Server {

    public app: express.Application;
    public config;
    private urlOrigin;

    constructor() {
        dotenv.config();
        this.urlOrigin = "http://" + process.env.HOST_ANGULAR + process.env.PORT_ANGULAR;
        this.app = express();
        this.middleware();
        this.routes();
    }

    /**
     * Set middleware app
     */
    private middleware() {
        this.app.use(cors({
            origin : "*",
            // origin : this.urlOrigin,
            credentials: true
        }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use("/media", express.static("server/Media"));
        this.app.use("/apk", express.static("server/apk"));

    }

    /**
     * Set routes app
     */
    private routes() {
        const obj = new Routes(this.app);
    }

}

export default new Server();
