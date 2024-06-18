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
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.create = async function (db, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);

    //日付の取得
    const dt = new Date();
    const year = dt.getFullYear();
    /** 
    * getMonthで月を取得すると1月が0とカウントされるのでMonthに+1する
    * "00"+取得した月or日としてslice(-2)で右から2文字を抜き出すことで、取得した月と日が1桁でも0が前に付き2桁となる
    */
    const month = ("00" + (dt.getMonth()+1)).slice(-2);
    const day = ("00" + (dt.getDate())).slice(-2);
    //取得した時間がグリニッジ標準時となっているため+9することで日本時間との時差を合わせる
    dt.setHours(dt.getHours()+9);
    const date = year + "-" + month + "-" + day;
    const today = new Date(date);
    
    //IDの自動採番処理
    let id = await InformationModel.max("no", { where: { date: today } });
    id = id + 1;

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
                    [Op.and]: { 
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

/**
 * お知らせ情報削除
 * @param {*} db
 * @param {*} no
 * @param {*} date
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.remove = async function (db, no, date) {
    const InformationModel = InformationRepository.getInformationModel(db);     
    const Op = sequelize.Op;

    try { 
        return await InformationModel.destroy(
            {
                where: {
                    [Op.and]: { 
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