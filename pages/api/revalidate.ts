// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let pathToRevalidate = `/products/${req.body?.record?.slug || req.body?.old_record?.slug }`



await res.revalidate(pathToRevalidate);

return res.send({revalidated: true})
}
