"""
  Cloud Architecture Diagram of
  Corona Virus Tracker Website
"""
from diagrams import Diagram, Cluster, Edge
from diagrams.aws.compute import Lambda
from diagrams.aws.database import Dynamodb
from diagrams.aws.storage import SimpleStorageServiceS3
from diagrams.aws.management import Cloudformation, Cloudwatch
from diagrams.aws.engagement import SimpleEmailServiceSes
from diagrams.aws.network import APIGateway
from diagrams.custom import Custom

## Network-related modules##
from diagrams.aws.network import CloudFront
from diagrams.aws.network import Route53


with Diagram("Serverless Architecture of CoronaVirus Tracker Website", show=True):
    # End-user layer
  user = Custom("User", "./my_resources/user.png")
  with Cluster("AWS"):
    route53 = Route53("Amazon Route 53")
    cloud_front = CloudFront("Amazon CloudFront")
    s3_bucket = SimpleStorageServiceS3("S3 Static Content")
    api_gateway = APIGateway("Amazon API Gateway")

    with Cluster("AWS Lambda"):
      handler_send_email = Lambda("SendDailyEmail"),
      handler_subscribe_email = Lambda("SubscribeEmail"),
      handler_update_daily_history_data = Lambda("UpdateDailyHistoryData")
    
    # api_gateway >> Edge(label="/subscribe (POST)") >> handler_subscribe_email             
    
    user >> route53 >> cloud_front >> Edge(color="brown", label="request") >> s3_bucket
    user >> api_gateway
