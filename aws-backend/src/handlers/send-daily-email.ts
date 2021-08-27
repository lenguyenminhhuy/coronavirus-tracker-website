import "source-map-support";
import aws from "aws-sdk";
import { SendEmailRequest, SendEmailResponse } from "aws-sdk/clients/ses";

// // Provide credentials
// aws.config.loadFromPath("../../config.json");

exports.handler = async (): Promise<void> => {
  // Initialize SES service
  const ses = new aws.SES({ region: "us-east-2" });

  // Specify e-mail agents
  const sender = "CoronaNews <coronanews@minhthings.com>";
  const recipient = "minhlucky2408@gmail.com"; // @test account

  // Subject line of e-mail
  const subject = "[Corona Headlines] HOT/BREAKING News Today!";

  // Content of e-mail
  const bodyHtml = `<html>
  <head></head>
  <body>
    <h1>HOT/BREAKING News Today!</h1>
    <p>
      Enjoy the news!
    </p>
    <br/>
    <b>Coronavirus-Tracker</b>
  </body>
  </html>`;

  // charset encoding for e-mail
  const charset = "UTF-8";

  // Specify parameters to pass to the API
  const mailParams: SendEmailRequest = {
    Source: sender,
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: charset,
      },
      Body: {
        Html: {
          Data: bodyHtml,
          Charset: charset,
        },
      },
    },
  };

  // Send Email operation
  ses.sendEmail(mailParams, (err, data: SendEmailResponse) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Email sent! Message ID: ", data.MessageId);
    }
  });
};
