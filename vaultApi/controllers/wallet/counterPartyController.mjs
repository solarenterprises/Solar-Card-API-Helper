// controllers/wallet/counterPartyController.mjs
import counterPartyService from "../../services/wallet/counterpartyService.mjs";

const counterPartyController = {
    getCounterPartyById: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const counterPartyId = req.query.counterParty_id || null;

            if(!counterPartyId) {
                return res.status(400).json({result: "failed", message: "CounterParty uuid is required"});
            }

            const counterParty = await counterPartyService.getCounterPartyById(token, counterPartyId);
            res.status(200).json({data: counterParty});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
    
    createNewCounterPartyForCrypto: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const { id, type, rail, currency, institutionName, institutionAddress, description, profile, blockchain, blockchainAddress, walletType } = req.body;

            if (!type || !rail || !profile || !profile.profileType || !profile.name || !profile.relationshipToCustomer || !blockchain || !blockchainAddress || !walletType) {
                return res.status(400).json({ result: "failed", message: "All fields are required" });
            }

            const newCounterParty = await counterPartyService.createNewCounterPartyForCrypto(token, {id, type, rail, currency, institutionName, institutionAddress, description, profile, blockchain, blockchainAddress, walletType})

            res.status(200).json({ data: newCounterParty });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    createNewCounterPartyForACH: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const { id, type, rail, currency, institutionName, institutionAddress, description, profile, routingNumber, accountNumber } = req.body;

            if (!type || !rail || !profile || !profile.profileType || !profile.name || !profile.relationshipToCustomer || !accountNumber ) {
                return res.status(400).json({ result: "failed", message: "All fields are required" });
            }

            const newCounterParty = await counterPartyService.createNewCounterPartyForACH(token, {id, type, rail, currency, institutionName, institutionAddress, description, profile, routingNumber, accountNumber})

            res.status(200).json({ data: newCounterParty });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    createNewCounterPartyForFedwire: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const { id, type, rail, currency, institutionName, institutionAddress, description, profile, routingNumber, accountNumber } = req.body;

            if (!type || !rail || !profile || !profile.profileType || !profile.name || !profile.relationshipToCustomer || !routingNumber || !accountNumber ) {
                return res.status(400).json({ result: "failed", message: "All fields are required" });
            }

            const newCounterParty = await counterPartyService.createNewCounterPartyForFedwire(token, {id, type, rail, currency, institutionName, institutionAddress, description, profile, routingNumber, accountNumber})

            res.status(200).json({ data: newCounterParty });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    createNewCounterPartyForSwift: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const { id, type, rail, currency, institutionName, institutionAddress, description, profile, swiftBic, accountNumber, intermediary } = req.body;

            if (!type || !rail || !profile || !profile.profileType || !profile.name || !profile.relationshipToCustomer || !accountNumber ) {
                return res.status(400).json({ result: "failed", message: "All fields are required" });
            }

            const newCounterParty = await counterPartyService.createNewCounterPartyForSwift(token, {id, type, rail, currency, institutionName, institutionAddress, description, profile, swiftBic, accountNumber, intermediary})

            res.status(200).json({ data: newCounterParty });
            
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
};

export default counterPartyController;
