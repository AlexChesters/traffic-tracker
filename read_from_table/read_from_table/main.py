import os

import boto3

dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')

def handler(_event = None, _context = None):
    table = dynamodb.Table(os.environ["TABLE_NAME"])
    response = table.scan()
    items = response['Items']

    while response.get('LastEvaluatedKey', None):
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        items.extend(response['Items'])

    return items

if __name__ == "__main__":
    print("cannot run read_from_table locally, doing nothing...")
