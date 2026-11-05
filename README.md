# 多语言问卷核对页面

这是一个不依赖服务器和数据库的静态页面，可直接部署到 GitHub Pages。

页面顶部用于选择后续处理的目标语言（中文、英文、泰语、马来语、德语、土耳其语、法语、乌克兰语或阿拉伯语〔沙特〕）；主体从左到右分为：

1. 固定显示中文的 22 页最新问卷截图；截图会充分利用左侧卡片高度，按原始比例完整缩放显示，不使用内部滚动条，切换顶部目标语言不会改变或重新加载截图。
2. 只读的中文基准文案。
3. `AI翻译` 区域，跟随顶部目标语言和当前问卷页联动，逐条对照展示中文原文、Codex 翻译与 DeepSeek 翻译。
4. 人工核对区域，可编辑当前页中文文案。

## AI 翻译

- 选择任一非中文目标语言后，AI 翻译区会立即切换到对应语言。
- 英文、泰语、马来语、德语、土耳其语、法语、乌克兰语和阿拉伯语（沙特）均逐条展示中文原文、Codex 翻译和 DeepSeek 翻译，便于双模型比较。
- 八种非中文语言的 Codex 静态译文已按中文提示词 `questionnaire-localization-v3` 复核过上一版的 115 条固定文案。中文基准现已更新为 22 页；发生变化和新增的文案会明确显示“待补充”，不能被旧译文冒充为最新结果。
- 固定文案已进行语法和自然度校对；动态数字、体重和日期值按原值保留。
- 选择“中文”时，右侧展示 Codex 中文校对结果。
- Codex 翻译位于 `assets/data/ai-questionnaire-translations.js`；DeepSeek 翻译位于 `assets/data/deepseek-questionnaire-translations.js`。
- 两份翻译都是随页面加载的静态数据，浏览器不会调用外部 AI 接口，也不会接触 API Key。

### 统一提示词约束

Codex 与 DeepSeek 共用 `translation-prompt-config.mjs` 中的翻译规范。规范包含：

- 健身、减重问卷的产品背景和专业教练语气。
- 忠实原意、自然语法、移动端长度、格式保留和禁止中文残留等共享约束。
- 英文、泰语、马来语、德语、土耳其语、法语、乌克兰语和阿拉伯语（沙特）各自的语气和语言习惯要求。
- SPAX、BMI、BMR、目标体重、训练计划等固定术语表。
- 每条文案所在的页面名称、页面顺序、文案顺序和 UI 类型，供模型消除歧义。

当前提示词使用中文编写，版本为 `questionnaire-localization-v3`。Codex 静态译文在 `AI_TRANSLATION_METADATA` 中记录该版本和人工校对状态；DeepSeek 生成结果记录提示词版本及每个语言的提示词指纹。

`test/web-codex-translations.test.js` 会自动检查八种 Codex 译文的现有静态数据是否有效、是否残留中文或首尾空格、是否遵循固定术语表，以及是否与 DeepSeek 保持独立结果。当前元数据会将新中文基准标记为待同步；重新生成全部译文后，应恢复完整覆盖检查。

修改翻译规范后，提示词指纹会发生变化，DeepSeek 旧缓存会自动失效。语义发生重大变化时仍应同步提升 `TRANSLATION_PROMPT_VERSION`，便于报告和产物追溯。

### 生成 DeepSeek 翻译

项目根目录的 `.env.local` 至少需要配置：

```text
AI_API_KEY=你的 DeepSeek API Key
```

API URL 和模型已有默认值，也可以显式配置：

```text
AI_API_URL=https://api.deepseek.com/chat/completions
AI_MODEL=deepseek-chat
```

在项目根目录执行：

```powershell
npm.cmd run web:translate:deepseek
```

生成器只发送去重后的固定中文文案，不发送截图和动态用户数据。结果会写入：

```text
offline-web-mvp/assets/data/deepseek-questionnaire-translations.js
```

逐文案缓存位于 `.qa-cache/deepseek-translations/`。中文、页面上下文、模型或提示词未变化时，再次运行不会重复请求；只有新增、修改、约束变化或校验失败的文案会重新调用接口。生成器会检查漏译、空译文和目标译文中的中文残留。

## 人工核对

- `保存当前页`：只保存当前问卷页的修改，数据保存在当前浏览器的 `localStorage`。
- `重置当前页`：只删除当前问卷页的人工修改，其他页面已保存的修改不受影响。
- `导出修改后的文案`：导出全部 22 页，其中已保存页面使用人工修改，其余页面保留中文基准。
- 未点击“保存当前页”的修改不会进入导出文件。

每次导出使用唯一文件名，例如：

```text
zh-questionnaire-text.reviewed-2pages-20261104-181745.js
```

导出的内容仍是：

```js
window.QUESTIONNAIRE_TEXTS = [/* 22 页完整数据 */]
```

其页面和数组结构与 `assets/data/zh-questionnaire-text.js` 一致，每条文案会额外包含两个审核字段：

```js
{
  key: '稳定文案标识',
  text: '导出的最终文案',
  dynamic: false,
  modified: true,
  originalText: '修改前的中文基准'
}
```

`modified` 表示最终文案是否与本次中文基准不同；`originalText` 始终保存本次中文基准。新增字段不会影响当前网页读取，可以将导出文件重命名为 `zh-questionnaire-text.js` 后替换原文件。

浏览器不会直接修改项目目录中的原始文件。外部人员核对完成后，需要把导出文件发送给项目维护者，由维护者替换并提交到 GitHub。

## 本地预览

在项目根目录执行：

```powershell
node offline-web-mvp\preview.mjs
```

然后打开：

```text
http://127.0.0.1:4173
```

## 中文基准更新

人工更新截图并完成 22 页截图清单后，先合并最新中文基准：

```powershell
node offline-web-mvp\merge-manual-zh-baseline.mjs
```

再从中文基准生成网页数据：

```powershell
node offline-web-mvp\build-text-data.mjs
```

该命令从 `translations/source.zh-CN.json` 重新生成：

```text
offline-web-mvp/assets/data/zh-questionnaire-text.js
```

## GitHub Pages 资源规划

外部人员通过 GitHub Pages 使用时，以下运行资源必须放入同一个 GitHub 仓库，并保持当前相对目录：

```text
index.html
assets/
├─ data/
│  ├─ zh-questionnaire-text.js
│  ├─ ai-questionnaire-translations.js
│  └─ deepseek-questionnaire-translations.js
└─ screenshots/
   └─ zh/01.png ... 22.png
```

页面当前运行只需要 22 张中文截图；仓库中保留的 `en`、`th`、`ms` 截图属于历史/备用资源，不再由页面加载，可按后续需要保留或清理。页面没有 CDN、npm 包、数据库或外部接口依赖。

以下文件只用于本地维护，不是网页运行必需资源：

- `README.md`
- `preview.mjs`
- `build-text-data.mjs`
- `generate-deepseek-translations.mjs`
- `translation-prompt-config.mjs`

建议保留在仓库中，方便后续维护，但 GitHub Pages 运行时不会调用它们。

### 发布步骤

1. 将 `offline-web-mvp` 目录中的全部内容上传到 GitHub Pages 对应仓库根目录。
2. 在仓库 `Settings → Pages` 中选择 `Deploy from a branch`。
3. Branch 选择 `main`，目录选择 `/(root)`，然后保存。
4. 后续更新页面时至少提交改动过的 `index.html` 或 `assets` 文件。

### 外部人员保存范围

当前没有服务器或数据库，因此：

- 每位外部人员的“保存”只对其当前浏览器有效。
- 不同人员之间不会自动看到彼此的修改。
- 清理浏览器站点数据会删除尚未导出的保存内容。
- 需要长期保存或汇总时，必须点击导出并把文件交回维护者。
- 如果未来要求多人实时共享、统一提交或直接写回 GitHub，需要增加后端存储或带身份验证的 GitHub API 流程。

### 公开性提醒

Public 仓库的 GitHub Pages 会公开 `assets/screenshots` 和中文文案数据。发布前需要确认截图和文案允许公开，不包含账号、个人信息或其他敏感内容。
