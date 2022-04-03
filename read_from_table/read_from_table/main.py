import os
import datetime
import json
from decimal import Decimal

import boto3

dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
s3 = boto3.resource('s3')

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return str(o)
        return json.JSONEncoder.default(self, o)

def handler(event = None, _context = None):
    table = dynamodb.Table(os.environ["TABLE_NAME"])
    response = table.scan()
    items = response['Items']

    while response.get('LastEvaluatedKey', None):
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])

    date_part = datetime.date.today().strftime('%Y/%m/%d')
    execution_id = event["ExecutionId"]
    obj_key = f"{date_part}/{execution_id}.json"
    obj = s3.Object(os.environ["BUCKET_NAME"], obj_key)

    result = obj.put(Body=json.dumps(items, cls=DecimalEncoder))
    print(result)

    return {
        "bucket_name": os.environ["BUCKET_NAME"],
        "key": obj_key
    }

if __name__ == "__main__":
    print("cannot run read_from_table locally, doing nothing...")
