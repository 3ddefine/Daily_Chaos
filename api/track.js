let players = new Set();

export default function handler(req, res) {
    const { id } = req.body;

    players.add(id);

    res.status(200).json({ ok: true });
}

export { players };
