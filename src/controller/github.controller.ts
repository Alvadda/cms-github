import { Request, Response } from 'express'
import axios from 'axios'
import NodeCache from 'node-cache'
import { incrementRead } from '../services/stats.service'
const cache = new NodeCache({ stdTTL: 600, checkperiod: 300 })

const USER = 'Alvadda'
const REPO = 'cms-github'
const DIR = 'content'

const CK_DIR = 'CK_CONTENT'
const CK_FILE = 'CK_FILE_'

const generateCKFile = (fileName: string) => CK_FILE + fileName

const getFileNames = (dir: unknown) => {
  if (!Array.isArray(dir)) return null

  return dir.map((file) => file.name)
}

const getFromCach = async (key: string) => {
  if (!cache.has(key)) return null

  console.log(`Read data from cach: ${key}`)
  return cache.get(key)
}

export const getFiles = async (req: Request, res: Response) => {
  const data = await getFromCach(CK_DIR)
  if (data) {
    await incrementRead({ name: DIR, type: 'folder', from: 'cache' })
    const files = getFileNames(data)
    return res.json(files ?? data)
  }

  const result = await axios.get(`https://api.github.com/repos/${USER}/${REPO}/contents/${DIR}`)
  const dir = result.data
  cache.set(CK_DIR, dir)
  console.log('Folder from Github')
  await incrementRead({ name: DIR, type: 'folder', from: 'api' })

  const files = getFileNames(dir)
  return res.json(files ?? dir)
}

export const getFile = async (req: Request, res: Response) => {
  const { file } = req.params
  const cacheKey = generateCKFile(file)
  if (cache.has(cacheKey)) {
    const fileContent = cache.get(cacheKey)
    console.log(`File ${file} from Cache`)
    await incrementRead({ name: file, type: 'file', from: 'cache' })

    return res.json(fileContent)
  }

  const result = await axios.get(`https://raw.githubusercontent.com/${USER}/${REPO}/main/${DIR}/${file}`)

  cache.set(cacheKey, result.data)
  console.log(`File ${file} from Github`)
  await incrementRead({ name: file, type: 'file', from: 'api' })
  res.json(result.data)
}
