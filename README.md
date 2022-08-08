# Welcome to Demo CDK TypeScript project

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
  - `aws configure`
1. To Install aws cdk, use the universall installation method:
   - `npm install -g aws-cdk`
### Description:
- This project was generated with the help of INIT command in typescript language
- The code of all the resoutces can be found in the lib directory
### Deployment:
1. Compile the typescript files to js-files:
   - `npm run build`
2. The following command will generate the CloudFormation Template based on the code, that is defined in Stack:
   - `cdk synth`
   - the result will be shown in terminal in YAML format
   - the result is also saved in cdk.out in JSON format for actual deployment
3. Before deployment create all the necessary CDK assets in AWS:
   - `cdk bootstrap`
4. Provision the cloud resources:
   - `cdk deploy`


## HELLO-KUBERNETES
### Deployment of Hello-Kubernetes Chart:
1. enter helm-directory:
   - `cd helm`
2. change the configuration fo helm template, if you wish in values.yaml file
3. make sure you have access to the Kubernetes cluster
4. Deploy Hello Kubernetes Chart to the Cluster:
   - the following command will deploy the chart for the first time:
     - `helm install <the_name_of_release> ./hello-kubernetes`
   - the following command will updated the chart, if it has been already deployed:
     - `helm ls` - to get the name of hello-kubernetes release
     - `helm update <the_name_of_release> ./hello-kubernetes`
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
     - `helm install <the_name_of_release> ./flink`
   - the following command will updated the chart, if it has been already deployed:
     - `helm ls` - to get the name of hello-kubernetes release
     - `helm update <the_name_of_release> ./flink`
### Access to the Flink Cluster: 
- How to access hello-kubernetes from the browser
  - If your service type is LoadBalancer:
    - `kubectl get services`
    - Find your loadbalancer service and take it EXTERNAL-IP
    - now you can access it on EXTERNAL-IP
  - If your service type is NodePort:
    - `kubectl get services`
    - Find your nodeport service and take it Name
    - `kubectl port-forward service/<service_name> 8081:8081`
    - now you can access it on localhost:8081
### Deployment of Job:
1. access your flink UI in browser
2. Choose tab Submit New Job (the latest one)
3. Push the button "+ Add New"
4. Download WordCount.jar
5. After downloading tap on it and push "Submit". It will start the job.