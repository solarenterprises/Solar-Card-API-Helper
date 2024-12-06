import axios from "axios";

class CardAcquiringApi {
  constructor(apiKey = "", apiURL = "https://merchant.intergiro.com/v1") {
    this.apiURL = apiURL;
    this.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authentication: `Bearer ${apiKey}`,
    };
  }

  // Order
  createOrder(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/order`,
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

  changeOrder(body) {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${this.apiURL}/order`, [...body], {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getOrders(params) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/order`, {
          headers: { ...this.headers },
          params: { ...params },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Customer
  createCustomer(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/customer`,
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

  createCustomer(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/customer`,
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

  getCustomerById(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/customer/${id}`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getCustomersAll() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/customer`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  updateContractInfo(id, body) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${this.apiURL}/customer/${id}/contact`,
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

  addPaymentMethod(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/customer/${id}/method`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  updatePaymentMethods(body) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.apiURL}/customer/${id}/methods`, [...body], {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  // Card Token
  createCardToken(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.apiURL}/card`, [...body], {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  getCardInfo(card_token) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.apiURL}/card/${card_token}`, {
          headers: { ...this.headers },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  updateCardToken(card_token, body) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${this.apiURL}/card/${card_token}`,
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
  
  // Authorization
  createAuthorization(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/authorization/redirect`,
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

  verifyAuthorization(jwt) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.apiURL}/authorization/verify`, jwt, {
          "Content-Type": "application/jwt",
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }

  initiatedPaymentAutomatedIntegration(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/authorization/redirect`,
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

  initiatedPaymentAutomatedIntegration(body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/authorization`,
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
  
  captureAuth(id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/authorization/${id}/capture`,
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
  
  cancelAuth(id, body) {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `${this.apiURL}/authorization/${id}`,
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
  
  refund(id, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${this.apiURL}/authorization/${id}/refund`,
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
  
  getAuth(id) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/authorization/${id}`,
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

  // Settlement
  getSettlements() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${this.apiURL}/settlement`,
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

export default CardAcquiringApi;
