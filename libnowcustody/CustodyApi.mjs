import axios from "axios";

class CustodyApi {
  constructor(apiKey, apiURL) {
    this.apiURL = apiURL ? apiURL : "https://api.changenow.io/v2";
    this.apiKey = apiKey ? apiKey : "";
    this.headers = {
      "Content-Type": "application/json",
      // Add Authorization header if required
    };
    
    this.accessToken = null;
    this.refreshToken = null
  }

  axiosCustodyGet = (action, body, _header) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/${action}`, {
          params: body,
          headers: {
            "x-changenow-api-key": this.apiKey,
            ..._header
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  axiosCustodyPost = (action, body, _header) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.apiURL}/${action}`, body, {
          headers: {
            "x-changenow-api-key": this.apiKey,
            ..._header
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // custody apis
  // custody Authorization apis
  async PostLogin(login, password) {
    const res = await this.axiosCustodyPost("auth", {
      login,
      password,
    });
    this.accessToken = res.accessToken;
    this.refreshToken = res.refreshToken;
    return res;
  }
  // custody auth apis
  async PostRefreshToken(refreshToken) {
    const res = await this.axiosCustodyPost("auth/refresh", {
      refreshToken
    });
    this.accessToken = res.accessToken;
    this.refreshToken = res.refreshToken;
    return res;
  }
  // custody Deposit apis
  async GetListAvailablePairs({
    fromCurrency,
    toCurrency,
    fromNetwork,
    toNetwork,
    flow,
  }) {
    const res = await this.axiosCustodyGet("exchange/available-pairs", {
      fromCurrency,
      toCurrency,
      fromNetwork,
      toNetwork,
      flow,
    });
    return res.status;
  }
  GetListAvailableCurrencies = async ({
    active,
    flow = 'standard',
    buy,
    sell,
  }) => {
    const res = await this.axiosCustodyGet("exchange/currencies", {
      active,
      flow,
      buy,
      sell,
    });
    return res;
  }
  GetMinimalDepositAcmount = async ({
    fromCurrency,
    toCurrency,
    fromNetwork,
    toNetwork,
    flow,
  }) => {
    const res = await this.axiosCustodyGet("exchange/min-amount", {
      fromCurrency,
      toCurrency,
      fromNetwork,
      toNetwork,
      flow,
    });
    return res;
  }
  GetEstimatedDepositAmount = async ({
    fromCurrency,
    toCurrency,
    fromAmount,
    toAmount,
    fromNetwork,
    toNetwork,
    flow,
    type,
    useRateId,
  }) => {
    const res = await this.axiosCustodyGet("exchange/estimated-amount", {
      fromCurrency,
      toCurrency,
      fromAmount,
      toAmount,
      fromNetwork,
      toNetwork,
      flow,
      type,
      useRateId,
    });
    return res;
  }
  PostCreateDeposit = async (deposit) => {
    const res = await this.axiosCustodyPost("exchange", deposit);
    return res;
  }
  GetCheckDepositStatus = async (id) => {
    const res = await this.axiosCustodyGet("exchange/by-id", {
      id,
    });
    return res;
  }

  // custody Withdrawals apis
  PostCreateWithDrawal = async (withdrawal) => {
    const res = await this.axiosCustodyPost("partner/withdrawal", withdrawal, {
      Authorization: `Bearer ${this.accessToken}`
    });
    return res;
  }
  PostCreateWithDrawals = async (withdrawals) => {
    const res = await this.axiosCustodyPost("partner/withdrawals", {
      requests: withdrawals
    }, {
      Authorization: `Bearer ${this.accessToken}`
    });
    return res;
  }
  GetPartnerWithDrawal = async (externalId) => {
    const res = await this.axiosCustodyGet(`partner/withdrawal/${externalId}`, {}, {
      Authorization: `Bearer ${this.accessToken}`
    });
    return res;
  }
  GetLatestPartnerWithDrawals = async (
    limit,
    offset,
    token
  ) => {
    const res = await this.axiosCustodyGet("partner/withdrawals", {
      limit,
      offset,
    }, {
      Authorization: `Bearer ${this.accessToken}`
    });
    return res;
  }
  GetWithDrawalFeeEstimate = async (
    amount,
  ) => {
    const res = await this.axiosCustodyGet("partner/withdrawal/fee/btc", {
      amount
    });
    return res;
  }

  // custody Transfers apis
  PostRegisterTransfer = async (transfer) => {
    const res = await this.axiosCustodyPost("partner/transfer", transfer, {
      Authorization: `Bearer ${this.accessToken}`
    });
    return res;
  }
  GetPartnerTransfer = async (id) => {
    const res = await this.axiosCustodyPost(`partner/transfer/${id}`, {}, {
      Authorization: `Bearer ${this.accessToken}`
    });
    return res;
  }
  GetPartnerTransferStatus = async (id) => {
    const res = await this.axiosCustodyPost(`partner/transfer/${id}/status`, {}, {
      Authorization: `Bearer ${this.accessToken}`
    });
    return res;
  }

  GetPartnerTransferStatuses = async ({
    id,
    spid,
    status,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
    limit,
    offset,
  }) => {
    const res = await this.axiosCustodyGet('partner/transfers/status', {
      id,
      spid,
      status,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
      limit,
      offset,
    });
    return res;
  }

  GetPartnerTransfers = async ({
    id,
    spid,
    status,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
    limit,
    offset,
  }) => {
    const res = await this.axiosCustodyGet('partner/transfers', {
      id,
      spid,
      status,
      createdFrom,
      createdTo,
      updatedFrom,
      updatedTo,
      limit,
      offset,
    });
    return res;
  }

  PostRegisterPartnerTransfers = async (transfers) => {
    const res = await this.axiosCustodyPost("partner/withdrawals", {
      request: transfers
    }, {
      Authorization: `Bearer ${this.accessToken}`
    });
    return res;
  }
}
module.exports = CustodyApi;