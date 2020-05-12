exports.test = (req, res) => {
    return res.status(200).json({
        message: 'Return successful'
    });
}

exports.post = (req, res) => {
    console.log(req.body);
    
    return res.status(200).json({
        message: 'Post OK!',
        data: req.body
    });
}