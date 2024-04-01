const api = {
  hostname: "https://3.225.61.15/api/1.0",

  async getProducts(category, paging) {
    const response = await fetch(
      `${this.hostname}/products/${category}?paging=${paging}`
    );
    return await response.json();
  },
  async getCampaigns() {
    const response = await fetch(`${this.hostname}/marketing/campaigns`);
    return await response.json();
  },
  async searchProducts(keyword, paging) {
    const response = await fetch(
      `${this.hostname}/products/search?keyword=${keyword}&paging=${paging}`,
      `${header}`
    );
    return await response.json();
  },
  async getProduct(id, token) {
    let response;
    if (!token) {
      response = await fetch(`${this.hostname}/products/details?id=${id}`);
    } else {
      response = await fetch(`${this.hostname}/products/details?id=${id}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }),
      });
    }

    return await response.json();
  },
  async checkout(data, jwtToken) {
    const response = await fetch(`${this.hostname}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: "POST",
    });
    return await response.json();
  },
  async signin(data) {
    const response = await fetch(`${this.hostname}/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      method: "POST",
    });
    return await response.json();
  },
  async getProfile(jwtToken) {
    const response = await fetch(`${this.hostname}/user/profile`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
    return await response.json();
  },
  async getCostomerServiceQA() {
    const response = await fetch(
      "https://3.209.143.199/api/1.0/customerService/getQaData"
    );
    if (!response.ok) {
      throw new Error(
        "getCostomerServiceQA response was not ok:" + response.status
      );
    } else {
      return await response.json();
    }
  },
};

export default api;
