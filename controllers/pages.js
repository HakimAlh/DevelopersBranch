const home = (req, res) => {
    res.render('index.ejs' , {title: 'DevsBranch'})
}

module.exports = {
    home,
}