import { Router } from 'express'
import { getContent, getFile } from '../controller/github.controller'

const router = Router()

router.get('/', getContent)
router.get('/:file', getFile)

export default router
