# Welcome to Demo CDK TypeScript project

## Required AWS Account Permissions
- AdministratorAccess
- AWSCloudFormationFullAccess
- AmazonEKSClusterPolicy


## Resource Description
- ### Spot instances for Kubernetes Nodes:
For optimizations on cost and scale.
- ### Managed node groups:
Every managed node is provisioned as part of an Amazon EC2 Auto Scaling group that's managed for you by Amazon EKS.
- ### Multiple instance types in node groups:
To maximize the availability of applications while using Spot Instances, we configure a Spot managed node group to use multiple instance types with the instanceTypes property.


## AWS CDK
### Prerequisites:
- You should already have AWS CLI installed.
  - Visit https://docs.aws.amazon.com/cli/v1/userguide/cli-chap-install.html
- Configure the user credentials for AWS authorization:
  - Use specific command
    - `aws configure`
  > OR
  - Set the auth credential globally:
    - export AWS_ACCESS_KEY_ID=`<set your access key>`
    - export AWS_SECRET_ACCESS_KEY=`<set your secret access key>`
    - export AWS_DEFAULT_REGION=eu-central-1
1. To Install aws cdk, use the universall installation method:
   - `npm install -g aws-cdk`
### Description:
- This project was generated with the help of INIT command in typescript language
- The code of all the resoutces can be found in the lib directory

# You can use:
- Auto deployment script
- Manual deployment to control every step

## Auto deployment:
- Specify the environment variables in the begining  of the script ./deploy.sh
- Just run:
  - `./deploy.sh`
## Manual Deployment
### Deployment:
1. Compile the typescript files to js-files:
   - `npm run build`
2. The following command will generate the CloudFormation Template based on the code, that is defined in Stack:
   - `cdk synth`
   - the result will be shown in terminal in YAML format
   - the result is also saved in cdk.out in JSON format for actual deployment
3. Before deployment create all the necessary CDK assets in AWS:
   - `ACCOUNT_ID=$(aws sts get-caller-identity|jq -r ".Account")` - get your aws accountId
   - `cdk bootstrap aws://$ACCOUNT_ID/eu-central-1`
4. Provision the cloud resources:
   - `cdk deploy`


## HELLO-KUBERNETES
### Deployment of Hello-Kubernetes Chart:
1. enter helm-directory:
   - `cd helm`
2. change the configuration fo helm template, if you wish, in values.yaml file
3. make sure you have access to the Kubernetes cluster
4. Deploy Hello Kubernetes Chart to the Cluster:
   - the following command will deploy the chart for the first time:
     - `helm install hello-kubernetes ./hello-kubernetes`
   - the following command will updated the chart, if it has been already deployed:
     - `helm ls` - to get the name of hello-kubernetes release
     - `helm update hello-kubernetes ./hello-kubernetes`
### Access to Hello-Kubernetes:
5. How to access hello-kubernetes from the browser
   - If your service type is LoadBalancer:
     - `kubectl get services`
     - Find your loadbalancer service and take it EXTERNAL-IP
     - now you can access it on EXTERNAL-IP
   - If your service type is NodePort:
     - `kubectl get services`
     - Find your nodeport service and take it Name
     - `kubectl port-forward service/<service_name> 8080:80`
     - now you can access it on localhost:8080


## FLINK
### Deployment of Flink Cluster: 
1. Make sure you have access to the Kubernetes Cluster
2. enter helm-directory:
   - `cd helm`
3. change the configuration fo helm template, if you wish
4. Deploy Hello Kubernetes Chart to the Cluster:
   - the following command will deploy the chart for the first time:
     - `helm install flink ./flink`
   - the following command will updated the chart, if it has been already deployed:
     - `helm update flink ./flink`
### Access to the Flink Cluster: 
- How to access hello-kubernetes from the browser
  - If your service type is LoadBalancer:
    - `kubectl get services`
    - Find your loadbalancer service and take it EXTERNAL-IP
    - now you can access it on EXTERNAL-IP
  - If your service type is NodePort:
    - `kubectl port-forward service/flink-jobmanager-rest 8081:8081`
    - now you can access it on localhost:8081

### Deployment of Job:

1. access your flink UI in browser
2. Choose tab `Submit New Job` (the latest one)
3. Push the button  `+ Add New`
4. Download WordCount.jar
5. After downloading tap on it and push `Submit`. It will start the job.

> OR

1. Make sure, that Flink is installed on your machine
   - visit https://nightlies.apache.org/flink/flink-docs-release-1.13/docs/try-flink/local_installation/

2. Deploy the job, using command:
   - ./bin/flink run \
      --detached \
      ./WordCount.jar


### Remove all the stuff
- Just run:
  - `cdk destroy`