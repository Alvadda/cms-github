import { Router } from 'express'
import { getContent } from '../controller/github.controller'

const router = Router()

router.get('/', getContent)

export default router
