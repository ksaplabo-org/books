const StudentRepository = require("../db/student");

/**
 * 学生情報を全件検索
 * 
 * @param {*} db
 * @returns {Promise<Object[]>}
 */
module.exports.getAll = async function (db) {
  const StudentModel = StudentRepository.getStudentModel(db);

  try {
    return await StudentModel.findAll();
  } catch (e) {
    throw e;
  }
};
