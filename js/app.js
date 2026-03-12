/**
 * app.js - エントリ・初期化・イベントハンドリング
 */

document.addEventListener('DOMContentLoaded', () => {
  let items = load();
  let deleteTargetId = null;

  function refresh() {
    const costs = calculateCosts(items);
    updateCostDisplay(costs);
    renderList(items, handleEdit, handleDeleteClick);
    save(items);
  }

  function handleEdit(item) {
    setEditMode(item);
  }

  function handleDeleteClick(item) {
    deleteTargetId = item.id;
    showDeleteModal(item, handleDeleteConfirm, () => { deleteTargetId = null; });
  }

  function handleDeleteConfirm() {
    if (deleteTargetId) {
      items = items.filter((i) => i.id !== deleteTargetId);
      deleteTargetId = null;
      refresh();
    }
  }

  function validateForm() {
    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value.trim();
    const amount = document.getElementById('amount').value;

    if (!category) {
      showError('カテゴリを選択してください');
      return false;
    }

    if (category === 'その他' && !name) {
      showError('カテゴリが「その他」の場合は項目名を入力してください');
      return false;
    }

    const amountNum = parseInt(amount, 10);
    if (isNaN(amountNum) || amountNum < 0) {
      showError('金額を正しく入力してください（0以上の整数）');
      return false;
    }

    hideError();
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const editId = document.getElementById('edit-id').value;
    const category = document.getElementById('category').value;
    const name = document.getElementById('name').value.trim();
    let amount = parseInt(document.getElementById('amount').value, 10);
    const amountUnit = document.getElementById('amount-unit').value;
    const memo = document.getElementById('memo').value.trim();

    if (amountUnit === 'yearly') {
      amount = Math.round(amount / 12);
    }

    if (editId) {
      const index = items.findIndex((i) => i.id === editId);
      if (index >= 0) {
        items[index] = { ...items[index], category, name, amount, memo };
      }
    } else {
      const id = 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2);
      items.push({ id, category, name, amount, memo });
    }

    resetForm();
    refresh();
  }

  function handleCancel() {
    resetForm();
  }

  function handleCategoryChange() {
    const category = document.getElementById('category').value;
    const nameHint = document.getElementById('name-required-hint');
    if (nameHint) {
      nameHint.textContent = category === 'その他' ? '必須' : '（その他の場合必須）';
    }
  }

  document.getElementById('fixed-cost-form').addEventListener('submit', handleSubmit);
  document.getElementById('cancel-btn').addEventListener('click', handleCancel);
  document.getElementById('category').addEventListener('change', handleCategoryChange);

  refresh();
});
