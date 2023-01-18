import { withIronSessionApiRoute } from 'iron-session/next';
import { NextApiRequest, NextApiResponse } from 'next';
import { monCompteProAuthorizeUrl } from '#clients/auth/mon-compte-pro/strategy.ts';
import { sessionOptions } from '#utils/session';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const url = await monCompteProAuthorizeUrl();
  res.redirect(url);
}
