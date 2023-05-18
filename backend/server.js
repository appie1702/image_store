
const express = require('express');
const connectDB = require("./config/db");
const session = require("express-session")
const dotenv = require('dotenv');
const path = require('path');
const userRoutes = require("./routes/userRoutes");
const imageRoutes = require("./routes/imageRoutes")
const cors = require("cors")
const MongoDBStore = require("connect-mongodb-session")(session)
const { notfound, errorHandler } = require("./middleware/errorMiddleware") 
dotenv.config({ path: path.resolve(__dirname, '../.env') });
connectDB();



const app = express();
const PORT = process.env.PORT || 5000


const MAX_AGE = 1000*60*60*3 //3hrs



const Store = new MongoDBStore({
    uri:process.env.MONGO_URI,
    collection: "sessions"
})



app.use(
    session({
        secret: process.env.SESSION_SECRET,
        name: 'session-id',
        store: Store,
        cookie: {
            maxAge: MAX_AGE,
            sameSite: false,
            secure: false,
        },
        resave: true,
        saveUninitialized: false
    })
)




app.use(express.json())


app.use("/api/user", userRoutes);
app.use("/api/images", imageRoutes);


//always below declared paths


app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);


app.use(notfound);
app.use(errorHandler);