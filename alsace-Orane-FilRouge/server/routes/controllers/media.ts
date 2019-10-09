import express from "express";
import Mid from "../middlewares/media";

class MediaController {

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

            function tryCatch(err: any) {
                try {
                    throw err;
                } catch (e) {
                    res.json(err);
                }
            }

            const action = req.body.action;
            const ref = req.body.ref;
            const fileName = req.body.fileName;
            const category = req.body.category;
            const mediaDate = req.body.mediaDate;

            switch (action) {
                /**
                 * add media in bdd
                 */
                case"addMedia":
                    Mid.addMedia(ref, fileName, category, mediaDate, (error, result) => {
                        if (error) {
                            tryCatch(error);
                        } else {
                            res.json({success: true});
                        }
                    });
                    break;
                /**
                 * remove media in bdd and file
                 */
                case"removeMedia":
                    Mid.removeMedia(fileName, (error, result) => {
                        if (error) {
                            tryCatch(error);
                        } else {
                            res.json({success: true});
                        }
                    });
                    break;

            }
        });
    }
}

export default new MediaController().getRouter();
