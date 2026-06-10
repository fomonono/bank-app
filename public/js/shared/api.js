const API_BASE_URL = window.location.origin.startsWith("http")
  ? window.location.origin
  : "http://localhost:5050";

function getData(path) {
  return axios.get(`${API_BASE_URL}${path}`).then((response) => response.data);
}

function postData(path, body) {
  return axios.post(`${API_BASE_URL}${path}`, body).then((response) => response.data);
}

function formatCurrency(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value) {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
