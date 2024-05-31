const InformationRepository = require("../db/information");
const sequelize = require("sequelize");

/**
 * お知らせを追加する
 * @param {*} db 
 * @returns お知らせ情報（Promise）
 */
module.exports.create = async function(db, date, title, content){
    const InformationModel = InformationRepository.getInformationModel(db);

    date= new Date().setHours(9, 0, 0);

    const info = await InformationModel.findAll({       //infoに今日のお知らせのみを入れる
        where:{
            date:date
        }
    })
    let id = 1;                                         
    for(let i = 0; i < info.length; i++){               //日付で絞ったデータの中身をすべて確認
        if(info[i].dataValues.no >= id){                //idが最も大きいもの+１をidへ
            id = info[i].dataValues.no + 1;
        }
    }
    
    try {
        return await InformationModel.create({
            date : date,
            no : id,
            title : title,
            content : content
        });
    } catch (e) {
        throw e;
    }
}

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
                    ["date", "DESC"],
                    ["no", "DESC"]
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
 * お知らせを更新する
 * @param {*} db 
 * @returns お知らせ情報（Promise）
 */
module.exports.update = async function (db, no, date, title, content){
    const InformationModel = InformationRepository.getInformationModel(db);

    let today = new Date(date);
    today.setHours(today.getHours() + 9);

    try {
        return await InformationModel.update({
            title : title,
            content : content
        },
        {
            where:{
                date : today,
                no : no
            }
        });
    } catch (e) {
        throw e;
    }
}

/**
 * お知らせを削除する
 * @param {*} db 
 * @returns お知らせ情報（Promise）
 */
module.exports.remove = async function (db, id, date){
    const InformationModel = InformationRepository.getInformationModel(db);

    let today = new Date(date);
    today.setHours(today.getHours() + 9);
    
    try{
        return await InformationModel.destroy({
            where:{
                date : today,
                no : id
            }
        });
    } catch (e) {
        throw e;
    }
}