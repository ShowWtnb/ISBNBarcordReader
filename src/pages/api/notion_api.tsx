// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
    // res: NextApiResponse<Data>
) {

    if (req.method === 'POST') {
        // console.log('notion_api', req)
        // console.log('notion_api headers', req.headers)
        // console.log('notion_api body', req.body)
        // console.log('notion_api', req.headers["Notion-Version"])

        var result = fetch(`https://api.notion.com/v1/pages`, {
            "headers": {
                "accept": "application/json",
                "Authorization": `${req.headers.authorization}`,
                "Content-Type": `application/json`,
                "Notion-Version": `2022-06-28`,
                // "Access-Control-Allow-Origin": `*`,
            },
            "method": "POST",
            "body": JSON.stringify(req.body)
        });
        result.then((result) => {
            if (result.status != 200) {
                console.log('notion_api Error', result.status, result.statusText);
                // console.log('notion_api Error', result.body);
                const string = new Response(result.body).text();
                string.then((text) => {
                    // console.log('notion_api Error', text);
                    // console.log('notion_api Error', JSON.parse(text));
                    res.status(result.status).json(JSON.parse(text))
                    return;
                });

                // res.status(result.status).json(result.body)
                // return;
            }else{
                res.status(result.status).json(result.body)

                return;
            }
        });
    } else if (req.method === 'GET') {
        res.status(200).json({ 'test': 'test body' })
    }

}
