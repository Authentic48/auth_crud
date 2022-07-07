import { Model, Table,  Column, DataType } from 'sequelize-typescript';

interface UserAttrs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photoUrl: string;
  gender: string;
  dateOfRegistration: string;
}

@Table({
  tableName: "user",
  timestamps: false,
})
export default class User extends Model implements UserAttrs {
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;  // I added exclamation mark to make it not nullable 

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  photoUrl!: string;

  @Column({
      type: DataType.STRING,
      allowNull: false,
  })
  gender!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dateOfRegistration!: string;
}


