import { Router } from 'express'
import { getItem, getItems } from '../controllers/items.controller'

const router = Router()

router.get('/getItems', getItems)
router.get('/getItem/:id', getItem)

export default router