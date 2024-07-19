const API_BASE_URL = "http://localhost:5002/api";

export const API_URLS = {
  SLEEP_ENTRIES: `${API_BASE_URL}/sleep-entries`,
  USER_ENTRIES: (userName: string) =>
    `${API_BASE_URL}/sleep-entries/${userName}`
};
