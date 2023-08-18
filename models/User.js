const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrongPass(value) {
          const regexString =
            '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()])(.{8,20})$';
          if (!regexString.test(value)) {
            throw new Error(
              'password must contain uppercase, lowercase, digit, special character, and be 8-20 characters long.'
            );
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);
