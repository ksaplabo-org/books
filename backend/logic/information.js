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
                    ["date", "DESC"],
                    ["no", "DESC"]
                ]
            }
        );
    } catch (e) {
        console.log(e);
        throw e;
    }
}

/**
 * お知らせ情報新規登録
 * @param {*} db
 * @param {*} no
 * @param {*} date
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.create = async function (db, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);

    //日付の取得
    const dt = new Date();
    const y = dt.getFullYear();
    const m = ("00" + (dt.getMonth()+1)).slice(-2);
    const d = ("00" + (dt.getDate())).slice(-2);
    dt.setHours(dt.getHours()+9);
    const date = y + "-" + m + "-" +d;
    const today = new Date(date);
    
    //IDの自動採番処理
    let id = await InformationModel.max("no", { where: { date: today } });
    id = id +1;

    //お知らせ新規登録
    try { 
        return await InformationModel.create(
            {
                no: id,
                date: today,
                title: title,
                content: content
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * お知らせ情報更新
 * @param {*} db
 * @param {*} no
 * @param {*} date
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.update = async function (db, no, date, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);
    const Op = sequelize.Op;

    try { 
        return await InformationModel.update(
            {
                title: title,
                content: content
            },
            {
                where: {
                    [Op.and]: { where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y/%m/%d'), date),
                        no: no
                    }
                }    
            }
        );
    } catch (e) {
        throw e;
    }
}

/**
 * お知らせ情報削除
 * @param {*} db
 * @param {*} no
 * @param {*} date
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.remove = async function (db, no, date) {
    const InformationModel = InformationRepository.getInformationModel(db);     
    const Op = sequelize.Op;

    try { 
        return await InformationModel.destroy(
            {
                where: {
                    [Op.and]: 
                    { 
                        where: sequelize.where(sequelize.fn('DATE_FORMAT', sequelize.col('date'), '%Y/%m/%d'), date),
                        no: no
                    }
                }    
            }
        );
    } catch (e) {
        throw e;
    }
}