import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXT_PUBLIC_BASE_URL + '/api/google-drive-callback'
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    const { tokens } = await client.getToken(code as string);
    res.redirect(`/?access_token=${tokens.access_token}`);
  } catch (error) {
    console.error('Error getting Google tokens:', error);
    res.redirect('/?error=google_auth_failed');
  }
}