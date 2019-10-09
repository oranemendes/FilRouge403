import Colors from "colors";
import Server from "./server/services/server";

const colors = Colors;
const host = process.env.HOST_EXPRESS;
const port = process.env.PORT_EXPRESS;

/**
 * Listening port of the server
 */
Server.app.listen(port, () => {
    console.log(`This app running on `.green, `${host}:${port}`.yellow.bold);
});
