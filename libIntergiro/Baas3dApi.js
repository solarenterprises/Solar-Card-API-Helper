const axios = require("axios");

class Baas3dApi {
  constructor(apiKey = "", apiURL = "https://3d.staging.intergiro.tech") {
    this.apiURL = apiURL;
    this.headers = {
      "Content-Type": "application/json",
      // Add Authorization header if required
    };
    this.apiKey = apiKey;
  }

  // get Api Url
  async getApiUrl() {
    try {
      const response = await axios.get(this.apiURL, {
        headers: { ...this.headers },
      });
      return response.data;
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error; // Rethrow the error for further handling if required
    }
  }

  // Authentication
  login() {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/auth/login`,
          {
            api_key: this.apiKey,
          },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          this.accessToken = res.access_token;
          this.refreshToken = res.refresh_token;
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  refresh() {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/auth/refresh`,
          {
            refresh_token: this.refreshToken,
          },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          this.accessToken = res.access_token;
          this.refreshToken = res.refresh_token;
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Individual
  createIndividual(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/individuals`,
          {
            ...body,
          },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getIndividuals(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/individuals`, {
          headers: { ...this.headers },
          params: { ...params },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getIndividualById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/individuals/${id}`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  onboardIndividual(id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/individuals/${id}/onboard`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  updateIndividual(id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/individuals/${id}`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // KYC
  kycQuestionnaire(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/kyc/questionnaire`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  kycVerification(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/kyc/verification`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Consent
  getConsentById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/consents/${id}`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getConsents(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/consents`, {
          headers: { ...this.headers },
          params: { ...params },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  requestConsentByScope(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/consents`,
          {
            ...body,
          },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  requestConsent(id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/consents/${id}`,
          {
            ...body,
          },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Event
  getEvents(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/events/`, {
          headers: { ...this.headers },
          params: { ...params },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getEventById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/events/${id}`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Web Hook
  getWebhooksAll() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/webhooks`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  createWebhook(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/webhooks`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  deleteWebhook(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.apiURL}/webhooks/${id}`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Account
  getAccountById() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/accounts/${id}`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getAccountsByIndividual(individual_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/accounts`, {
          headers: { ...this.headers },
          params: { individual_id },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getBankDetails(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/accounts/${id}/bank_details`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  createAccount(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/accounts`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  // Card
  orderCard(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/cards`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getCards(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/cards`,
          {
            headers: { ...this.headers },
            params: { ...params }
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getCardById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/cards/${id}`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  getCardCredentials(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/cards/${id}/credentials`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  activateCard(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/cards/${id}/activate`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  resetCardPin(id) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${this.apiURL}/cards/${id}/pin`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  updateCard(id) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${this.apiURL}/cards/${id}`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  applePayTokenization(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/cards/${id}/apple_pay/tokenize`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  googlePayTokenization(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/cards/${id}/google_pay/tokenize`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Individual Payment Method
  getPaymentMethods(individual_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/individuals/${individual_id}/payment_methods`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  addPaymentMethod(individual_id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/individuals/${individual_id}/payment_methods`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  chargePaymentMethod(individual_id, id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/individuals/${individual_id}/payment_methods/${id}/charge`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  deletePaymentMethod(individual_id, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `${this.apiURL}/individuals/${individual_id}/payment_methods/${id}`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Transaction
  getTransactions(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/transactions`,
          {
            headers: { ...this.headers },
            params: { ...params }
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getTransactionById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/transactions/${id}`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  moveMoney(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/transactions/move`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  sendMoney(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/transactions/pay`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Guest
  getGuestAll() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/guests`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  createGuest(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/guests`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Guest Payment Method
  getPaymentMethods(guest_id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/guests/${guest_id}/payment_methods`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  addGuestPaymentMethod(guest_id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/guests/${guest_id}/payment_methods`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  chargeGuestPaymentMethod(guest_id, id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/guests/${guest_id}/payment_methods/${id}/charge`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  deleteGuestPaymentMethod(guest_id, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `${this.apiURL}/guests/${guest_id}/payment_methods/${id}`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Simulation
  simulateCardPayment(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/simulation/card_payment`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  simulate3dsAuth(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/simulation/three_ds_authentication`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  simulateBankTransferAccepted(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/simulation/bank_transfer/${id}/accepted`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  simulateBankTransferSettled(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/simulation/bank_transfer/${id}/settled`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  simulateOnboardingKYC(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/simulation/onboarding/kyc`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  simulateKYCStatusChange(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/simulation/onboarding/status`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  
  simulateIdVerification(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/simulation/individuals/${id}/identity_verification`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Fee
  createFee(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/fees`,
          { ...body },
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getFees(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/fees`,
          {
            headers: { ...this.headers },
            params: { ...params }
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getFeeById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/fees/${id}`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Customer Support
  getTransactionAuditById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/audit/transactions/${id}`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Pending Action
  getPendingActions(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/pending_actions`,
          {
            headers: { ...this.headers },
            params: { ...params }
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getPendingActionById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/pending_actions/${id}`,
          {
            headers: { ...this.headers },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }


}

module.exports = Baas3dApi;
