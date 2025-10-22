const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const  coursesRouter = require('./routes/coursesRouter');
const adminRouter = require('./routes/adminRouter');
app.use (express.json());


app.use("/user", userRouter);
app.use("/courses", coursesRouter);  
app.use("/admin", adminRouter);

const PORT =3005;



async function main() {
    
   await mongoose.connect("")
    app.listen(PORT, () => {
    console.log(`Done`);
    });
}

main()
