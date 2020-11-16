const express = require('express');
const userRouter = require('./routes/user')

const app = express();

app.use(express.json())

app.use(userRouter)


app.listen(3000, function () {
    console.log('server is running on 3000')
})
