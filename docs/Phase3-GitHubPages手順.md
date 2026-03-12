# Phase 3: GitHub Pages 公開手順

## 1. GitHub リポジトリの作成

1. [GitHub](https://github.com) にログイン
2. 右上の「+」→「New repository」をクリック
3. 以下を設定：
   - **Repository name**: `ichinichi-okane` または任意の名前（例: `1-day-money`）
   - **Description**: 固定費を時間コストに換算するツール
   - **Public** を選択
   - **Add a README file** はチェックしない（既にローカルにあるため）
4. 「Create repository」をクリック

## 2. リモートの追加とプッシュ

```bash
cd "/Users/katsukitaisei/Desktop/AIエンジニア/1日のお金　PWA化"

# リモート追加（<USERNAME> を GitHub ユーザー名に、<REPO> をリポジトリ名に置き換え）
git remote add origin https://github.com/<USERNAME>/<REPO>.git

# プッシュ
git push -u origin main
```

**例**: ユーザー名が `katsukitaisei`、リポジトリ名が `ichinichi-okane` の場合：
```bash
git remote add origin https://github.com/katsukitaisei/ichinichi-okane.git
git push -u origin main
```

## 3. GitHub Pages の有効化

1. リポジトリの **Settings** を開く
2. 左メニューから **Pages** をクリック
3. **Source** で **Deploy from a branch** を選択
4. **Branch** で `main`、`/ (root)` を選択
5. **Save** をクリック

## 4. 公開 URL

数分後、以下の URL でアクセス可能になります：

```
https://<USERNAME>.github.io/<REPO>/
```

例: `https://katsukitaisei.github.io/ichinichi-okane/`

## 5. 確認事項

- [ ] URL でアクセスできる
- [ ] 固定費の登録・編集・削除が動作する
- [ ] 時間コストが正しく表示される
- [ ] 再読み込みでデータが保持される
- [ ] Chrome で「アプリとしてインストール」ができる
- [ ] スマホで操作できる
