import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class DemoEksStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const clusterAdmin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
      });

    const cluster = new eks.Cluster(this, 'sample-eks', {
      mastersRole: clusterAdmin,
      version: eks.KubernetesVersion.V1_21,
      clusterName: "demo-eks",
      defaultCapacity: 0
    });

    cluster.addNodegroupCapacity('extra-ng-spot', {
      instanceTypes: [
        new ec2.InstanceType('c5.large'),
        new ec2.InstanceType('c5a.large'),
        new ec2.InstanceType('c5d.large'),
      ],
      minSize: 3,
      capacityType: eks.CapacityType.SPOT,
    });
  }
}
