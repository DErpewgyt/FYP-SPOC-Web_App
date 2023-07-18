//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require('express');
const cors = require('cors');
const connection = require('./db'); //Import from db.js

//////////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../frontend'));

//Middleware
app.use(cors());

//////////////////////////////////////////////////////
// DISPLAY SERVER RUNNING
//////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
});

//////////////////////////////////////////////////////
// SETTING MAIN ROUTES
//////////////////////////////////////////////////////

const mainRoutes = require("./routes/mainRoute");
// const router = require('./routes/itemRoute');
app.use("/api", mainRoutes);
// router.use(cors());
// router.use(express.json());
app.get("/message", (req, res, next) => {
    res.send(req.query);
});
