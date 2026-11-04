# 多语言问卷核对页面

GitHub Pages 地址：

<https://zd94.github.io/offline-info-page/>

这是一个纯静态页面，不需要服务器或数据库。页面包含：

- 顶部选择中文、英文、泰语或马来语作为目标语言。
- 左侧问卷截图固定显示中文，不随目标语言切换。
- 只读中文基准。
- AI 翻译预留区域。
- 可编辑的人工核对区域。
- 当前页保存、当前页重置和完整文案导出。

## 目录

```text
index.html
assets/
├─ data/zh-questionnaire-text.js
└─ screenshots/
   ├─ zh/01.png ... 20.png
   ├─ en/01.png ... 20.png
   ├─ th/01.png ... 20.png
   └─ ms/01.png ... 20.png
```

页面当前只会加载 `assets/screenshots/zh/` 下的中文截图。`en`、`th`、`ms` 目录作为历史或备用资源保留，不再随顶部语言选择加载。页面运行所需的中文截图、中文文案数据和 `index.html` 必须全部保留在仓库中。

## 人工核对数据

- 保存内容位于使用者当前浏览器的 `localStorage`，不同用户之间不会自动同步。
- “重置当前页”只恢复当前问卷页。
- 导出文件包含完整 20 页结构，未保存的修改不会导出。
- 每条导出文案包含 `modified` 布尔值，用于标识最终文案是否被修改。
- 每条导出文案包含 `originalText`，用于保存修改前的中文基准原文。
- 浏览器下载不会自动修改本仓库。

维护者收到导出文件后，将其重命名为 `zh-questionnaire-text.js`，替换：

```text
assets/data/zh-questionnaire-text.js
```

然后提交并推送到 `main` 分支，GitHub Pages 会自动更新。

## 公开性

本仓库为 Public，页面截图和文案数据均可被公开访问。请勿提交账号、个人信息或其他敏感内容。
