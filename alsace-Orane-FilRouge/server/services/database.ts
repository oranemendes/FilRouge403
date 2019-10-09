import dotenv from "dotenv";
import mysql from "mysql";

class Mysql {

    /**
     * Database
     */
    public db;

    constructor() {
        dotenv.config();

        this.db = mysql.createPool(
            {
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                user: process.env.DB_USER,
                password: process.env.DB_PWD,
                database: process.env.DB_NAME
        });

    }
}

export default new Mysql();
