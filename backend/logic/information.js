// moment import
const moment = require("moment");
const InformationRepository = require("../db/information");
const sequelize = require("sequelize");

/**
 * お知らせを取得する
 * @param {*} db 
 * @returns お知らせ情報（Promise）
 */
module.exports.getAll = async function (db) {
    const InformationModel = InformationRepository.getInformationModel(db);

    try {
        return await InformationModel.findAll(
            {
                attributes: [
                    [
                        sequelize.fn(
                            'date_format',
                            sequelize.col('date'),
                            '%Y/%m/%d'
                        ),
                        'date'
                    ],
                    'no',
                    'content'
                ]
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
}
