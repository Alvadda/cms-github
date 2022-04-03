import { Request, Response } from 'express'
import axios from 'axios'

const USER = 'Alvadda'
const REPO = 'cms-github'
const DIR = 'content'

export const getContent = async (req: Request, res: Response) => {
  const result = await axios.get(`https://api.github.com/repos/${USER}/${REPO}/contents/${DIR}`)

  console.log(result.data)
  res.json(result.data)
}

export const getFile = async (req: Request, res: Response) => {
  const { file } = req.params
  const result = await axios.get(`https://raw.githubusercontent.com/${USER}/${REPO}/main/${DIR}/${file}.json`)

  console.log(result.data)
  res.json(result.data)
}
