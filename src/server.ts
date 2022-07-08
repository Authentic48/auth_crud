import express from 'express';
import 'dotenv/config';
import fileUpload from 'express-fileupload';
import 'express-async-errors';


import { connectDB } from './config/db';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { getUsersRouter } from './routes/index';
import { getUserProfileRouter } from './routes/show';
import { updateProfileRouter}  from './routes/update';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler'; 

const app = express();
// to parse incoming all requests  
app.use(express.json());
// to accept incoming files  
app.use(fileUpload());



// Database connection settings
connectDB();

// Routers 
app.use(signupRouter)
app.use(signinRouter)
app.use(getUsersRouter)
app.use(getUserProfileRouter)
app.use(updateProfileRouter)


// fallback route 404 
app.all('*', async () => {
  throw new NotFoundError();
});

// this middleware takes all errors, serialize it and send it back as response
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
