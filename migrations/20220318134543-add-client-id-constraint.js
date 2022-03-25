'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Projects', 'clientId', {
      type: Sequelize.INTEGER,
    })

    await queryInterface.addConstraint("Projects", {
      type: "foreign key",

      name: "project_client_id_fkey",
      fields: ["clientId"],
      references: {
        table: "Clients",

        field: "id",
      },

      onDelete: "cascade",

      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
