### 初期設定

追って記載。

### 本webアプリケーションの概要

このwebアプリケーションは音声配信サービスです。
開発背景やDB設計なおはDesignDoc.mdにまとめています。

### 随時更新していく手順

- 新たにページを追加、既存の変更をする場合、DBのモデルも追加する場合は、DesignDocの更新をお願いします。
- ページをフロントからアクセス可能にする場合には "src/app/components/Header.tsx"の以下の部分を追加してください。

```
  const pages = [
    { title: "カテゴリー", link: "/categories" },
    { title: "チャンネル", link: "/channels" },
    { title: "エピソード", link: "/episodes" },
  ];
```

- アイコンボタン配下を追加、既存の変更をする場合は、"src/app/components/Settings.tsx"の以下の部分を追加してください。

```
  const pageItems = [
    { title: "マイページ", link: `/users/${id}` },
    { title: "ログアウト", link: "/api/auth/logout" },
  ];
```
