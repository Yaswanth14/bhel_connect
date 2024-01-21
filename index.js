const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use("/user", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
