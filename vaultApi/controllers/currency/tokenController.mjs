// controllers/currency/tokenController.mjs
import tokenService from '../../services/currency/tokenService.mjs';
import mongoose from 'mongoose';

const tokenController = {
    getAllTokens: async (req, res) => {
        try {
            const tokenResponse = await tokenService.getAllTokens();
            res.status(200).json({data: tokenResponse});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
    getAllTokensShort: async (req, res) => {
        try {
            const tokenResponse = await tokenService.getAllTokensShort();
            res.status(200).json({data: tokenResponse});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
};

export default tokenController;
