import express from "express";
import Mid from "../middlewares/test";

class TestController {

    private readonly router;

    constructor() {
        this.router = express();
        this.route();
    }

    public getRouter() {
        return this.router;
    }

    private route() {

        this.router.post("/", (req, res) => {
            try {
                const token = req.body.token;
                const action = req.body.action;

                switch (action) {

                    case"test":
                        res.json(Mid.testCase());
                        break;

                }
            } catch (e) {
                res.json(e);
            }

        });
    }
}

export default new TestController().getRouter();
