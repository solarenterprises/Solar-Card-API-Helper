import ky from 'ky';
import config from '../../config/config.mjs';

// Initialize ky instance
const kyInstance = ky.create({
    prefixUrl: config.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        partnerId: config.PARTNER_ID,
    },
});

const transactionService = {
    createCurrencyPayIn: async (token, dryRun, data) => {
        try {
            const queryParams = new URLSearchParams();
            if(dryRun) queryParams.append("dryRun", dryRun);

            const payload = {
                ...(data.account && {account: data.account}),
                ...(data.fromCurrency && {fromCurrency: data.fromCurrency}),
                ...(data.toCurrency && {toCurrency: data.toCurrency}),
                ...(data.fromAmount && {fromAmount: data.fromAmount}),
                ...(data.signedRate && {
                    signedRate: {
                        rate: data.signedRate.rate,
                        ...(data.signedRate.rateRequest && {
                            rateRequest: {
                                fromCurrency: data.signedRate.rateRequest.fromCurrency,
                                toCurrency: data.signedRate.rateRequest.toCurrency,
                                amount: data.signedRate.rateRequest.amount,
                                ...(data.signedRate.rateRequest.account && {
                                    account: data.signedRate.rateRequest.account
                                }),
                                ...(data.signedRate.rateRequest.partner && {
                                    partner: data.signedRate.rateRequest.partner
                                }),
                            }
                        }),
                        ...(data.signedRate.feeConfig && {
                            feeConfig: {
                                ...(data.signedRate.feeConfig.feePercent && {
                                    feePercent: data.signedRate.feeConfig.feePercent
                                }),
                                ...(data.signedRate.feeConfig.feeFixed && {
                                    feeFixed: data.signedRate.feeConfig.feeFixed
                                }),
                                ...(data.signedRate.feeConfig.feeMin && {
                                    feeMin: data.signedRate.feeConfig.feeMin
                                }),
                                ...(data.signedRate.feeConfig.feeMax && {
                                    feeMax: data.signedRate.feeConfig.feeMax
                                }),
                            }
                        }),
                        ...(data.signedRate.validUntil && {
                            validUntil: data.signedRate.validUntil
                        }),
                        ...(data.signedRate.signature && {
                            signature: data.signedRate.signature
                        })
                    }
                }),
            }

            const response = await kyInstance.post(`payin?${queryParams.toString()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                json: payload
            })

            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error);
            throw new Error("Create an Currency PayIn");
        }
    }
}


export default transactionService;