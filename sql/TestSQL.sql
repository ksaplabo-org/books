USE intern;
DELETE FROM information;
INSERT INTO information values (now(), 1, 'BookStation 開設', '新しくブックステーションが開設されました。皆さんぜひご利用ください。');
INSERT INTO information values (now(), 3, '不審者報告', '最近館内で怪しい人物の目撃情報が多発しています。');