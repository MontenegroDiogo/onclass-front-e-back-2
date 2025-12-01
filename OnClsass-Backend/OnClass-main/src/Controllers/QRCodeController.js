import QRCodeService from "../Services/QRCodeService.js";

class QRCodeController {
    static async criar(req, res) {
        try {
            const qr = await QRCodeService.criarQRCode(req.body);
            res.status(201).json(qr);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async listar(req, res) {
        res.json(await QRCodeService.listar());
    }

    static async buscar(req, res) {
        const qr = await QRCodeService.buscarPorId(req.params.id);
        if (!qr) return res.status(404).json({ error: "QR Code não encontrado" });
        res.json(qr);
    }

    static async atualizar(req, res) {
        const qr = await QRCodeService.atualizar(req.params.id, req.body);
        if (!qr) return res.status(404).json({ error: "QR Code não encontrado" });
        res.json(qr);
    }

    static async deletar(req, res) {
        const ok = await QRCodeService.deletar(req.params.id);
        if (!ok) return res.status(404).json({ error: "QR Code não encontrado" });
        res.json({ message: "QR removido" });
    }
}

export default QRCodeController;
