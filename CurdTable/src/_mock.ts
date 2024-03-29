import { Request, Response } from 'express';

const getMockName = (method: string, path = '') => `${method} /api/PAGE_NAME_UPPER_CAMEL_CASE${path}`
const $success = (data: any = {}, msg: string = '') => ({
  data,
  msg,
  code: 1
})

export default {
  [getMockName('GET')]: (req: Request, res: Response) => {
    res.send($success([]));
  },
};
