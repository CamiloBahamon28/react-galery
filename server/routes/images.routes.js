import {Router} from 'express'
import AWS from 'aws-sdk'
import config from '../config'

const router = Router()

const spacesEndpoint = new AWS.Endpoint(config.Endpoint)

const s3 = new AWS.S3({
    endpoint: spacesEndpoint
});

router.post('/api/images/upload', async (req, res)=>{
    
    const { file } = req.files;
    console.log(file);

    try {
       const uploadObject =  await s3.putObject({
            ACL:'public-read',//permisos con los que se sube el archivo
            Bucket: config.BucketName, //en que carpeta se subira el archivo
            Body: file.data, // archivo que se esta subiendo
            Key: file.name //nombre al archivo que se sube
        }).promise()

        const urlImages = `https://${config.BucketName}.${config.Endpoint}/${file.name}`
        console.log(urlImages)
    } catch (error) {
        console.log(error);
        res.send(error)
    }

    return res.json('received')
})//subir una imagen al servidor

router.get('/api/images', async (req, res)=>{})//para listar todas la imagenes guardadas en la BD y en donde esta guardada

router.get('/api/images/:id', async (req, res)=>{})//para obtener la info de una sola imagen

router.delete('/api/images/:id', async (req, res)=>{})//eliminar una imagen apartir de un id

export default router