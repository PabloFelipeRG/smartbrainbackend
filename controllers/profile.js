const handleProfileGet = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else
                throw e;
        })
        .catch(err => {
            res.status(404).json("None user has been found!");
        });
};

module.exports = {
    handleProfileGet: handleProfileGet
};