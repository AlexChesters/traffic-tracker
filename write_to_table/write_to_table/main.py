import json
import os
from decimal import Decimal

import boto3

dynamodb = boto3.resource('dynamodb',region_name='eu-west-1')

def handler(event, _context = None):
    table = dynamodb.Table(os.environ["TABLE_NAME"])
    response = table.put_item(
        Item={
            'Timestamp': event["timestamp"],
            'Results': json.loads(json.dumps(event["results"]), parse_float=Decimal)
        }
    )
    print(response)

if __name__ == "__main__":
    print("cannot run write_to_table locally, doing nothing...")
