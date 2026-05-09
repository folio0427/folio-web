# Folio · Public

Folio 的**官方網站**與**法律文件**公開來源。

> 這是 Folio 的**公開** repo。Flutter app 程式碼在另一個私人 repo。

---

## 內容

```
folio-web/
├── legal/              ← 法律文件主檔（唯一 source of truth）
│   ├── terms_zh.md
│   ├── terms_en.md
│   ├── privacy_zh.md
│   ├── privacy_en.md
│   ├── manifest.json   ← app fetch 用之版本 metadata
│   └── CHANGELOG.md
├── index.html          ← 官網首頁
├── terms.html          ← 條款 web 視圖
├── privacy.html        ← 隱私 web 視圖
├── css/
├── js/
└── assets/
```

---

## 法律文件原則

- **單一來源原則（Single Source of Truth）**：所有正式對外的服務條款 / 隱私政策皆來自 `legal/*.md`
- **公開可審計**：任何人皆可透過 git log 驗證條款歷史與變更
- **app + 網站雙端共用**：Flutter app 啟動時透過 GitHub Pages URL fetch 最新版本、官網靜態 HTML 同步呈現
- **非律師審閱版本**：目前為 v0.1 草稿、**未生效**。正式版本將由台灣執業律師審閱後發佈

---

## 變更條款 / 隱私的流程

```
1. 編輯 legal/*.md（由律師審改）
2. 更新 legal/manifest.json（version + summary + change_type）
3. 更新 legal/CHANGELOG.md（新增條目）
4. git commit + push
5. GitHub Pages 自動部署、folio0427.github.io/folio-web/ 即時更新
6. （重大變更）Supabase 寫入 tos_versions 新筆 → app 比對版本不符 → 阻擋式 modal
7. （重大變更）發推播 + email 通知用戶
```

---

## URLs

| 用途 | URL |
|------|-----|
| 官網主頁 | https://folio0427.github.io/folio-web/ |
| 服務條款（HTML） | https://folio0427.github.io/folio-web/terms.html |
| 隱私權政策（HTML） | https://folio0427.github.io/folio-web/privacy.html |
| 條款 markdown（app fetch） | https://folio0427.github.io/folio-web/legal/terms_zh.md |
| 隱私 markdown（app fetch） | https://folio0427.github.io/folio-web/legal/privacy_zh.md |
| Manifest（app 版本檢查） | https://folio0427.github.io/folio-web/legal/manifest.json |

---

## 聯絡

[folio0427@gmail.com](mailto:folio0427@gmail.com)

---

## License

法律文件本身保留所有權利（all rights reserved）— 條款 / 隱私內容係 Folio 平台之法律契約、不得擅自轉用。
網站程式碼（HTML / CSS / JS）以教育用途公開、非商業使用請註明出處。
