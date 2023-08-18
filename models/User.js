const { Model, DataTypes } = require('sequelize');
const sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

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
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    modelName: 'User',
  }
);
