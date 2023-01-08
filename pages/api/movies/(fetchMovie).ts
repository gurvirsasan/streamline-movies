// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiResponse } from 'next';

const API_BASE_URL = 'http://www.omdbapi.com/';

export default async function fetchMovie(
  res: NextApiResponse,
  name: string | undefined,
  searchType: 'i' | 't' | 's'
) {
  const apiKey = process.env.API_KEY;

  const movieResponse = await axios.get(API_BASE_URL, {
    params: {
      apiKey: apiKey,
      [searchType]: name,
    },
  });

  if (movieResponse.status !== 200 || movieResponse.data.response === 'False')
    return movieResponse.data.error
      ? res.status(400).json(movieResponse.data.error)
      : res.status(movieResponse.status).json('Movie not found.');

  return res.status(200).json(movieResponse.data);
}
