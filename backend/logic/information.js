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

// 新規登録ボタンの処理
module.exports.create = async function (db, no, date, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);
   
                //今日の日付の取得
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    if (month == 13){
        month = 1;
    }
    var day = now.getDate();
    date = year + "/" + month + "/" + day;

    //日本時間に直す
    var date = new Date(date);
    date.setHours(date.getHours() + 9);
                
    //idの自動採番処理
    var no = await InformationModel.max('no',{
        where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'),'%Y/%m/%d'), date),
        where:{
            date: date
                }
            }
        )
    no = no + 1; 
    try {
        return await InformationModel.create(
            {
                no : no,
                date : date,
                title: title,
                content : content
            }
        )
    } catch (e) {
        throw e;
    }
}

// 更新ボタンの処理
module.exports.update = async function (db, no, date, title, content){
    const InformationModel = InformationRepository.getInformationModel(db);
    try {
        return await InformationModel.update(
            {
                title: title,
                content: content
            },
            {
             where: {
                        where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'),'%Y/%m/%d'), date),
                        no: no  
                    }
            }
        )
    } catch (e) {
        throw e;
    }
}

//削除ボタンの処理
module.exports.remove = async function (db, no, date) {
    const InformationModel = InformationRepository.getInformationModel(db);
    try {
        return await InformationModel.destroy(
            {
                where: {
                    where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'),'%Y/%m/%d'), date),
                    no: no
                }
            }
        )
    } catch (e) {
        throw e;
    }
}


