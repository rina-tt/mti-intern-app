const { DynamoDBClient, QueryCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall, marshall} = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team2-Article";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  if(event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({message: "権限がありません。"});
    return response;
  }
  
  const qs = event.queryStringParameters; // クエリストリング
  
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
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  } 

  return response;
  
};