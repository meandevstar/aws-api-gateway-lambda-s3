# Simple AWS Lambda script for uploading image to the S3.

Create lambda function by `claudia` cli and test it.

## Setting up AWS
1. create credentials files in the `.aws` directory of your root.
Open terminal by `⌘ + space` => terminal
and run the command below:
```
mkdir ~/.aws
touch ~/.aws/credentials
```
2. Open that file you created(credentials), set your aws access key and secret key.

open file by this command:
`open ~/.aws/credentials`

and modify it as below:

```
[default]
aws_access_key_id = <YOUR AWS ACCESS KEY HERE>
aws_secret_access_key = <YOUR AWS SECRET ACCESS KEY HERE>
```

## Permissions

### User Permissions
```
AWSLambdaFullAccess, IAMFullAccess, AmazonS3FullAccess, AmazonAPIGatewayAdministrator
```

### S3 Bucket  CORS Configuration
When we upload an image to AWS S3 Bucket, we have to enable it's CORS Option.
Go to Bucket `Properties` on S3 Console, on the `Permissions` category, just click `Edit CORS Configuration`.
Feel the form like this:

```
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>HEAD</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>

```

## Install Dependancy
run `npm install`

## Install Claudia
run  `npm install -g claudia`

## Create our Lambda script in the cloud
Here we are creating a lambda function, as well as creating an API in the AWS API Gateway.

To create our lambda function, run this:
`claudia create --name aws-lambda-s3 --region us-east-1 --api-module app --profile default`

1. The **--name** option is to set your Lambda function name. You can check this in your AWS Lambda console.
2. The **--region** option is the resion where you will deploy your stuff to. In my case I used `us-east-1` for my location.
3. The **--api-module** option is the name of the module that contains Lambda api. In my case just the `app.js`
4. The **--profile** option is for authenticating AWS. As we saved our AWS credentials in **credentials** with profile `[default]`, it will be `default` in our case. 


When you put this into **package.json** file:
```
"scripts": {
    "claudia:create" : "claudia create --name aws-lambda-s3 --region us-east-1 --api-module app --profile default"
}
```
It can be made simple as below:
`npm run claudia:create`

## Update our Lambda script in the cloud
When we need to update our script in the cloud, we change the code in the `app.js`, and run `claudia update --profile default`
Of course, this can be made simple something like `npm run claudia:update`, if you put this into **package.json** file.


## Testing
Since we are not allowed to send multipart file request to the AWS api Gateway, just had a jQuery upload code here.
You can test our lambda working with running `front/index.html` in the browser.

And upload code is in the `front/js/main.js`


**Before testing, please change the url** in the `front/js/main.js` with our deployed url.

After we create the Lambda Function successfully, there will be made a `claudia.json` file in the project. 

We can get app_id from there and make `deployed url` like this: `https://{app_id}.execute-api.{deployed region}.amazonaws.com/latest`

`ex: https://h20xvr37l5.execute-api.us-east-1.amazonaws.com/latest`


## Quick Start

First, **Setting up AWS** and set up **Permissions**
and then

1. run `npm install -g claudia`
2. run `npm install`
3. run `npm run claudia:create`
4. copy printed url in the console and change the url in the `front/js/main.js` file.
5. run `front/index.html` and test uploading.



