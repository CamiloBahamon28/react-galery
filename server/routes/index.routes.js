import {Router} from 'express'

const router = Router()

router.get('/', (req, res) => {
    return res.json({
        msg:'Welcome to api 0.1'
    })
});

export default router