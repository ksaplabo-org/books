const StudentRepository = require("../db/student");

/**
 * 学生情報をすべて取得する
 * @param {*} db
 * @returns 学生情報(Promise)
 */
module.exports.getAll = async function (db) {
  const StudentModel = StudentRepository.getStudentModel(db);

  try {
    return await StudentModel.findAll();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
