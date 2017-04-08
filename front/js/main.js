$(document).ready(function () {
    $('#s3_bucket').val('ilanlyfe');
    $('#s3_key').val('images');

    // Service URL to get the s3 put signed URL. 
    // After the Lambda function created, change this url to trigger that lambda function. 
    var url = 'https://nrfge9lji7.execute-api.us-east-1.amazonaws.com/latest'; 
    
    $('#file-form').fileupload({
        autoUpload: false,
        type: 'PUT',
        multipart: false,
        beforeSend: function (xhr, data) {
          xhr.setRequestHeader('Content-Disposition', '');
        },
        limitConcurrentUploads: 1,
        add: function (e, data) {
          
          // Get the signed URL from our Lambda-backed API Gateway
          var params = {
            file_name: data.files[0].name,
            file_type: data.files[0].type,
            s3_bucket: $('#s3_bucket').val(),
            s3_key: $('#s3_key').val()
          };

          $.post(url, params, function (result) {
            if (!result.errorMessage) {

                // Set the upload URL with new signed URL
                data.url = result.oneTimeUploadUrl;
                data.contentType = data.files[0].type;
                data.resultUrl = result.resultUrl;
                
                // Upload the file to the new signed URL
                data.submit();
            } else {
                alert(result.errorMessage);
            }
          }, 'json');
        },

        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            $('#progress .bar').css('width', progress + '%');
        },

        done: function (e, data) {
            $('#output img').replaceWith('<img src="' + data.resultUrl + '" class="preview"/>');
            $('#output-url-pane').css('display', 'block');
            $('#output-url').attr('value',data.resultUrl);
        }
    });
}); 