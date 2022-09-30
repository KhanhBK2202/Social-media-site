const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3001;
const app = express();

const route = require('./routes');
const db = require('./config/db')

// Connect DB
db.connect()

app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
    }),
); 
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.json())
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
app.use(cors())
// app.use(cors(corsOptions));

route(app);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
