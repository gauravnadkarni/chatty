import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res:NextApiResponse<{signIn:boolean} | {}>) {
    if(req.method === "POST") {
        res.setHeader('Set-Cookie', cookie.serialize('session_token', "GHJGFGOKIBHBFHF745JHVDJ", {
            httpOnly: true,
            maxAge: 30
        }));
        return res.status(200).json({userId: 123456});
    }
    return res.status(400).json({error: "method not supported"});
}