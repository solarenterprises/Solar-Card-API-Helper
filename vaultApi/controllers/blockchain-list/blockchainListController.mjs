// controllers/blockchain-list/blockchainListController.mjs
import blockchainListService from "../../services/blockchain-list/blockchainListService.mjs";

const blockchainListController = {
    getBlockchainList: async (req, res) => {
        try {
            const chainList = await blockchainListService.getBlockchainList();
            res.status(200).json({data: chainList});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    }
};

export default blockchainListController;
