"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate([
        {
          id: 1,
          spotId: 1, // Assuming the spot ID is 1
          url: "https://lumiere-a.akamaihd.net/v1/images/c94eed56a5e84479a2939c9172434567c0147d4f.jpeg?region=0,0,600,600",
          preview: true, // Marked as preview image
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          spotId: 2, // Assuming the spot ID is 2
          url: "https://celebrationspress.com/wp-content/uploads/2017/10/102317Tigger.png",
          preview: false, // Not marked as preview
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          spotId: 3, // Assuming the spot ID is 3
          url: "https://static.wikia.nocookie.net/disney/images/5/5d/Profile_-_Piglet.png/revision/latest?cb=20190424074931",
          preview: true, // Marked as preview image
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (err) {
      console.error(err);
      throw "";
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
