const InformationRepository = require("../db/information");
const sequelize = require("sequelize");

/**
 * お知らせ一覧を取得する
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
 * お知らせ登録
 * @param {*} db 
 * @param {*} title
 * @param {*} content
 * @returns Promise(成功:resolve/失敗:reject)
*/
module.exports.create = async function (db, title, content) {
    const InformationModel = InformationRepository.getInformationModel(db);

    //日付取得
    const now = new Date();
    const year = now.getFullYear();
    const getmonth = now.getMonth() + 1;
    const month = ('0'+ getmonth).slice(-2);
    const day = now.getDate();
    var newDate = year + "-" + month + "-" + day;

    var date = new Date(newDate);
    date.setHours(date.getHours() + 9);

    //自動採番
    var no = 0;
    const noData = await InformationModel.findAll()
    .then(function (allData) {
            allData.forEach((element) => {
                if (element.dataValues.date == newDate) {
                    if (no < element.dataValues.no) {
                        no = element.dataValues.no;
                    }
                }
            });
            return no = no + 1;
        })

    try {
        return await InformationModel.create(
            {
                no: noData,
                date: date,
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
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 9);
    
    try {
        return await InformationModel.update(
            {
                title: title,
                content: content
            },
            {
                where: {
                    no: no,
                    date: newDate
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
    const InformationModel = InformationRepository.getInformationModel(db);
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + 9);

    try {
        return await InformationModel.destroy(
            {
                where: {
                    no: no,
                    date: newDate
                }
            }
        );
    } catch (e) {
        throw e;
    }
}