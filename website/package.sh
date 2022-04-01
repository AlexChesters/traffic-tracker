set -e

npm run build:prod

CREDENTIALS=$(aws sts assume-role \
                  --role-arn arn:aws:iam::008356366354:role/projects-live-bucket-BucketUploadRole-1USRJUF87S00F \
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
