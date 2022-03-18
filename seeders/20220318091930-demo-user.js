'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            username: "John Doe",
            password: "123213",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            username: "Aikol Koikelov",
            password: "123213",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
