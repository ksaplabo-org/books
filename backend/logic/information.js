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
                order: [
                    ["date", 'DESC'],
                    ["no", 'DESC'] 
                ],
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
 * @param {*} no
 * @param {*} date
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
 */
module.exports.create = async function(db, no, date, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);
   
    //今日の日付の取得
    var now = new Date();
    var year = now.getFullYear();
    /**
     * 今日の月の取得
     * getmonthは月を0から11で数えているため1を足す
     * 13月になってしまった場合1月に戻るように条件を付与
     */    
    var month = now.getMonth() + 1;
    if (month == 13){
        month = 1;
    }
    var day = now.getDate();
    now_date = year + "/" + month + "/" + day;
    //日本時間に直す
    var japan_date = new Date(now_date);
    japan_date.setHours(japan_date.getHours() + 9);
                
    //idの自動採番処理
    //dateをYYYY/MM/DDの形に直し、今日のデータの'no'の最大値を取得
    var max_no = await InformationModel.max('no', {
        where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'),'%Y/%m/%d'), date),
        where: {
            date: japan_date
        }
    })
    auto_no = max_no + 1; 
    try {
        return await InformationModel.create(
            {
                no : auto_no,
                date : japan_date,
                title: title,
                content : content
            }
        )
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
module.exports.update = async function(db, no, date, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);
    try {
        return await InformationModel.update(
            {
                title: title,
                content: content
            },
            {
                where: {
                        where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'), '%Y/%m/%d'), date),
                        no: no  
                }
            }
        )
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
module.exports.remove = async function(db, no, date) {
    const InformationModel = InformationRepository.getInformationModel(db);
    try {
        return await InformationModel.destroy(
            {
                where: {
                    where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'), '%Y/%m/%d'), date),
                    no: no
                }
            }
        )
    } catch (e) {
        throw e;
    }
}


