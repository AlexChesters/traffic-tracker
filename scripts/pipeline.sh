set -e

AWS_PROFILE=personal \
  aws cloudformation deploy \
  --template-file ci/codepipeline.yml \
  --stack-name codepipeline-traffic-tracker \
  --capabilities CAPABILITY_NAMED_IAM \
  --region eu-west-1
