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
        const resData = {}
        const newFilename = nanoid() + file.originalname
        const params = {
            Bucket: config.get("S3_BUCKET_NAME"),
            Key: newFilename,
            Body: file.buffer,
            ContentType: file.mimetype,
            ContentEncoding: 'base64'
        };
        try {
            await s3.putObject(params, function(err, data){
                if(err) {console.log(err)
                }else {
                    console.log(data)
                }
            })
            console.log({
                name: body.name,
                image: newFilename,
                _id: body.id
            })
            await User.findOneAndUpdate(
                {_id: body.id},
                {
                    $set: {
                        name: body.name,
                        image: newFilename,
                    }
                })

            resData.image = newFilename
            resData.name = body.name
            resData.messageLoad = 'loadSuccess'
            res.status(201).json({...resData, message: "You successfully registered"})
        } catch (e) {
            res.status(500).json({message: "Image uploading error", err: e})
        }
    })


module.exports = router