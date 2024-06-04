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
 * 新規お知らせを登録する
 * @param {*} db 
 * @param {*} title
 * @param {*} content
 * @returns Promise（成功時 resolve/失敗時 reject）
 */
module.exports.create = async function(db, title, content){
    
    const InformationModel = InformationRepository.getInformationModel(db);
    
    // 日付の取得処理(オプション)
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }

    // 現在の日付を取得し、DBとの型を合わせるため整形する
    const now = new Date();
    const nowDate = now.toLocaleDateString('ja-JP', options);
    const nowDateRepair = nowDate.replaceAll('/', '-');
    
    // DBから日付が現在の日付と同じお知らせ情報の中で最も大きい ID を取得する
    const id = await InformationModel.max("no", {
        where: {
            where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'), '%Y-%m-%d'), nowDateRepair)
        }
    }) + 1;
    
    try{
        return await InformationModel.create({
            date: nowDateRepair,
            no: id,
            title: title,
            content: content
        });
    }catch(e){
        console.log(e);
        throw e;
    }
}

/**
 * お知らせを更新する
 * @param {*} db 
 * @param {*} date
 * @param {*} no
 * @param {*} title
 * @param {*} content
 * @returns Promise（成功時 resolve/失敗時 reject）
 */
module.exports.update = async function(db, date, no, title, content){

    const InformationModel = InformationRepository.getInformationModel(db);

    try{
        return await InformationModel.update({
            title: title,
            content: content
        },{
            where: {
                no: no,
                where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'), '%Y/%m/%d'), date)
            }
        });
    }catch(e){
        console.log(e);
        throw e;
    }

}

/**
 * お知らせを削除する
 * @param {*} db 
 * @param {*} date
 * @param {*} no
 * @returns Promise（成功時 resolve/失敗時 reject）
 */
module.exports.remoeve = async function(db, date, no){

    const InformationModel = InformationRepository.getInformationModel(db);

    try{
        return await InformationModel.destroy({
            where: {
                no: no,
                where: sequelize.where(sequelize.fn('date_format', sequelize.col('date'), '%Y/%m/%d'), date)
            }
        });
    }catch(e){
        console.log(e);
        throw e;
    }

}