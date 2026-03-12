/**
 * storage.js - localStorage 読み書き
 * 保存キー: ichinichi-okane-data
 */

const STORAGE_KEY = 'ichinichi-okane-data';

/**
 * 固定費データをlocalStorageから読み込む
 * @returns {Array} 固定費オブジェクトの配列
 */
function load() {
  try {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    const data = JSON.parse(json);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('storage load error:', e);
    return [];
  }
}

/**
 * 固定費データをlocalStorageに保存する
 * @param {Array} data - 固定費オブジェクトの配列
 */
function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('storage save error:', e);
    throw e;
  }
}
