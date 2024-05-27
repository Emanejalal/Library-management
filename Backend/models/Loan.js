const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Book = require('./Book');

const Loan = sequelize.define('Loan', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Book,
      key: 'id'
    }
  },
  loanDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  returnDate: {
    type: DataTypes.DATE
  }
}, {
  timestamps: true,  // this will add createdAt and updatedAt fields automatically
});

Loan.belongsTo(User, { foreignKey: 'userId' }); // Define the association with User
Loan.belongsTo(Book, { foreignKey: 'bookId' }); // Define the association with Book

module.exports = Loan;
