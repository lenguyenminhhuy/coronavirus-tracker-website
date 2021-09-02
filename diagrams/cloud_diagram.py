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

with Diagram("Serverless Architecture of CoronaVirus Tracker Website", show=True, direction="BT"):
  # End-user layer
  developer = Custom("Developer", "./my_resources/administrator-developer.png")
  user = Custom("User", "./my_resources/user.png")
  with Cluster("AWS"):

    with Cluster("Frontend client"):
      route53 = Route53("Amazon Route 53")
      cloud_front = CloudFront("Amazon CloudFront")
      s3_bucket = SimpleStorageServiceS3("S3 Static Content")

    with Cluster("Serverless Backend"):
      api_gateway = APIGateway("Amazon API Gateway")
      cloud_watch = Cloudwatch("Amazon CloudWatch")
      with Cluster("AWS Lambda"):
        ## Trigger Functions Declaration ##
        send_daily_email_function = Lambda("SendDailyEmail")
        get_daily_function = Lambda("GetDaily")
        update_history_function = Lambda("UpdateHistory") 

        ## CloudWatch Triggers ##
        cloud_watch >> Edge(color="purple") >> send_daily_email_function
        cloud_watch >> Edge(color="purple") >> get_daily_function
        cloud_watch >> Edge(color="purple") >> update_history_function

        
        ## REST Functions Declaration ##
        subscribe_function = Lambda("SubscribeEmail")
        get_daily_api_function = Lambda("GetDailyAPI") 
        history_function = Lambda("History")
        get_country_list_function = Lambda("GetCountryList") 
        scraping_data_function = Lambda("ScrapingData")

        database_handlers = [subscribe_function,
        get_daily_api_function,
        history_function,
        get_country_list_function, scraping_data_function, get_daily_function, update_history_function ]

        ## API Gateway REST Connection
        api_gateway >> Edge()  >> subscribe_function
        api_gateway >> Edge() >> get_daily_api_function
        api_gateway >> Edge() >>  history_function
        api_gateway >> Edge() >> get_country_list_function
        api_gateway >> Edge() >>  scraping_data_function 
    
    dynamo = Dynamodb("Amazon DynamoDB")
    s3_functions = SimpleStorageServiceS3("S3 Zipped Functions")
    cloud_formation = Cloudformation("Amazon CF Template")

    developer >> cloud_formation >> s3_functions

    ## Functions interact with DynamoDB
    database_handlers >> dynamo

    ## Function with SES
    send_daily_email_function >> SimpleEmailServiceSes("Amazon SES")
    

        
    # Front-end connections
  user >> Edge(color="brown") >> route53 >> cloud_front >> s3_bucket
  user >> Edge(color="brown") >> api_gateway
    # Back-end connections
