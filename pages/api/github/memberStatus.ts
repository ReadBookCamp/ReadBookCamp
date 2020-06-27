import { NextApiRequest, NextApiResponse } from 'next';
import { Octokit } from '@octokit/rest';
import cookie from 'cookie';
import fetch from 'isomorphic-unfetch';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { gh_user_info } = cookie.parse(req.headers.cookie || '');
  const { login: name } = JSON.parse(gh_user_info);
  console.log('LEARN_GH_TOKEN', process.env.LEARN_GH_TOKEN);
  const octokit = new Octokit({
    auth: process.env.LEARN_GH_TOKEN,
    userAgent: 'ReadBookCamp',
  });
  const members = await octokit.paginate(octokit.orgs.listMembers, {
    org: 'ReadBookCamp',
  });
  const exists = members.some((member) => {
    return member.login === name;
  });

  const { members: membersFromGit } = await fetch(
    'https://raw.githubusercontent.com/ReadBookCamp/ReadBookCamp/master/data/latest.json',
  ).then((res) => res.json());
  const blocked = membersFromGit.some((member: any) => {
    return member.name === name && member.blocked_at;
  });

  res.status(200).json({
    data: { exists, blocked, name, membersCount: members.length },
  });
};
