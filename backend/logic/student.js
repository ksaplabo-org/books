const studentRepository = require("../db/student");

/**
 * 学生情報を全件検索
 * 
 * @param {*} db
 * @returns {Promise<Object[]>}
 */
module.exports.getAll = async function (db) {
  const studentModel = studentRepository.getStudentModel(db);

  try {
    return await studentModel.findAll();
  } catch (e) {
    throw e;
  }
};
