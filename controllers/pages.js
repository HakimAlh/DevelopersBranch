const home = (req, res) => {
    res.render('index.ejs' , {title: 'DevelopersBranch'})
}

module.exports = {
    home,
}