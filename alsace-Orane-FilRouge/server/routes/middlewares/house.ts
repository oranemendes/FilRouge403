import fs from "fs";
import rimraf from "rimraf";
import Mysql from "../../services/database";
import ErrorManager from "../../services/error-manager";

const errMan = ErrorManager;

interface ILatlng {
    lat: number | null;
    lng: number | null;
}

class HouseMidware {

    /**
     * Get a list of all media of house selected
     * @param ref: string
     * @param cb: return error, result
     */
    public getHouseMedia(ref, cb) {
        Mysql.db.query("SELECT * FROM medias m LEFT JOIN (SELECT ref, id_house FROM houses) h ON m.houseId = h.id_house WHERE h.ref = ?", [ref], (err, res) => {
            if (err) {
                errMan.errorDb(this.getHouseMedia.name, err);
                return cb(errMan);
            } else {
                return cb(null, res);
            }
        });
    }

    /**
     * Get the complete list of house in database
     * @param cb: return err, result
     */
    public getHouseList(cb) {
        Mysql.db.query("SELECT h.ref, h.city, m.fileName FROM houses h LEFT JOIN (SELECT MIN(id_media), fileName, houseId FROM medias GROUP BY houseId) AS m ON m.houseId = h.id_house", (err, res) => {
            if (err) {
                errMan.errorDb(this.getHouseList.name, err);
                return cb(errMan);
            } else {
                return cb(null, res);
            }
        });
    }

    /**
     * Gett all data from House in database
     * @param ref: string
     * @param cb: return error, result
     */
    public getHouse(ref, cb) {
        Mysql.db.query("SELECT * FROM houses WHERE ref = ?", [ref], (err, result) => {
            if (err) {
                errMan.errorDb(this.getHouse.name, err);
                return cb(errMan);
            } else {
                return cb(null, result[0]);
            }
        });
    }

    /**
     * Add function for adding a house on database
     * @param city: string - Name of city
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     * @param cb
     */
    public addHouse(city: string, street: string | null, gps: ILatlng, cb) {
        this.attributeReference(city, (reference) => {
            this.insertHouseToDb(city, street, gps, reference , (err, result) => {
                if (err) {
                    return cb(err);
                } else {
                    return cb(null, reference);
                }
            });
        });
    }

    /**
     * Update a input value in database of house selected
     * @param inputName: string
     * @param inputValue: string
     * @param cb: return error, value
     */
    public updateHouse(inputName: string, inputValue: string, ref: string, cb) {

        const content = [[inputName], [inputValue], [ref]];
        Mysql.db.query("UPDATE houses SET ?? = ? WHERE ref = ?", content, (error, result) => {
            if (error) {
                errMan.errorDb(this.updateHouse.name, error);
                return cb(errMan);
            } else {
                return cb(null, result);
            }
        });

    }

    /**
     * Update coordoninate in database of house selected
     * @param ref: string
     * @param gps: Ilatlng - {lat, lng}
     * @param cb: return error, value
     */
    public updateHouseGps(ref: string, gps: ILatlng, cb) {

        const content = [[gps.lat], [gps.lng], [ref]];
        Mysql.db.query("UPDATE houses SET lat = ?, lng = ? WHERE ref = ?", content, (error, result) => {
            if (error) {
                errMan.errorDb(this.updateHouseGps.name, error);
                return cb(errMan);
            } else {
                return cb(null, result);
            }
        });

    }

    /**
     * Delete house and his media
     * @param ref: string
     * @param cb: return error, result
     */
    public deleteHouse(ref: string, cb) {
        const path = "./server/Media/" + ref + "/";
        if (fs.existsSync(path)) {
            rimraf(path, (er) => {
                if (er) {
                    errMan.errorDb(this.deleteHouse.name, er);

                }
            });
        }
        Mysql.db.query("SELECT id_house FROM houses WHERE ref = ?", [ref], (error, result) => {
            if (error) {
                errMan.errorDb(this.deleteHouse.name + "_readHouse", error);
                return cb(errMan);
            } else {
                Mysql.db.query("DELETE FROM medias WHERE houseId = ?", [result[0].id_house], (erro, resu) => {
                    if (erro) {
                        errMan.errorDb(this.deleteHouse.name + "_delMedia", error);
                        return cb(errMan);
                    } else {
                        Mysql.db.query("DELETE FROM houses WHERE ref = ?", [ref], (err, res) => {
                            if (err) {
                                errMan.errorDb(this.deleteHouse.name + "_delHouse", error);
                                return cb(errMan);
                            } else {
                                return cb(null, res);
                            }
                        });
                    }
                });
            }
        });

    }

    /**
     * Check all data are correct
     * @param city: string - Name of city
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     */
    private checkData(city: string, street: string | null, gps: ILatlng) {
        if (gps.lat === 0) {gps.lat = null; }
        if (gps.lng === 0) {gps.lng = null; }
        if (street === "" || street === undefined) {street = null; } else if (street !== null) {street = street.toLowerCase().trim(); }
        city = city.toLowerCase().trim();
        return ({city, street, gps});
    }

    /**
     * Insert to database a new house entry
     * @param city: string - Name of city
     * @param street: string - Name of street
     * @param gps: ILatlng - lat lng coordinate
     * @param reference: string - unique reference of house
     * @param cb
     */
    private insertHouseToDb(city: string, street: string | null, gps: ILatlng, reference: any, cb) {

        const checked = this.checkData(city, street, gps);
        city = checked.city;
        street = checked.street;
        gps = checked.gps;

        const content = [[city], [street], [gps.lat], [gps.lng], [reference]];

        Mysql.db.query("INSERT INTO houses(city, street, lat, lng, ref) VALUES(?, ?, ?, ?, ?)", content, (err, res) => {
            if (err) {
                errMan.errorDb(this.addHouse.name, err);
                return cb(errMan);
            } else {
                return cb(null, res);
            }
        });
    }

    /**
     * Generate a unique reference
     * @param city: string - Name of city
     * @param cb
     */
    private attributeReference(city: string, cb) {
        let reference: string;

        Mysql.db.query("SELECT city FROM houses WHERE city = ?", [city], (err, result) => {
            if (err) {
                errMan.errorDb(this.addHouse.name, err);
                return cb(errMan);
            } else {
                reference = city.toUpperCase() + "_" + (result.length + 1);
                return cb(reference);
            }
        });
    }
// TODO : vérifier que la référence n'éxiste pas déjà
}

export default new HouseMidware();
