const {Router} = require('express')
const router = Router()
const AWS = require('aws-sdk');
const {nanoid} = require('nanoid')
const multer = require('multer')
const config = require('config')
const User = require('../models/User')


const s3 = new AWS.S3({
    accessKeyId: process?.env?.AWS_ACCESS_KEY_ID || config.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: process?.env.AWS_SECRET_ACCESS_KEY || config.get('AWS_SECRET_ACCESS_KEY'),
});

const upload = multer()

router.post(
    '/upd',
    upload.single('image'),
    async (req, res) => {

        const {
            file,
            body
        } = req
        const resData = {
            name: body.name
        }
        const update = {
            name: body.name,
        }
        try {
            if (file) {
                const newFilename = nanoid() + file.originalname
                const params = {
                    Bucket: config.get("S3_BUCKET_NAME"),
                    Key: newFilename,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                    ContentEncoding: 'base64'
                };

                await s3.putObject(params, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(data)
                    }
                })
                update.image = newFilename
                resData.image = newFilename
            }

            await User.findOneAndUpdate(
                {_id: body.id},
                {
                    $set: update
                }, (err) => {console.log(err)})

            resData.messageLoad = 'loadSuccess'
            res.status(201).json({...resData, message: "You successfully registered"})
        } catch (err) {
            res.status(500).json({message: "Image uploading error", err})
        }
    })


module.exports = router