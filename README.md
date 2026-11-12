# 多语言问卷核对页面

这是一个不依赖服务器和数据库的静态页面，可直接部署到 GitHub Pages。

页面顶部用于选择后续处理的目标语言（中文、英文、泰语、马来语、德语、土耳其语、法语、乌克兰语或阿拉伯语〔沙特〕）；主体从左到右分为：

1. 固定显示中文的 39 页最新问卷截图；截图会充分利用左侧卡片高度，按原始比例完整缩放显示，不使用内部滚动条，切换顶部目标语言不会改变或重新加载截图。
2. 只读的中文基准文案。
3. `AI翻译` 区域，跟随顶部目标语言和当前问卷页联动，逐条对照展示中文原文、Codex 翻译与 DeepSeek 翻译。
4. 人工核对区域；中文模式编辑中文核对稿，多语言模式编辑独立的人工核对译文。

## AI 翻译

- 选择任一非中文目标语言后，AI 翻译区会立即切换到对应语言。
- 英文、泰语、马来语、德语、土耳其语、法语、乌克兰语和阿拉伯语（沙特）均逐条展示中文原文、Codex 翻译和 DeepSeek 翻译，便于双模型比较。
- 八种非中文语言均覆盖 39 个主页面、22 个动态子页和 673 条页面内容。
- 固定文案已进行语法和自然度校对；动态数字、体重和日期值按原值保留。
- 选择“中文”时，右侧展示 Codex 中文校对结果。
- Codex 原始候选位于 `assets/data/codex-questionnaire-translations.<locale>.js`；DeepSeek 原始候选位于 `assets/data/deepseek-questionnaire-translations.<locale>.js`；人工核对底稿位于 `assets/data/reviewed-questionnaire-translations.<locale>.js`。三类数据相互独立。
- 这些文件都是静态数据，浏览器不会调用外部 AI 接口，也不会接触 API Key。

三类语言包与“导出核对后的译文”完全同构，每种语言、每种数据类型各一个文件：

```js
window.REVIEWED_QUESTIONNAIRE_TRANSLATIONS = {
  metadata: {
    schemaVersion: 1,
    kind: 'reviewed',
    sourceLocale: 'zh-CN',
    targetLocale: 'ms',
    targetLanguage: '马来语',
    generatedAt: '2026-11-12T10:01:44.061Z',
    exportedAt: '2026-11-12T10:01:44.061Z'
  },
  pages: [{
    order: 1,
    name: 'prelude-splash',
    label: '闪屏页面',
    screenshot: '新增-前置01-闪屏页面.png',
    items: [{
      key: 'prelude-splash|manual|text|2',
      sourceText: '享受你的运动',
      translation: 'Nikmati setiap senaman anda',
      dynamic: false,
      modified: false
    }]
  }],
  variants: {}
}
```

页面切换目标语言时只加载该语言的 Codex、DeepSeek 和人工核对三个语言包，并在加载时校验类型、语言、39 个主页面、22 个动态子页及稳定条目 key。查询参数按本次页面会话生成，刷新页面后会重新请求语言包，避免同名文件被浏览器旧缓存覆盖。人工核对包不存在时，右侧会以 Codex 初稿作为兜底，但不会修改 Codex 原始文件。

更新核对译文时，可将页面导出的文件重命名为稳定文件名后直接覆盖，例如：

```text
reviewed-questionnaire-translations.en.js
```

无需转换数组或重新合并多语言总文件。`modified` 作为导出审计字段保留；文件重新作为运行时基准加载后，页面以其中的 `sourceText` 和 `translation` 为初始内容，本地已经保存的人工修改仍作为覆盖层保留。

`translation-data-schema.mjs` 用于把翻译词典关联到稳定页面和条目 key；`questionnaire-translation-package.mjs` 负责把 Codex、DeepSeek 和人工核对结果写成统一的运行时/导出结构。Codex 构建不会覆盖人工核对文件。

### 翻译提示词约束

DeepSeek 和非英文 Codex 草稿使用 `translation-prompt-config.mjs` 中的多语言翻译规范；英文 Codex 草稿使用 `translations/reference/` 下的健身问卷英文规范包。多语言规范包含：

- 健身、减重问卷的产品背景和专业教练语气。
- 忠实原意、自然语法、移动端长度、格式保留和禁止中文残留等共享约束。
- 英文、泰语、马来语、德语、土耳其语、法语、乌克兰语和阿拉伯语（沙特）各自的语气和语言习惯要求。
- SPAX、BMI、BMR、目标体重、训练计划等固定术语表。
- 每条文案所在的页面名称、页面顺序、文案顺序和 UI 类型，供模型消除歧义。

通用多语言提示词使用中文编写，版本为 `questionnaire-localization-v3`。英文 Codex 结果记录专用英文规范包 `fitness-questionnaire-en-US-v2.0.0` 和提示词 `fitness-questionnaire-en-US-prompt-v2.0.0`；其他 Codex 语言记录通用提示词版本。每个 DeepSeek 语言包记录提示词版本及该语言的提示词指纹。

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
offline-web-mvp/assets/data/deepseek-questionnaire-translations.<locale>.js
```

逐文案缓存位于 `.qa-cache/deepseek-translations/`。中文、页面上下文、模型或提示词未变化时，再次运行不会重复请求；只有新增、修改、约束变化或校验失败的文案会重新调用接口。生成器会检查漏译、空译文和目标译文中的中文残留。

## 人工核对

- 人工核对的初始内容来自 `assets/data/review-questionnaire-text.js`，不会再直接复制“中文基准”栏的内容。
- “中文基准”与 AI 翻译仍使用 `assets/data/zh-questionnaire-text.js`，两套数据相互独立。
- 编辑停止约 600 毫秒后会自动保存当前页；切换页面、动态子项、顶部语言或核对模式前会立即保存，数据保存在当前浏览器的 `localStorage`。
- `保存当前页`：保留为立即保存按钮，可在自动保存等待期间手动触发。
- `重置当前页`：只将当前页恢复到导入的人工核对初始稿，其他页面已保存的修改不受影响。
- `导出修改后的文案`：导出前会立即保存当前页，并导出全部主页面与动态子项；其他页面保留人工核对初始稿。

每次导出使用唯一文件名，例如：

```text
zh-questionnaire-text.reviewed-2pages-20261104-181745.js
```

导出的内容仍是：

```js
window.QUESTIONNAIRE_TEXTS = [/* 39 页完整数据 */]
```

其页面和数组结构与 `assets/data/review-questionnaire-text.js` 一致，每条文案会保留两个审核字段：

```js
{
  key: '稳定文案标识',
  text: '导出的最终文案',
  dynamic: false,
  modified: true,
  originalText: '修改前的中文基准'
}
```

`modified` 表示最终文案是否与 `originalText` 不同；`originalText` 始终保留导入人工核对稿中的原始文案。新增字段不会影响当前网页读取，可以在确认后将导出结果用于更新正式文案数据。

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

人工更新截图并完成 39 页截图清单后，先合并最新中文基准：

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
│  ├─ codex-questionnaire-translations.<locale>.js
│  ├─ deepseek-questionnaire-translations.<locale>.js
│  └─ reviewed-questionnaire-translations.<locale>.js
└─ screenshots/
   └─ zh/01.png ... 39.png
```

页面运行只需要 39 张中文截图。页面没有 CDN、npm 包、数据库或外部接口依赖。

`index.html` 通过 `ASSET_VERSION` 和脚本 URL 的 `?v=` 参数控制静态资源缓存。每次更新中文基准、AI 翻译数据或截图后，都需要同步修改该版本值，确保 GitHub Pages 访问者不会继续读取浏览器中的旧文件。

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
