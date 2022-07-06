import { Sequelize } from 'sequelize';

export const connectDB = async () => {
  try {
    const sequelize = new Sequelize(
      process.env.DB_NAME!, // I added exclamation mark (!) to stop Typescript from worrying about possible empty string
      process.env.DB_USERNAME!,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: 'mysql',
      }
    );
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
