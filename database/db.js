const mongoose = require("mongoose");

const connectToDb = () => {
    mongoose.connect(
        "mongodb+srv://root:teste@todolist.qaoju9c.mongodb.net/",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Mongo DB Atlas conectado!"))
    .catch((err) => console.log(err));
};

module.exports = connectToDb;