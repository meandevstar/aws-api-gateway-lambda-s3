var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder(),
    aws = require('aws-sdk'),
    Q = require("q"),
    uuid = require('node-uuid');


module.exports = api;
    
    

api.post('/', function (request) {

    return request;

    return Q.promise(function(resolve, reject) {

        var key = request.post.s3_key;
        var bucket = request.post.s3_bucket;
        var file_name = request.post.file_name;
        var file_type = request.post.file_type;

        var urlPrefix = 'https://s3.amazonaws.com/' + bucket + '/';
        var fileName = uuid.v1() + file_name.substring(file_name.indexOf('.'), file_name.length);

        var filePath = key !== undefined ? key + '/' + fileName : filename;
        
        aws_config = {
            accessKeyId:            process.env.ACCESS_KEY_ID,
            secretAccessKey:        process.env.SECRET_ACCESS_KEY,
            region:                 process.env.REGION,
            signatureVersion:       'v4'
        };
        
        var s3 = new aws.S3(aws_config); 

        var params = {
            Bucket: bucket,
            Key: filePath, 
            Expires: 60*60,
            ACL: 'public-read',
            ContentType: file_type
        };

        s3.getSignedUrl('putObject', params, function(err, url) {

            if(err) {
                console.log("ERROR MSG: ", err);
                reject(err);
            } else {
                console.log("Successfully uploaded data");
                console.log(url);

                var result = {
                                'oneTimeUploadUrl': url,
                                'resultUrl': urlPrefix + filePath
                            }
                                
                resolve(result);
            }
        });
    });
});
