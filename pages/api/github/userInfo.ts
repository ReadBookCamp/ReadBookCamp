import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.query;
  const data = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then((res) => res.json());
  console.log('data', data);
  console.log('LEARN_GH_TOKEN', process.env.LEARN_GH_TOKEN);

  res.status(200).json({
    data,
  });
};
