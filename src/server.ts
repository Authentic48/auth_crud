import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';


import { connectDB } from './config/db';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { getUsersRouter } from './routes/index';
import { getUserProfileRouter } from './routes/show';
import { updateProfileRouter}  from './routes/update';
 

const app = express();
app.use(express.json());
app.use(fileUpload());


// Database connection settings
connectDB();

// Routers 
app.use(signupRouter)
app.use(signinRouter)
app.use(getUsersRouter)
app.use(getUserProfileRouter)
app.use(updateProfileRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
