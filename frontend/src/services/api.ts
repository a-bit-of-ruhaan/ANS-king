const API_URL = "http://localhost:8000/api";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  async login(username: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  async register(username: string, password: string) {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  },

  async generate(req: any) {
    const res = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      let errMsg = `API error: ${res.statusText}`;
      try {
        const errorData = await res.json();
        if (errorData.detail) errMsg = errorData.detail;
      } catch (e) {}
      throw new Error(errMsg);
    }
    return res.json();
  },
  
  async getHistory() {
    const res = await fetch(`${API_URL}/history`, {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch history");
    return res.json();
  },
  
  logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};
