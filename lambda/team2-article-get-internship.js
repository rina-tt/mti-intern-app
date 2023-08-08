const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
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
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};

