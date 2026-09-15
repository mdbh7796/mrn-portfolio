// In production (Vercel) the API is same-origin under /api. Never allow a
// localhost value to be baked into a production bundle by mistake.
const configuredApiUrl = import.meta.env.VITE_API_URL ?? '';
const isLocalhostUrl = /^https?:\/\/(localhost|127(?:\.\d{1,3}){3})(?::\d+)?\/?$/i.test(configuredApiUrl);
const API_URL = import.meta.env.PROD && isLocalhostUrl ? '' : configuredApiUrl;

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
