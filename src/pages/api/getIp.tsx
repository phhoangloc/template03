import { NextApiRequest, NextApiResponse } from 'next';

const ipRestriction = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const allowedIPs = ['192.168.1.1'];

    const clientIP: string | string[] | undefined = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.status(200).json(clientIP);

}

export default ipRestriction

// export default function ipRestriction(req: NextApiRequest, res: NextApiResponse, next: Function) {
//     const clientIP: string | string[] | undefined = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

//     // if (!allowedIPs.includes(clientIP && clientIP)) {
//     //     return res.status(403).send('Forbidden');
//     // }

//     // next();

//     res.status(200).json({ ip: clientIP });
// }