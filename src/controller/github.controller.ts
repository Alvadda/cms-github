import { Request, Response } from 'express'

export const getContent = async (req: Request, res: Response) => {
  res.json({ test: 'ok' })
}
