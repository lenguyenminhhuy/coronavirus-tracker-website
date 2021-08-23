import "source-map-support";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

exports.handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line no-restricted-syntax
  console.debug("Received event:", event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello Corona!",
    }),
  };
};
