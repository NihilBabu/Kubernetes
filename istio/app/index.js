var http = require("http");
const port = process.env.PORT || 3000

const upstram_uri = process.env.UPSTREAM_URI || 'http://time.jsontest.com/'
const service_name = process.env.SERVICE_NAME || 'test-1-v1'

const express = require('express')
const app = express()
const request = require('request-promise-native')


app.get('/',async (req, res) => {

    const begin = Date.now()

    const headers = createIssues(req,res)

    let up
    try {
        up = await request({
            url: upstram_uri,
            headers: headers
        })
    } catch (error) {
        up =error
    }

    const timeSpend = (Date.now() -begin)/1000 +"secs"

    res.end(`${service_name} - ${timeSpend}\n ${upstram_uri} -> ${up}`)

})


app.listen(port, ()=>{
    console.log(`${service_name} listing on port ${port}!`)
})


function createIssues(req, res) {
    const failPercent = Number(req.header('fail')) || 0
    console.log(`failPercentage: ${failPercent}`)

    if(Math.random()<failPercent){
        res.status(500).end()
    }

    const headers = Object.assign({'fail': failPercent}, forwardTraceHeaders(req))

    return headers

    function forwardTraceHeaders(req){

        incoming_headers = [
            'x-request-id',
            'x-b3-traceid',
            'x-b3-spanid',
            'x-b3-parentspanid',
            'x-b3-sampled',
            'x-b3-flags',
            'x-ot-span-context',
            'x-dev-user',
            'foo'
        ]
        const headers = {}

        for(let h of incoming_headers){
            if(req.header(h))
                headers[h] = req.header(h)
        }
        return headers
    }
}