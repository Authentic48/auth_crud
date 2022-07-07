import { Sequelize } from 'sequelize-typescript';
import User  from '../models/user';

const sequelize = new Sequelize({
  database: process.env.DB_NAME!, // I added exclamation mark (!) to stop Typescript from worrying about possible empty string
  username: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  models: [User]

});

export const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
