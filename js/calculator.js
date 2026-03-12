/**
 * calculator.js - 時間コスト計算
 * 1日 = 月額÷30, 1時間 = 1日÷24, 1分 = 1時間÷60
 * 表示: 小数点第2位まで（四捨五入）
 */

/**
 * 固定費配列から時間コストを計算
 * @param {Array} items - 固定費オブジェクトの配列（amount を持つ）
 * @returns {{ monthly: number, daily: number, hourly: number, minute: number }}
 */
function calculateCosts(items) {
  const monthly = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const daily = monthly / 30;
  const hourly = daily / 24;
  const minute = hourly / 60;

  return {
    monthly,
    daily: round2(daily),
    hourly: round2(hourly),
    minute: round2(minute)
  };
}

/**
 * 小数点第2位まで四捨五入
 * @param {number} num
 * @returns {number}
 */
function round2(num) {
  return Math.round(num * 100) / 100;
}

/**
 * 数値を表示用文字列に変換（カンマ区切り、小数点2桁）
 * @param {number} num
 * @returns {string}
 */
function formatAmount(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return Number(num).toLocaleString('ja-JP', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}
