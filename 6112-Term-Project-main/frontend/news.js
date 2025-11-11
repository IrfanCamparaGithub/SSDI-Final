const API_KEY = 'BNDU5TPXWRQ7S1OK';
const BASE_URL = 'https://www.alphavantage.co/query';

const topicsEl = document.getElementById('topics');
const tickersEl = document.getElementById('tickers');
const limitEl = document.getElementById('limit');
const sortEl = document.getElementById('sort');
const fetchBtn = document.getElementById('fetchNewsBtn');
const newsList = document.getElementById('newsList');
const statusEl = document.getElementById('status');

function getSelectedTopics() {
  return Array.from(topicsEl.selectedOptions).map(o => o.value).join(',');
}

function buildUrl() {
  const params = new URLSearchParams();
  params.set('function', 'NEWS_SENTIMENT');
  const topics = getSelectedTopics();
  const tickers = (tickersEl.value || '').trim().toUpperCase().replace(/\s+/g, '');
  const limit = limitEl.value || '50';
  const sort = sortEl.value || 'LATEST';

  if (topics) params.set('topics', topics);
  if (tickers) params.set('tickers', tickers);
  params.set('limit', limit);
  params.set('sort', sort);
  params.set('apikey', API_KEY);

  return `${BASE_URL}?${params.toString()}`;
}

function asPct(x) {
  if (typeof x !== 'number') return '—';
  return (x * 100).toFixed(1) + '%';
}

function sentimentBadge(score) {
  let label = 'Neutral', cls = 'bg-secondary';
  if (typeof score === 'number') {
    if (score > 0.1) { label = 'Positive'; cls = 'bg-success'; }
    else if (score < -0.1) { label = 'Negative'; cls = 'bg-danger'; }
  }
  return `<span class="badge ${cls}">${label}</span>`;
}

function confidenceBadge(conf) {
  if (typeof conf !== 'number') return '';
  let cls = conf >= 0.6 ? 'bg-success' : conf >= 0.3 ? 'bg-warning text-dark' : 'bg-secondary';
  return `<span class="badge ${cls}">Conf: ${asPct(conf)}</span>`;
}

function topicPills(arr) {
  if (!Array.isArray(arr) || !arr.length) return '';
  return arr.map(t => `<span class="topic-pill">${t}</span>`).join(' ');
}