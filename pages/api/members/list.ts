import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('LEARN_GH_TOKEN', process.env.LEARN_GH_TOKEN);
  const data = await fetch(
    'https://raw.githubusercontent.com/ReadBookCamp/ReadBookCamp/master/data/latest.json',
  ).then((res) => res.json());
  res.status(200).json({
    members: data.members.filter((member: any) => {
      return !member.blocked_at;
    }),
  });
};
