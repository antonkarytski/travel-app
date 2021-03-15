const AWS = require('aws-sdk');
const config = require('config')
const {Router} = require('express')
const fs = require('fs');

const router = Router()

const s3 = new AWS.S3({
    accessKeyId: process?.env?.AWS_ACCESS_KEY_ID || config.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: process?.env?.AWS_SECRET_ACCESS_KEY || config.get("AWS_SECRET_ACCESS_KEY")
});

const uploadFile = (fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: process?.env?.S3_BUCKET_NAME || config.get("S3_BUCKET_NAME"),
        Key: 'cat.jpg',
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};


router.post(
    '/setimage',
    async (req, res) => {

    }
)
