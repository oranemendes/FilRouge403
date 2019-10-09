import colors from "colors/safe";

class ErrorManager {
    private error: boolean;
    private errCode: string;
    private errMsg: any | string;

    constructor() {
        this.error = true;
        this.errCode = "ERR_UNDEFINED";
        this.errMsg = "Undefined error message";
    }

    /**
     * Print a message error in console and return a object error
     * @param errCode: string
     * @param errMsg: any or string
     */
    public printError(errCode: string, errMsg: any | string) {
        this.setError(errCode, errMsg);
        console.log(colors.red(this.errCode), this.errMsg);
    }

    /**
     * Print e message error in console and return a object error. Specified for mysql error
     * @param functionName: string
     * @param err: any or string
     */
    public errorDb(functionName: string, err: any | string) {
        this.printError("ERR_DB: ", `"${functionName}": ${err}`);
    }

    /**
     * Set parameter of this error object
     * @param errCode: string
     * @param errMsg: any or string
     */
    private setError(errCode: string, errMsg: any | string) {
        this.errCode = errCode;
        this.errMsg = errMsg;
    }
}

export default new ErrorManager();
