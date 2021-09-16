import "source-map-support";
// import aws from "aws-sdk";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// aws.config.loadFromPath("../../config.json");

exports.handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // eslint-disable-next-line no-restricted-syntax
  console.debug("Received event:", event);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello Coronavirus-Tracker-Website!",
    }),
  };
};
