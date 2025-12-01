import QRCode from "../Models/QRCode.js";

class QRCodeService {
    static async criarQRCode(data) {
        return await QRCode.create(data);
    }

    static async listar() {
        return await QRCode.findAll();
    }

    static async buscarPorId(id) {
        return await QRCode.findByPk(id);
    }

    static async atualizar(id, data) {
        const qr = await QRCode.findByPk(id);
        if (!qr) return null;
        return await qr.update(data);
    }

    static async deletar(id) {
        const qr = await QRCode.findByPk(id);
        if (!qr) return null;
        await qr.destroy();
        return true;
    }
}

export default QRCodeService;
