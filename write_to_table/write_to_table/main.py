import json
import os
from decimal import Decimal

import boto3

client = boto3.client('dynamodb')

def handler(event, _context = None):
    print(f"event: {event}")
    response = client.put_item(
        TableName=os.environ["TABLE_NAME"],
        Item={
            'timestamp': {
                "S": event["timestamp"]
            },
            'items': {
                "L": json.loads(json.dumps(event["results"]), parse_float=Decimal)
            }
        }
    )
    print(response)

if __name__ == "__main__":
    print("cannot run write_to_table locally, doing nothing...")
