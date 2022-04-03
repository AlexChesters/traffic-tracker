set -e

npm run build:prod
aws s3 cp "s3://$DATA_BUCKET_NAME/$DATA_FILE_KEY" build/data.json

CREDENTIALS=$(aws sts assume-role \
                  --role-arn "$UPLOAD_ROLE" \
                  --role-session-name "$$PROJECT_NAME-$CODEBUILD_BUILD_NUMBER")
export AWS_ACCESS_KEY_ID=$(echo $CREDENTIALS | jq -r .Credentials.AccessKeyId)
export AWS_SECRET_ACCESS_KEY=$(echo $CREDENTIALS | jq -r .Credentials.SecretAccessKey)
export AWS_SESSION_TOKEN=$(echo $CREDENTIALS | jq -r .Credentials.SessionToken)

aws s3 sync \
    build \
    "s3://$BUCKET/traffic-tracker" \
    --cache-control max-age=60 \
    --acl public-read \
    --delete
