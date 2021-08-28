import "source-map-support";
import aws from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

interface RequestBody {
  email: string;
}

exports.handler = (event: APIGatewayProxyEvent): APIGatewayProxyResult => {
  const { email }: RequestBody = JSON?.parse(event.body ?? "null");
  if (email == null) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message:
          "ERROR! Cannot subscribe with NULL email field. Please check again!",
      }),
    };
  }
  console.log("Hello");
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Subscribe for daily news successfully!",
    }),
  };
};
