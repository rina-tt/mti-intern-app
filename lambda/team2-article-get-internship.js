<<<<<<< HEAD
const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
=======
const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall, marshall} = require("@aws-sdk/util-dynamodb");
>>>>>>> main
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team2-Article";

/*** 通常版の解答例(発展課題を含む最終版は下にあります。) ***/
exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };

  //ログイン確認
  if(event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({message: "権限がありません。"});
    return response;
  }
  
  //パラメータが指定されているか
   //リクエストパラメータ
  const userId=event.queryStringParameters?.userId;
  const timestamp_string=event.queryStringParameters?.timestamp;
  const timestamp=Number(timestamp_string);
  
<<<<<<< HEAD
  if (!userId || !timestamp) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message:
        "無効なリクエストです。request bodyに必須パラメータがセットされていません。",
    });

    return response;
  }
  
 
  
  const param = {
    TableName,
    Key: marshall({
      userId,
      timestamp
    }),
  };

  const command = new GetItemCommand(param);

  try {
    //client.send()の実行でDBからデータを取得
    const article = (await client.send(command)).Item;
    
    if(!article) {
      response.statusCode = 404;
      response.body = JSON.stringify({message: "該当するデータが見つかりません"});
      return response;
    }

    //TODO: 条件に該当するデータがあればパスワードを隠蔽をする処理を記述
    response.statusCode = 200;
    //TODO: レスポンスボディに取得したUserの情報を設定する
    response.body = JSON.stringify(unmarshall(article));
=======
  const { userId, start, end } = qs;
 
  //TODO: 取得対象のテーブル名をparamに宣言
  const param = {
      TableName,
      Limit: 100,
      //キー、インデックスによる検索の定義
      //KeyConditionExpression: "userId = :uid",
      KeyConditionExpression: "userId = :uid and #timestamp BETWEEN :start AND :end",
      ExpressionAttributeNames: {
        "#timestamp": "timestamp",
      },
      ExpressionAttributeValues: {
        ":uid": userId,
        // startが無効な場合は、0以上という条件にすることで、実質フィルタリング無効化
        ":start": Number.isNaN(parseInt(start)) ? 0 : parseInt(start),
        // endが無効な場合は、現在時刻以下という条件にすることで、実質フィルタリング無効化
        ":end": Number.isNaN(parseInt(end)) ? Date.now() : parseInt(end),
      },
  };
  
  param.ExpressionAttributeValues = marshall(param.ExpressionAttributeValues)

  const command = new QueryCommand(param);

try {
    // client.send()で全件取得するコマンドを実行
    const articles = (await client.send(command)).Items;
 
    if (articles.length == 0) {
      response.body = JSON.stringify({ articles: [] });
    } else {
      const unmarshalledArticlesItems = articles.map((item) => unmarshall(item));
      
      unmarshalledArticlesItems.sort((a, b) => {
          return a.timestamp > b.timestamp ? -1 : 1;
      });
      //unmarshalledArticlesItems.sort((a, b) => b.timestamp - a.timestamp);
      
      response.body = JSON.stringify({ articles: unmarshalledArticlesItems});
    }
>>>>>>> main
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
<<<<<<< HEAD
  }

  return response;
};
=======
  } 

  return response;
  
};
>>>>>>> main
