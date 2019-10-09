import fs from "fs";
import Mysql from "../../services/database";
import ErrorManager from "../../services/error-manager";

const errMan = ErrorManager;

class MediaMidware {

    /**
     * Add media in database
     * @param ref: string
     * @param fileName: string
     * @param category: string
     * @param mediaDate: string
     * @param cb: return error, result
     */
    public addMedia(ref: string, fileName: string, category: string, mediaDate: string, cb) {
        Mysql.db.query("SELECT id_house FROM houses WHERE ref = ?", [ref], (error, result) => {
            if (error) {
                errMan.errorDb(this.addMedia.name, error);
                return cb(errMan);
            } else {
                const houseId = result[0].id_house;
                const content = [[fileName], [category], [mediaDate], [houseId]];
                Mysql.db.query("INSERT INTO medias (fileName, category, mediaDate, houseId) VALUES (?, ?, ?, ?)", content, (err, res) => {
                    if (err) {
                        errMan.errorDb(this.addMedia.name, error);
                        return cb(errMan);
                    } else {
                        return cb(null, res);
                    }
                });
            }
        });
    }

    /**
     * Remove file media and into database
     * @param fileName: string
     * @param cb: return error, result
     */
    public removeMedia(fileName: string, cb) {
        const ref = fileName.split("-")[0];
        const path = "./server/Media/" + ref + "/" + fileName;
        fs.unlink(path, (err) => {
            if (err) {
                errMan.errorDb(this.removeMedia.name, err);
                return cb(errMan);
            } else {
                Mysql.db.query("DELETE FROM medias WHERE fileName = ?", [fileName], (error, res) => {
                    if (error) {
                        errMan.errorDb(this.removeMedia.name, err);
                        return cb(errMan);
                    } else {
                        return cb(null, res);
                    }
                });
            }
        });
    }
}

export default new MediaMidware();
