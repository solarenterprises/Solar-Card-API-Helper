// controllers/wallet/balanceController.mjs
import balanceService from "../../services/wallet/balanceService.mjs";

// const token = 'eyJraWQiOiJmODAyNjg0OC1mNTJkLTRmYWYtOGQ2OS1hNTM0YTA3NmQwOTAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJodHRwczovL2V4Y2hhbmdlLnBpL2F1dGhvcml6YXRpb24vcm9sZXMiOlsiZXhwaTpwdG46OjEzOnJvbGUvY2xpZW50Il0sInN1YiI6IjJkMmUzZWRhLTg5OGQtNGZhOS1hNGNkLWVmMzJjMmFlZGRjYyIsImF1ZCI6Imh0dHBzOi8va3J5cHRvbml0Iiwic2NvcGUiOiJkZXBvc2l0X2NyeXB0bzpjcmVhdGUgdXNlcl9lbWFpbDpjcmVhdGUgdHJhbnNmZXI6cmVhZCBkZXBvc2l0X2Jhbms6Y3JlYXRlIGV4Y2hhbmdlOmNyZWF0ZSB3aXRoZHJhdzpyZWFkIHRyYW5zZmVyX293bjpjcmVhdGUgd2l0aGRyYXdfYmFuazpzaG93IHVzZXJfbWZhOnJlYWQgdG9wX3VwX2FjY291bnQ6c2hvdyBkZXBvc2l0OnJlYWQgdXNlcl9waG9uZTpjcmVhdGUgd2l0aGRyYXdfaXBzOnNob3cgd2l0aGRyYXdfYXRtX2djcF9xcjpzaG93IHdpdGhkcmF3X290aGVyX2FjY291bnQ6c2hvdyBjb3VudGVycGFydHk6Y3JlYXRlIHRvcF91cF9jcnlwdG86c2hvdyB0b3BfdXBfYXRtX2djcF9xcjpzaG93IHVzZXJfbWZhOmNyZWF0ZSB3aXRoZHJhd19hdG06Y3JlYXRlIHdpdGhkcmF3X2FjY291bnQ6c2hvdyB0cmFuc2Zlcl9vdGhlcjpjcmVhdGUgdG9wX3VwX2JhbmtfY2FyZDpzaG93IHVzZXJfZW1haWw6d3JpdGUgZGVwb3NpdF9hdG06Y3JlYXRlIGFjY291bnRzOnJlYWQgYWNjb3VudHM6Y3JlYXRlIGNhcmRob2xkZXJfdXNlcjpyZWFkIGV4Y2hhbmdlOnNob3cgYWNjb3VudHM6c2hvdyBleGNoYW5nZTpyZWFkIHdpdGhkcmF3X2NyeXB0bzpjcmVhdGUgd2l0aGRyYXdfYmFuazpjcmVhdGUgdXNlcl9waG9uZTp3cml0ZSB3aXRoZHJhd19jcnlwdG86c2hvdyBjYXJkaG9sZGVyX3VzZXI6d3JpdGUgY291bnRlcnBhcnR5OnJlYWQgdG9wX3VwX2Jhbms6c2hvdyIsImlzcyI6Imh0dHBzOi8va3J5cHRvbml0LWFwaS5zdGcuZGFya25ldC5waWVmaS5hcHAvcmVnIiwiZXhwIjoxNzM0MzkxNTM3LCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzM0MzA1MTM3LCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJqdGkiOiI4OTUyM2IyNS0zZjNlLTQwZTEtYjA5YS1jNGRjZTI5NWYwN2QifQ.GvkKQ46RufRqZydhs2Wjy1nM49q0ShLj-hFFcDSbVSHQBFFrfUoDBuykzEqgb5GhBDGS9ZkDX76UMBDYONy41L4rAEW4dMjJf16u6dRx5B7j23LM_u7_6vO0KG55INP_uxD-k_usI1pkfnm2hprujtOqxHPfkdkBFwmpom7yChVUu9Zljjr2XOLAiuZKiRF3lZb-rNMLW9nBZAWl0h9Z-vpYFBWJ6BW-v_HHCjlTP1AAuAOszMhvsir86WBjH0RUAGWPe-e2Bp-VamtT8mNGGF8TA8CdZLyus_lTG81T8fGP15yzbie57Kt-C0Rky3UrMZ9wR6FpUWCpHWPK3gB13BcRfMxGasglypa2DxubtzUDx00QkrBXEdKTEPExdc6bLfvCPx2YG157OsKGyfM0R76IqW_nhMxme5CK0JnkSYPDNv-_h3CHikpRHKbb7BQJl3jgI6KteTf5mum2A4ZET2p8gw24gOYCwd9NVB9IDP1lXB55gkujwHE9_8GJ2SXXivwcDJa5XpiibX_TlUC296OUI6j1lI0zPfFo6GssxRMByg-TRIgjZuz5U2rx8QySE9-XUACMrlLHw5JUR6WdTde19v6enWpHejRk2za98BeIAOTSiGOlMOobxosd6vG3RSEohD5kaf3L6v_pRnF08cvm72iIKKcHZfFYQnWxu1A'

const balanceController = {
    getAccountBalances: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accountId = req.query.accountId || null;
            const accountIds = req.query.accountIds || null;
            const currency = req.query.currency || null;
            const byDate = req.query.byDate || null;

            const addressDetailList = await balanceService.getAccountBalances(token, accountId, accountIds, currency, byDate);
            res.status(200).json({data: addressDetailList});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },
    
    touchBalanceForCurrency: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accountId = req.query.accountId || null;
            const currency = req.query.currency || null;

            if(!(accountId && currency)) {
                return res.status(400).json({result: "failed", message: "AccountId and currency are required"});
            }

            const touchBalance = await balanceService.touchBalanceForCurrency(token, accountId, currency);
            res.status(200).json({data: touchBalance});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getPagedBalance: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const accountIds = req.query.accountIds || null;
            const currency = req.query.currency || null;
            const from = req.query.from || null;
            const to = req.query.to || null;
            const direction = req.query.direction || null;
            const reasonType = req.query.reasonType || null;
            const search = req.query.search || null;
            const page = req.query.page || null;
            const size = req.query.size || null;

            const pagedBalance = await balanceService.getPagedBalance(token, accountIds, currency, from, to, direction, reasonType, search, page, size);
            res.status(200).json({data: pagedBalance});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },

    getBalanceLogById: async (req, res) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                // Return 401 if token is missing
                return res.status(401).json({ result: "failed", message: "Authentication token is missing." });
            }

            const logId = req.params.log_id || null;
            if(!logId) {
                return res.status(400).json({result: "failed", message: "LogId is required"});
            }

            const balanceLog = await balanceService.getBalanceLogById(token, logId);
            res.status(200).json({data: balanceLog});
        } catch (error) {
            console.log(error)
            res.status(500).json({result: "failed"});
        }
    },




};

export default balanceController;
