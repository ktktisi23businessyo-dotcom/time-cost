# 1日のお金

固定費を時間コストに換算し、時間の大切さを実感するツール。

## 機能

- 固定費の登録・編集・削除
- 月額・1日・1時間・1分あたりのコスト自動計算
- データのブラウザ保存（localStorage）
- PWA 対応（アプリとしてインストール可能）

## 使い方

1. ブラウザで `index.html` を開く、または GitHub Pages の URL にアクセス
2. 固定費を登録（カテゴリ、月額金額など）
3. 時間コストが自動で表示される
4. PWA としてインストールすると、アプリのように起動できる

## 技術スタック

- HTML / CSS / JavaScript（フレームワークなし）
- localStorage
- PWA（manifest.json, Service Worker）

## ローカル開発

```bash
# 簡易サーバーで起動（例: ポート 8080）
python3 -m http.server 8080
# http://localhost:8080 でアクセス
```

## ライセンス

MIT
