const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const S3 = new AWS.S3({ signatureVersion: 'v4' }); // Create an instance of S3 using signatureVersion 4

var bucketName = 'pastexams.co.uk'; // send it over to S3
fs.readFile('cat.png', function(err, data) {
    if (err) throw err;
    var name = '0d26302f-f656-4590-8d71-437251250fd9';
    S3.createBucket({ Bucket: bucketName }, function() {
        var params = {
            Bucket: bucketName,
            Key: 'cats/' + name,
            Body: data,
            ContentType: 'image/png', // Set files content type to a png
            ACL: 'public-read' // Allow anyone to read
        };
        S3.putObject(params, function(err) { // Put the file on S3
            if (err) throw err;
            console.log('File: ' + name + ' Has succesfully been uploaded to S3');
        });
    })
});