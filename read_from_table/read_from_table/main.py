# import os
# import datetime

import boto3

dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
s3 = boto3.resource('s3')

def handler(event = None, _context = None):
    print(event)
    return []


    # table = dynamodb.Table(os.environ["TABLE_NAME"])
    # response = table.scan()
    # items = response['Items']

    # while response.get('LastEvaluatedKey', None):
    #     response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
    #     items.extend(response['Items'])

    # date_part = datetime.date.today().strftime('%Y/%m/%d')
    # obj = s3.Object(os.environ["BUCKET_NAME"], f"{date_part}/")

    # return items

if __name__ == "__main__":
    print("cannot run read_from_table locally, doing nothing...")
