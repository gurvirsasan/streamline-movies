import type { NextApiRequest, NextApiResponse } from 'next';
import fetchMovie from '../(fetchMovie)';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name }: any = req.query;

  fetchMovie(res, name, 't');
}
