const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require("./routes/user");
const dotenv = require('dotenv');
const cors = require('cors');

//configure env
dotenv.config();

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use(cors());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
