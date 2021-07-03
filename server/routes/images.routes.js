import {Router} from 'express'

const router = Router()

router.post('/api/images/upload', async (req, res)=>{
    
    const { file } = req.files;
    console.log(file);

    return res.json('received')
})//subir una imagen al servidor

router.get('/api/images', async (req, res)=>{})//para listar todas la imagenes guardadas en la BD y en donde esta guardada

router.get('/api/images/:id', async (req, res)=>{})//para obtener la info de una sola imagen

router.delete('/api/images/:id', async (req, res)=>{})//eliminar una imagen apartir de un id

export default router