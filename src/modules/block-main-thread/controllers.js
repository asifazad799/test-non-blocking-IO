const { blockv3 } = require("./operations");

const block = async (req, res) => {
    try {
        const result = await blockv3(req.query.loop);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    block
}