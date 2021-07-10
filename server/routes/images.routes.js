import { Router } from 'express'
import AWS from 'aws-sdk'
import config from '../config'
import Image from '../models/image'

const router = Router()

const spacesEndpoint = new AWS.Endpoint(config.Endpoint)

const s3 = new AWS.S3({
    endpoint: spacesEndpoint
});

router.post('/api/images/upload', async (req, res) => {

    const { file } = req.files;
    console.log(file);

    try {
        await s3.putObject({
            ACL: 'public-read',//permisos con los que se sube el archivo
            Bucket: config.BucketName, //en que carpeta se subira el archivo
            Body: file.data, // archivo que se esta subiendo
            Key: file.name //nombre al archivo que se sube
        }).promise()

        const urlImage = `https://${config.BucketName}.${config.Endpoint}/${file.name}`

        const image = new Image({
            url: urlImage,
            key: file.name,
            title: req.body.title,
        });

        await image.save();
        return res.json(image)
    } catch (error) {
        console.log(error);
        res.send(error)
    }

})//subir una imagen al servidor

router.get('/api/images', async (req, res) => { })//para listar todas la imagenes guardadas en la BD y en donde esta guardada

router.get('/api/images/:id', async (req, res) => { })//para obtener la info de una sola imagen

router.delete('/api/images/:id', async (req, res) => { })//eliminar una imagen apartir de un id

export default router