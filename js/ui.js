/**
 * ui.js - DOM操作・イベント関連のUI更新
 */

/**
 * 時間コスト表示を更新
 * @param {{ monthly: number, daily: number, hourly: number, minute: number }} costs
 */
function updateCostDisplay(costs) {
  const monthlyEl = document.getElementById('monthly-total');
  const dailyEl = document.getElementById('daily-cost');
  const hourlyEl = document.getElementById('hourly-cost');
  const minuteEl = document.getElementById('minute-cost');

  if (monthlyEl) monthlyEl.textContent = formatAmount(costs.monthly);
  if (dailyEl) dailyEl.textContent = formatAmount(costs.daily);
  if (hourlyEl) hourlyEl.textContent = formatAmount(costs.hourly);
  if (minuteEl) minuteEl.textContent = formatAmount(costs.minute);
}

/**
 * 固定費一覧を描画
 * @param {Array} items - 固定費オブジェクトの配列
 * @param {Function} onEdit - 編集ボタンクリック時のコールバック (item) => void
 * @param {Function} onDelete - 削除ボタンクリック時のコールバック (item) => void
 */
function renderList(items, onEdit, onDelete) {
  const listEl = document.getElementById('fixed-cost-list');
  const emptyEl = document.getElementById('list-empty');

  if (!listEl) return;

  listEl.innerHTML = '';

  if (items.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'fixed-cost-item';
    li.dataset.id = item.id;

    const displayName = item.name || '';
    const memoText = item.memo ? `（${item.memo}）` : '';

    li.innerHTML = `
      <div class="item-main">
        <span class="item-category">${escapeHtml(item.category)}</span>
        <span class="item-name">${escapeHtml(displayName)}${escapeHtml(memoText)}</span>
      </div>
      <span class="item-amount">${formatAmount(item.amount)}円</span>
      <div class="item-actions">
        <button type="button" class="btn btn-secondary btn-sm edit-btn" data-id="${escapeHtml(item.id)}">編集</button>
        <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${escapeHtml(item.id)}">削除</button>
      </div>
    `;

    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    if (editBtn) editBtn.addEventListener('click', () => onEdit(item));
    if (deleteBtn) deleteBtn.addEventListener('click', () => onDelete(item));

    listEl.appendChild(li);
  });
}

/**
 * HTMLエスケープ
 */
function escapeHtml(str) {
  if (str == null) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * フォームをリセット（新規登録モードに）
 */
function resetForm() {
  const form = document.getElementById('fixed-cost-form');
  const editIdEl = document.getElementById('edit-id');
  const submitBtn = document.getElementById('submit-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const nameHint = document.getElementById('name-required-hint');

  if (form) form.reset();
  if (editIdEl) editIdEl.value = '';
  if (submitBtn) {
    submitBtn.textContent = '登録';
    submitBtn.disabled = false;
  }
  if (cancelBtn) cancelBtn.style.display = 'none';
  if (nameHint) nameHint.textContent = '（その他の場合必須）';
  hideError();
}

/**
 * 編集モードに切り替え
 * @param {Object} item - 編集する固定費
 */
function setEditMode(item) {
  document.getElementById('category').value = item.category;
  document.getElementById('name').value = item.name || '';
  document.getElementById('amount').value = item.amount;
  document.getElementById('memo').value = item.memo || '';
  document.getElementById('edit-id').value = item.id;
  document.getElementById('submit-btn').textContent = '保存';
  document.getElementById('cancel-btn').style.display = 'inline-block';
  hideError();
}

/**
 * エラーメッセージを表示
 * @param {string} message
 */
function showError(message) {
  const el = document.getElementById('error-message');
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

/**
 * エラーメッセージを非表示
 */
function hideError() {
  const el = document.getElementById('error-message');
  if (el) {
    el.textContent = '';
    el.style.display = 'none';
  }
}

/**
 * 削除確認モーダルを表示
 * @param {Object} item - 削除対象の固定費
 * @param {Function} onConfirm - 削除確定時のコールバック
 * @param {Function} onCancel - キャンセル時のコールバック
 */
function showDeleteModal(item, onConfirm, onCancel) {
  const modal = document.getElementById('delete-modal');
  const messageEl = document.getElementById('delete-modal-message');
  const confirmBtn = document.getElementById('delete-confirm-btn');
  const cancelBtn = document.getElementById('delete-cancel-btn');

  if (!modal) return;

  const label = item.name || item.category;
  if (messageEl) messageEl.textContent = `「${label}」を削除しますか？`;

  const handleConfirm = () => {
    cleanup();
    onConfirm();
  };

  const handleCancel = () => {
    cleanup();
    onCancel();
  };

  const backdrop = modal.querySelector('.modal-backdrop');

  function cleanup() {
    modal.setAttribute('aria-hidden', 'true');
    if (confirmBtn) confirmBtn.removeEventListener('click', handleConfirm);
    if (cancelBtn) cancelBtn.removeEventListener('click', handleCancel);
    if (backdrop) backdrop.removeEventListener('click', handleCancel);
  }

  confirmBtn.addEventListener('click', handleConfirm);
  cancelBtn.addEventListener('click', handleCancel);
  if (backdrop) backdrop.addEventListener('click', handleCancel);

  modal.setAttribute('aria-hidden', 'false');
}
