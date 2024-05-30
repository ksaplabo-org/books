const InformationRepository = require("../db/information");
const sequelize = require("sequelize");

/**
 * お知らせ一覧を取得する
 * @param {*} db 
 * @returns お知らせ情報（Promise）
 */
module.exports.getAll = async function(db) {
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
                    'title',
                    'content'
                ],

                // お知らせを新しい順に並び変える
                order: [
                    ['date', 'DESC'],
                    ['no', 'DESC']
                ]
            }
        );
    } catch (e) {
        console.log(e);
        throw e;
    }
}

/**
 * お知らせ情報登録
 * @param {*} db 
 * @param {*} title
 * @param {*} content
 * @returns お知らせ情報（Promise）
 */
module.exports.create = async function (db, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);

    // 本日の日付の 09時00分 に設定
    var now = new Date();
    var plusDateStr = now.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });
    var plusDate = new Date(plusDateStr);
    plusDate.setHours(9);

    try {
        // 本日登録されたお知らせ情報のうち、最大の ID を取得
        var maxNo = await InformationModel.max(
            'no',
            {
                where: {
                    date: plusDate
                }
            }
        );
        // 本日の ID + 1 を指定してお知らせ情報を登録
        return await InformationModel.create(
            {
                date: plusDate,
                no: maxNo + 1,
                title: title,
                content: content
            }
        );
    } catch (e) {
        console.log(e);
        throw e;
    }
}

/**
 * お知らせ情報更新
 * @param {*} db
 * @param {*} date
 * @param {*} no
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.update = async function (db, date, no, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;

    // 受け取った日付の 09時00分 に設定
    const plusDate = new Date(date);
    plusDate.setHours(9);

    try {
        return await InformationModel.update(
            {
                title: title,
                content: content,
            },
            {
                where: {
                    [Op.and]: {
                        date: plusDate,
                        no: no
                    }
                }
            }
        );
    } catch (e) {
        console.log(e);
        throw e;
    }
}

/**
 * お知らせ情報削除
 * @param {*} db
 * @param {*} date
 * @param {*} no
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.remove = async function (db, date, no) {
    const InformationModel = InformationRepository.getInformationModel(db);
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;

    // 受け取った日付の 09時00分 に設定
    const plusDate = new Date(date);
    plusDate.setHours(9);

    try {
        return await InformationModel.destroy(
            {
                where: {
                    [Op.and]: {
                        date: plusDate,
                        no: no
                    }
                }
            }
        );
    } catch (e) {
        console.log(e);
        throw e;
    }
}
