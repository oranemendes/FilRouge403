import express from "express";
import Mid from "../middlewares/house";

class HouseController {

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
            const city = req.body.city;
            const street = req.body.street;
            const ref = req.body.ref;
            let gps = req.body.gps;
            const inputName = req.body.inputName;
            const inputValue = req.body.inputValue;

            if (typeof gps === "string") {gps = JSON.parse(gps); }

            switch (action) {
                /**
                 * add house in bdd
                 */
                case"addHouse":
                    Mid.addHouse(city, street, gps, (error, result) => {
                        if (error) {
                            tryCatch(error);
                        } else {
                            res.json({success: true, message: result});
                        }
                    });
                    break;
                /**
                 * to modify the information in the database and the meters a day
                 */
                case "updateHouse":
                    Mid.updateHouse(inputName, inputValue, ref, ( error, result) => {
                        if (error) {
                            tryCatch(error);
                        } else {
                            res.json({success: true});
                        }
                    });

                    break;
                /**
                 * recover the houses with the information
                 */
                case "getHouse":
                    Mid.getHouse(ref, (error, result) => {
                        if (error) {
                            tryCatch(error);
                        } else {
                            res.json({house: result});
                        }
                    });
                    break;
                /**
                 * retrieve the list of houses with their contents
                 */
                case "getHouseList":
                    Mid.getHouseList((error, result) => {
                        if (error) {
                            tryCatch(error);
                        } else {
                            res.json({list: result});
                        }
                    });
                    break;
                /**
                 * recover media associate at home
                 */
                case "getHouseMedia":
                    Mid.getHouseMedia(ref, (error, result) => {
                        if (error) {
                            tryCatch(error);
                        } else {
                            res.json({list: result});
                        }
                    });
                    break;

                /**
                 * update house coordinate
                 */
                case "updateHouseGps":
                    Mid.updateHouseGps(ref, gps, (error, result) => {
                        if (error) {
                            tryCatch(error);
                        } else {
                            res.json({success: true});
                        }
                    });
                    break;

                /**
                 * Delete house and his media
                 */
                case "deleteHouse":
                    Mid.deleteHouse(ref, (error, result) => {
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

export default new HouseController().getRouter();
