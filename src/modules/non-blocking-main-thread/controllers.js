const test = async (req, res) => {
    try {
        res.status(200).json({ message: 'test done' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    test
}