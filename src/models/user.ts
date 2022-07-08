import { Model, Table,  Column, DataType, DefaultScope, Scopes } from 'sequelize-typescript';

interface UserAttrs {
  id?: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  photoUrl?: string;
  gender?: string;
  dateOfRegistration: string;
}


@DefaultScope({
  attributes: { exclude: ['password'] }
})
@Scopes({
   withpassword: {
    attributes: { include: ['password']}
   }
})
@Table({
  tableName: "user",
  timestamps: false,
})
export default class User extends Model<UserAttrs> implements UserAttrs {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare public firstName: string;  // I added exclamation mark to make it not nullable 
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  })
  declare public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare public lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare public email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare public password: string;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  declare public photoUrl: string;

  @Column({
      type: DataType.STRING,
      allowNull: true,
  })
  declare public gender: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare public dateOfRegistration: string;
}

User.prototype


