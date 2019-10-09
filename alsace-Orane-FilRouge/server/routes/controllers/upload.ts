import express from "express";
import fileUpload from "express-fileupload";
import * as fs from "fs";
import Mid from "../middlewares/upload";

class UploadController {

    private readonly router;

    constructor() {
        this.router = express();
        this.route();
    }

    public getRouter() {
        return this.router;
    }

    private route() {

        this.router.use(fileUpload());

        this.router.post("/", (req, res) => {

            function tryCatch(err: any) {
                try {
                    throw err;
                } catch (e) {
                    res.json(err);
                }
            }

            const imgFile = req.files.justificatif;
            // define the file name
            const fileName = req.files.justificatif.name;
            // check the extension file
            const regex = /^jpg$|^jpeg$|^png$|JPG$|^JPEG$|^PNG$/;
            const fileExt = fileName.split(".").pop();

            const ref = fileName.split("-")[0];

            if (regex.test(fileExt)) {

                // define the folder
                const filePath = "./server/Media/" + ref + "/";

                // check if the folder exists
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath);
                }

                // moove the file//
                if (imgFile) {
                    imgFile.mv(filePath + fileName, (err) => {
                        if (err) { tryCatch(err); }
                        res.json({success: true});
                    });
                }
            } else {
                tryCatch("extention error");
                res.send("error");
            }
        });
    }
}

export default new UploadController().getRouter();
