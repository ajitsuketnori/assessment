'use strict';
const userNameInput=document.getElementById('user-name');
const assessmentButton=document.getElementById('assessment');
const resultDivided=document.getElementById('result-area');
const tweetDivided=document.getElementById('tweet-area');

  /**
     * 指定した要素の子をすべて削除する
     * @param{HTNLElement}element HTMLの要素
     */
    function removeAllChildren(element){
        while(element.firstChild){//子の要素がある限り削除
　　　　　element.removeChild(element.firstChild);
        }
    }

assessmentButton.onclick=()=>{//アロー関数
    //↑無名関数(assessment~というオブジェクトのonclickというプロパティに設定)
    const userName=userNameInput.value;
    if(userName.length===0){//名前が空の時は処理を終了
        return;//戻り値がない、ここで処理終了
    }

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    while(resultDivided.firstChild){//子どもの要素がある限り削除
    //while文(与えられた論理式が真である場合に実行し続ける制御文)
　　　resultDivided.removeChild(resultDivided.firstChild);
　　//removeChild(指定された子要素を削除する関数)
    }
    const header=document.createElement('h3');
    //createElement(要素を作成する) div要素に追加
    header.innerText='診断結果';
    //innerText(内側のテキスト)
    resultDivided.appendChild(header);
    //appendChild(子を追加する)
    
    const paragraph=document.createElement('p');
    const result=assessment(userName);
    paragraph.innerText=result;
    resultDivided.appendChild(paragraph);
    
    //ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor=document.createElement('a');
    const hrefValue='https://twitter.com/intent/tweet?button_hashtag=';
      +encodeURIComponent('あなたが推すしかない日向坂46メンバー')
      +'&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className='twitter-hashtag-button';
    anchor.setAttribute('data-text',result + '#あなたが推すしかない日向坂46メンバー');
    anchor.innerText='Tweet #あなたが推すしかない日向坂46メンバー';
    tweetDivided.appendChild(anchor);

    //widgets.jsの設定
    const script=document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};
const answers=[
    '{username}さんは潮紗理菜さんを推してみてはいかが？🍀',
    '{username}さんは加藤史帆さんを推してみてはいかが？🐻',
    '{username}さんは斎藤京子さんを推してみてはいかが？🍜',
    '{username}さんは佐々木久美さんを推してみてはいかが？🥟',
    '{username}さんは佐々木美玲さんを推してみてはいかが？🍞',
    '{username}さんは高瀬愛奈さんを推してみてはいかが？🐇',
    '{username}さんは高本彩花さんを推してみてはいかが？🍒',
    '{username}さんは東村芽依さんを推してみてはいかが？🍓',
    '{username}さんは金村美玖さんをお寿司かない！🍣',
    '{username}さんは河田陽菜さんを推してみてはいかが？🐼',
    '{username}さんは小坂菜緒さんを推してみてはいかが？🦕',
    '{username}さんは富田鈴花さんを推してみてはいかが？🎤',
    '{username}さんは丹生明里さんを推してみてはいかが？🐸',
    '{username}さんは濱岸ひよりさんを推してみてはいかが？🐣',
    '{username}さんは松田好花さんを推してみてはいかが？🎸',
    '{username}さんは宮田愛萌さんを推してみてはいかが？📚',
    '{username}さんは渡邉美穂さんを推してみてはいかが？🏀',
    '{username}さんは上村ひなのさんを推してみてはいかが？🌞' 
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザーの名前
 * @return{string}診断結果
 */
function assessment(userName){
    //全コードの番号を取得してそれを足し合わせる
    let sumOFCharCode=0;
    for(let i=0; i<userName.length; i++){
        sumOFCharCode=sumOFCharCode+userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index=sumOFCharCode%answers.length;
    let result=answers[index];

    result=result.replace(/\{username\}/g, userName);
    return result;　　　　　　　　　　  //↑正規表現
}
