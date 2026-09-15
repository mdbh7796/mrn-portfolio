const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  listProjects: () => fetch(`${API_URL}/api/projects`).then(handle),
  getProject: (slug) => fetch(`${API_URL}/api/projects/${slug}`).then(handle),
  listSkills: () => fetch(`${API_URL}/api/skills`).then(handle),
  getAbout: () => fetch(`${API_URL}/api/about`).then(handle),
  sendContact: (payload) =>
    fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(handle)
};
