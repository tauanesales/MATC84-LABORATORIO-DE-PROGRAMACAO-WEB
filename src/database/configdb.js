const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASS;
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.5xtfehw.mongodb.net`);
        console.log("Banco conectado com sucesso!");
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

module.exports =  { connect };
