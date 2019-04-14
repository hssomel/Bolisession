module.exports = (req, res) => {
    const { 
        method, 
        originalUrl, 
        protocol, 
        ip, 
        body,
        params,
        query,
        headers
    } = req;
    console.log(`\n${method} "${originalUrl}" from ${protocol}://${ip}`);
    console.log(`req.body = `, body);
    console.log(`req.params = `, params);
    console.log(`req.query = `, query);
    console.log(`req.headers = `, headers);
};