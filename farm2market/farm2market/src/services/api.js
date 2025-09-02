const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function api(path, { method = "GET", token, body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const isJSON = res.headers.get("content-type")?.includes("application/json");
  const data = isJSON ? await res.json() : null;
  if (!res.ok) {
    const message = data?.message || res.statusText;
    throw new Error(message);
  }
  return data;
}

export const AuthAPI = {
  signup: (payload) => api("/auth/signup", { method: "POST", body: payload }),
  login: (payload) => api("/auth/login", { method: "POST", body: payload }),
};

export const UserAPI = {
  updateMe: (token, payload) => api("/users/me", { method: "PUT", token, body: payload }),
  me: (token) => api("/users/me", { method: "GET", token }),
  getById: (token, id) => api(`/users/${id}`, { method: "GET", token }),
};

export const ProductAPI = {
  list: (type, isNearby, suburb) => {
    let url = "/products";
    const params = [];
    if (type) params.push(`type=${encodeURIComponent(type)}`);
    if (isNearby) params.push(`suburb=${encodeURIComponent(suburb)}`);
    if (params.length) url += `?${params.join("&")}`;
    return api(url, { method: "GET" });
  },
  add: (token, payload) => api("/products", { method: "POST", token, body: payload }),
};

export const OrderAPI = {
  create: (token, payload) => api("/orders", { method: "POST", token, body: payload }),
  list: (token, buyerId) => api(`/orders?buyer=${buyerId}`, { method: "GET", token }),
};

export const AnalyticsAPI = {
  getMonthlySales: (token) => api("/analytics/monthly-sales", { method: "GET", token }),
  getTopCustomers: (token) => api("/analytics/top-customers", { method: "GET", token }),
  getTopProducts: (token) => api("/analytics/top-products", { method: "GET", token }),
  getSellerStats: (token) => api("/analytics/seller-stats", { method: "GET", token }),
};
