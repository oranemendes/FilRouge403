import jwt from "jsonwebtoken";
import ErrorManager from "../../services/error-manager";
const errMan = ErrorManager;

class Token {

    /**
     * List of token authorized to request the secure zone of server
     */
    private List: any[] = [];

    /**
     * Defines the life time of a token in milliseconde
     */
    private timeOut: number = 10800000;

    /**
     * Check if Auth token is in the List
     * @param token: string - encoded token authentification
     * @param action: string - Name of request
     * @param callback: return a error if token was not found in the List
     */
    public checkAuth(token: string, action: string, callback) {
        let error;
        const check = this.List.indexOf(token) >= 0;
        if (!check) {
            error = {error: true, errCode: "ERR_TOKEN", errMsg: `The "${action}" request need a identification token !`};
            errMan.printError(`-- ${error.errCode}: `, error.errMsg);
        }
        return callback(error);
    }

    /**
     * Generate and encode a token and return it.
     * @param idUser: number
     */
    public generateToken(idUser: number) {
        if (idUser > 0) {
            const token = jwt.sign({idUser}, this.makeId(), {expiresIn: this.timeOut});
            this.addToken(token);
            return token;
        } else {
            const error = {error: true, errCode: "ERR_TOKEN", errMsg: `IdUser must be positiv number !`};
            errMan.printError(`-- ${error.errCode}: `, error.errMsg);
            return error;
        }
    }

    /**
     * Delete the token in the list
     * @param token
     */
    public delToken(token) {
        this.List.splice(this.List.indexOf(token), 1);
    }

    /**
     * Add the token in the List and delete it after the time outs.
     * @param token
     */
    private addToken(token: string) {
        this.List.push(token);
        setTimeout(() => {
            this.List.splice(this.List.indexOf(token), 1);
        }, this.timeOut);
    }

    /**
     * Generate random key
     * @returns {string}
     */
    private makeId() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}

export default new Token();
