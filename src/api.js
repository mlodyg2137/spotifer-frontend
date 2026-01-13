const BACKEND_BASE = "http://localhost:8080";

/**
 * Jeśli backend używa cookies/sesji po OAuth2:
 * - zostaw credentials: "include"
 * - NIE potrzebujesz localStorage tokena.
 *
 * Jeśli backend daje token w URL lub w odpowiedzi:
 * - wtedy dodasz Authorization i localStorage (na razie nie ruszamy).
 */

async function getJson(path) {
  const res = await fetch(`${BACKEND_BASE}${path}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Accept": "application/json",
    },
  });

  // 401/403 -> user niezalogowany
  if (res.status === 401 || res.status === 403) {
    const err = new Error("UNAUTHORIZED");
    err.code = res.status;
    throw err;
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${text}`);
  }

  return res.json();
}

export const apiMe = () => getJson("/api/me");

export const apiTopTracks = (params = {}) => {
  const q = new URLSearchParams({
    limit: String(params.limit ?? 20),
    time_range: params.time_range ?? "medium_term",
    offset: String(params.offset ?? 0),
    forceRefresh: String(params.forceRefresh ?? false),
  });
  return getJson(`/api/v1/profile/top/tracks?${q.toString()}`);
};

export const apiTopArtists = (params = {}) => {
  const q = new URLSearchParams({
    limit: String(params.limit ?? 20),
    time_range: params.time_range ?? "medium_term",
    offset: String(params.offset ?? 0),
    forceRefresh: String(params.forceRefresh ?? false),
  });
  return getJson(`/api/v1/profile/top/artists?${q.toString()}`);
};

export const apiRecentlyPlayed = (params = {}) => {
  const q = new URLSearchParams({
    limit: String(params.limit ?? 20),
    forceRefresh: String(params.forceRefresh ?? false),
  });

  if (params.after) q.set("after", params.after);
  if (params.before) q.set("before", params.before);

  return getJson(`/api/v1/profile/recently-played?${q.toString()}`);
};

export const startSpotifyLogin = () => {
  window.location.href = `${BACKEND_BASE}/oauth2/authorization/spotify-auth-code`;
};
