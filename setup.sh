#!/bin/bash

# 各フォルダのパスを取得
DIR=$(cd $(dirname $0); pwd)
FRONT_DIR=$DIR/'front'/'src'
BACKEND_DIR=$DIR/'backend'

# 作成ブランチ名
BRANCH_NAME='intern'

# 変換元ファイルの格納先を指定
FROM_DIR='intern'

echo '=========================================================='
echo ' 変更を破棄'
echo '=========================================================='
# TODO: 強制破棄になっているため、(Y/N)選択させるとかで中断を可能にする。
git checkout .

echo
echo '=========================================================='
echo ' リモートの最新を取得'
echo '=========================================================='
git pull

if [[ -n `git branch -a | grep -x "  remotes/origin/$BRANCH_NAME"` ]]; then
    echo
    echo '=========================================================='
    echo ' リモートブランチを削除'
    echo " ブランチ名： [ $BRANCH_NAME ]"
    echo '=========================================================='
    git push origin --delete "$BRANCH_NAME"
fi

echo
echo '=========================================================='
echo ' ローカルブランチを作成'
echo " ブランチ名： [ $BRANCH_NAME ]"
echo '=========================================================='
# TODO: 警告が出力される。(動作には影響なし。)
git checkout -B "$BRANCH_NAME" 'remotes/origin/master'

echo
echo '=========================================================='
echo ' ファイル変換'
echo '=========================================================='
function convert() {
    fromFile=$1
    toFile=${fromFile/"$FROM_DIR/"}
    
    echo "$fromFile -> $toFile"
    cp "$fromFile" "$toFile"

    git add "$toFile"
}
# backend
for fromFile in $(find "$BACKEND_DIR/$FROM_DIR" -type f);
do
    convert $fromFile
done
# front
for fromFile in $(find "$FRONT_DIR/$FROM_DIR" -type f);
do
    convert $fromFile
done
echo 'completed...'

echo
echo '=========================================================='
echo ' 変換元のフォルダを削除'
echo " 削除フォルダ: ["
echo "    $BACKEND_DIR/$FROM_DIR"
echo "    $FRONT_DIR/$FROM_DIR"
echo " ]"
echo '=========================================================='
git rm -r "$BACKEND_DIR/$FROM_DIR"
git rm -r "$FRONT_DIR/$FROM_DIR"

echo
echo '=========================================================='
echo ' コミットファイルの一覧'
echo '=========================================================='
git status -s -uno

# コミット
echo
echo '=========================================================='
echo ' git commit'
echo '=========================================================='
git commit -m "intern用セットアップ"

echo
echo '=========================================================='
echo ' remoteにブランチを作成'
echo " ブランチ名：  [ origin $BRANCH_NAME" ]
echo '=========================================================='
git push -u origin "$BRANCH_NAME"
