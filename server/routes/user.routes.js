const {Router} = require('express')
const router = Router()
const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('config')
const {nanoid} = require('nanoid')


const s3 = new AWS.S3({
    //accessKeyId: process?.env?.AWS_ACCESS_KEY_ID || config.get("AWS_ACCESS_KEY_ID"),
    accessKeyId: "AKIAW53ZZJKHYBET62MT",
    //secretAccessKey: process?.env?.AWS_SECRET_ACCESS_KEY || config.get("AWS_SECRET_ACCESS_KEY")
    secretAccessKey: "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",
});


router.post(
    '/upd',
    async (req, res) => {
        const {
            image,
            imgType,
            name
        } = req.body

        const newFilename = nanoid()+"."+imgType
        const params = {
            //Bucket: process?.env?.S3_BUCKET_NAME || config.get("S3_BUCKET_NAME"),
            Bucket: config.get("S3_BUCKET_NAME"),
            Key: newFilename,
            Body: image.data_url
        };
        s3.upload(
            params,
            function (err, data) {
                if (err) {
                    console.log(err)
                    res.status(500).json({message: "Image uploading error"})
                    throw err;
                }
                res.json({message: 'success', fileName:newFilename});
            })

    }
)


module.exports = router