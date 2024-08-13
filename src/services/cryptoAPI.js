const BASE_URL = `https://api.coingecko.com/api/v3`;
const DEMO_KEY = `CG-kvnvjdv6JUYHPC9y6CkgHPPU`;
export const returnURL = (page, currency) => `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&locale=en&x_cg_demo_api_key=${DEMO_KEY}`;
export const searchURL = (search) => `${BASE_URL}/search?query=${search}&x_cg_demo_api_key=${DEMO_KEY}`;
export const chartData = (id,currency) => `${BASE_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=1&x_cg_demo_api_key=${DEMO_KEY}`;
