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
 * お知らせ新規登録
 * @param {*} db 
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.create = async function (db, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);

    // 登録時点での日付を'％Y-％M-％D'の形で取得
    const today = new Date().toLocaleDateString("ja-JP", {year: "numeric",month: "2-digit",day: "2-digit"}).replaceAll('/', '-');
    // dateがtodayと等しいデータの中からnoの最大値を取得し、+1した値をnumberに代入
    const number = await InformationModel.max("no", {where: {where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), today)}}) + 1;

    try {
        return await InformationModel.create(
            {
                date: today,
                no: number,
                title: title,
                content: content
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * お知らせ更新
 * @param {*} db
 * @param {*} no
 * @param {*} date
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.update = async function (db, no, date, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);

    try {
        return await InformationModel.update(
            {
                title: title,
                content: content
            },
            {
                where: {
                    no: no,
                    where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'), '%Y/%m/%d'), date)
                }
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * お知らせ削除
 * @param {*} db 
 * @param {*} no
 * @param {*} date
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.remove = async function (db, no, date) {
    const informationModel = InformationRepository.getInformationModel(db);

    try {
        return await informationModel.destroy(
            {
                where: {
                    no: no,
                    where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'), '%Y/%m/%d'), date)
                }
            }
        );
    } catch (e) {
        throw e;
    }
}