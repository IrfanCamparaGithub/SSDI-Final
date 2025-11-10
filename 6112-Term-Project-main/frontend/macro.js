const API_KEY = 'BNDU5TPXWRQ7S1OK';
const BASE = 'https://www.alphavantage.co/query';

const indicatorEl = document.getElementById('indicator');
const pointsEl = document.getElementById('points');
const sortEl = document.getElementById('sort');
const fetchBtn = document.getElementById('fetchBtn');
const statusEl = document.getElementById('status');
const ctx = document.getElementById('macroChart').getContext('2d');

let chart;


const META = {
  REAL_GDP: {
    fn: 'REAL_GDP',
    title: 'Real GDP (Chained 2012 Dollars, Quarterly)',
    valueKey: 'value' // in billions
  },
  INFLATION: {
    fn: 'INFLATION',
    title: 'Inflation (CPI, Monthly, %)',
    valueKey: 'value' // percentage
  },
  FEDERAL_FUNDS_RATE: {
    fn: 'FEDERAL_FUNDS_RATE',
    title: 'Federal Funds Rate (Monthly, %)',
    valueKey: 'value' // percent
  }
};

function buildUrl(fn) {
  const p = new URLSearchParams();
  p.set('function', fn);
  p.set('apikey', API_KEY);
  return `${BASE}?${p.toString()}`;
}

function toNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}


function parseSeries(json) {
  // Alpha Vantage economic endpoints usually return { data: [ { date, value }, ... ] }
  if (Array.isArray(json?.data)) return json.data;
  // Graceful fallback: some endpoints use different keys; try common alternatives
  if (Array.isArray(json?.realtime_start)) return []; // not supported shape here
  // Some endpoints may wrap data differently; try to sniff arrays of objects with date/value
  if (json && typeof json === 'object') {
    for (const k of Object.keys(json)) {
      if (Array.isArray(json[k]) && json[k].length && json[k][0].date && (json[k][0].value != null)) {
        return json[k];
      }
    }
  }
  return [];
}
