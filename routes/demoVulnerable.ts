import { type Request, type Response, type NextFunction } from 'express'

import * as models from '../models/index'

export function demoVulnerable () {
  return (req: Request, res: Response, next: NextFunction) => {
    const name = String(req.query.name ?? '')
    models.sequelize.query('SELECT * FROM Products WHERE name = ?', { replacements: [name] })
      .then(([products]: any) => {
        res.json({ products })
      })
      .catch(next)
  }
}
