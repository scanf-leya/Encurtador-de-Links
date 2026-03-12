const API = "http://localhost:3333";

export const api = {
  getLinks: async () => {
    const res = await fetch(`${API}/links`);
    return res.json();
  },

  createLink: async (data: { original: string; short: string }) => {
    const res = await fetch(`${API}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  updateLink: async (id: string, data: { original: string; short: string }) => {
    const res = await fetch(`${API}/links/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  deleteLink: async (id: string) => {
    const res = await fetch(`${API}/links/${id}`, {
      method: "DELETE",
    });

    return res.json();
  },
};
