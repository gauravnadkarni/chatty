import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res:NextApiResponse) {
    if(req.method === "POST") {
        var cookies = cookie.parse(req.headers.cookie || '');
        if(cookies.session_token) {
            return res.status(200).json({message: 'Authenticated', userId:123456});
        }
        return res.status(401).json({message: 'Not Authenticated'});
    }
    return res.status(400).json({error: "method not supported"});
}