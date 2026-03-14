// In-memory set of unique player IDs
let players = new Set();

module.exports = (req, res) => {
    if (req.method === "POST") {
        const { id } = req.body || {};

        if (id) {
            players.add(id);
        }

        return res.status(200).json({ ok: true });
    }

    if (req.method === "GET") {
        return res.status(200).json({ dau: players.size });
    }

    res.status(405).end();
};
