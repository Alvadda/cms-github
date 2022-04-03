import { Request, Response } from 'express'
import axios from 'axios'
import NodeCache from 'node-cache'
const cache = new NodeCache({ stdTTL: 600, checkperiod: 300 })

const USER = 'Alvadda'
const REPO = 'cms-github'
const DIR = 'content'

const CK_DIR = 'CK_CONTENT'
const CK_FILE = 'CK_FILE_'

const generateCKFile = (fileName: string) => CK_FILE + fileName

export const getContent = async (req: Request, res: Response) => {
  if (cache.has(CK_DIR)) {
    const dir = cache.get(CK_DIR)
    console.log('Folder from Cache')
    return res.json(dir)
  }

  const result = await axios.get(`https://api.github.com/repos/${USER}/${REPO}/contents/${DIR}`)

  cache.set(CK_DIR, result.data)
  console.log('Folder from Github')
  res.json(result.data)
}

export const getFile = async (req: Request, res: Response) => {
  const { file } = req.params
  const cacheKey = generateCKFile(file)
  if (cache.has(cacheKey)) {
    const file = cache.get(cacheKey)
    console.log('File from Cache')
    return res.json(file)
  }

  const result = await axios.get(`https://raw.githubusercontent.com/${USER}/${REPO}/main/${DIR}/${file}.json`)

  cache.set(cacheKey, result.data)
  console.log('File from Github')
  res.json(result.data)
}
