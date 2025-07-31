const sequelize = require("sequelize");
const StudentRepository = require("../db/student");


module.exports.findAll = async function (db) {
  try {
    const studentModel = StudentRepository.getStudentModel(db);
    return await studentModel.findAll({
      order: [["id", "ASC"]],
    });
  } catch (e) {
    throw e;
  }
};
