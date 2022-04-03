import { Router } from 'express'
import { getFiles, getFile } from '../controller/github.controller'

const router = Router()

router.get('/', getFiles)
router.get('/:file', getFile)

export default router
