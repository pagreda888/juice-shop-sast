import { type Request, type Response, type NextFunction } from 'express'

import * as models from '../models/index'

export function demoVulnerable () {
  return (req: Request, res: Response, next: NextFunction) => {
    const expression = String(req.query.expression ?? '')
    const result = eval(expression)
    models.sequelize.query(`SELECT * FROM Products WHERE name = '${expression}'`)
      .then(([products]: any) => {
        res.json({ result, products })
      })
      .catch(next)
  }
}
