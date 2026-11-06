(function () {
  'use strict'

  const definitions = [
    {
      name: 'postlude-android-paywall-1',
      label: '安卓计划结束购买页面1',
      screenshot: '新增-后置01-安卓计划结束购买页面1.png',
      texts: [
        'SPAX PRO', '你的训练日历', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Start',
        '个性化训练计划', '为你定制专属训练计划，帮助你快速实现身材蜕变。', '真实用户 & 真实效果',
        '1', '月', { text: '$28.99', dynamic: true }, { text: '$28.99/mo.', dynamic: true }, '80% OFF', '∞',
        '终身访问', { text: '$29.99', dynamic: true }, { text: '$0/mo.', dynamic: true }, '锁定终身权益',
        { text: '已有 1,649,599 人加入该计划', dynamic: true }, '你的订阅可随时取消',
        '购买后，费用将通过 Google Play Store 扣除。订阅将自动续费...', '更多'
      ]
    },
    {
      name: 'postlude-android-paywall-2',
      label: '安卓计划结束购买页面2',
      screenshot: '新增-后置02-安卓计划结束购买页面2.png',
      texts: [
        '真实用户 & 真实效果', '之前', '之后', 'No.1', '健身应用', '下载量', { text: '5,600,000+', dynamic: true },
        { text: '4.8', dynamic: true }, '权威平台认可', 'adidas', 'PHILIPS', 'BMW', 'UMAY', '锁定终身权益',
        { text: '已有 1,649,599 人加入该计划', dynamic: true }, '你的订阅可随时取消',
        '购买后，费用将通过 Google Play Store 扣除。订阅将自动续费...', '更多'
      ]
    },
    {
      name: 'postlude-android-membership-terms',
      label: '安卓购买页会员协议',
      screenshot: '新增-后置03-安卓购买页会员协议.png',
      texts: [
        '权威平台认可', 'adidas', 'PHILIPS', 'BMW', 'UMAY', '关于我们的团队',
        '为个人提供精准且个性化的训练建议与指导，确保训练的准确性与有效性，包括根据个人需求和目标对姿势、动作和训练强度进行个性化调整。',
        '你的订阅可随时取消',
        '点击继续并选择 Google Pay 支付订阅费用。支付成功后，订阅将以相同套餐和价格自动续费，除非你在当前订阅周期结束前24小时取消。点击继续即表示你同意我们的隐私政策和用户协议。',
        '知道了'
      ]
    },
    {
      name: 'postlude-ios-paywall-1',
      label: 'IOS计划结束购买页1',
      screenshot: '新增-后置04-IOS计划结束购买页1.png',
      texts: [
        'SPAX PRO', '真实用户 & 真实效果', '之前', '之后', 'No.1', '健身应用', '下载量',
        { text: '5,600,000+', dynamic: true }, { text: '4.8', dynamic: true }, '权威平台认可',
        '1', '月', { text: '¥68.0', dynamic: true }, { text: '¥68.0/月', dynamic: true }, '80% OFF', '∞',
        '终身访问', { text: '¥298.0', dynamic: true }, { text: '¥0.0/月', dynamic: true }, '锁定终身权益',
        { text: '已有 1,649,599 人加入该计划', dynamic: true }
      ]
    },
    {
      name: 'postlude-ios-paywall-2',
      label: 'IOS计划结束购买页2',
      screenshot: '新增-后置05-IOS计划结束购买页2.png',
      texts: [
        'SPAX PRO', '真实用户 & 真实效果', '之前', '之后', 'No.1', '健身应用', '下载量',
        { text: '5,600,000+', dynamic: true }, { text: '4.8', dynamic: true }, '权威平台认可',
        'adidas', 'PHILIPS', 'BMW', 'UMAY', '关于我们的团队'
      ]
    },
    {
      name: 'postlude-ios-paywall-3',
      label: 'IOS计划结束购买页3',
      screenshot: '新增-后置06-IOS计划结束购买页3.png',
      texts: [
        'SPAX PRO', '下载量', { text: '5,600,000+', dynamic: true }, { text: '4.8', dynamic: true },
        '权威平台认可', 'adidas', 'PHILIPS', 'BMW', 'UMAY', '关于我们的团队',
        '为个人提供精准且个性化的训练建议与指导，确保训练的准确性与有效性，包括根据个人需求和目标对姿势、动作和训练强度进行个性化调整。'
      ]
    },
    {
      name: 'postlude-ios-membership-terms',
      label: 'IOS购买页会员协议',
      screenshot: '新增-后置07-IOS购买页会员协议.png',
      texts: [
        'SPAX PRO', '您的训练日历', 'Start', '个性化训练计划', '量身定制的训练计划，助您快速实现身体蜕变。',
        '真实用户 & 真实效果', '随时可取消',
        '购买确认后，费用将从您的 App Store 账户中收取。除非在当前周期结束前至少 24 小时关闭自动续订，否则订阅将自动续期。在当前周期结束前的 24 小时内，您的账户将按相同金额收取续期费用。订阅可在购买后通过 iTunes Store 中的设置进行管理，并可关闭自动续订。欲了解更多信息，请访问我们的《服务条款》和《隐私政策》。',
        '知道了'
      ]
    },
    {
      name: 'postlude-ios-retention-box',
      label: 'IOS一次挽留宝箱',
      screenshot: '新增-后置08-IOS一次挽留宝箱.png',
      texts: ['Crazy Friday Exclusive Offer Box', 'Give it a spin for your reward', { text: 'Automatic draw in 2 seconds', dynamic: true }]
    },
    {
      name: 'postlude-ios-retention-offer',
      label: 'IOS一次挽留宝箱02',
      screenshot: '新增-后置09-IOS一次挽留宝箱02.png',
      texts: [
        'Expiring today!', 'Save up to 75% on Premium', '75%OFF', 'Discount voucher', '30%OFF', '40%OFF',
        '您的专属优惠将在以下时间后失效', { text: '04 : 59 : 51', dynamic: true },
        { text: '终身版 ¥148.0', dynamic: true }, { text: '现价 ¥148.0/年', dynamic: true }, { text: '¥798.0', dynamic: true },
        '永久解锁所有内容与更新', '立即领取一次性优惠', '不用了，谢谢'
      ]
    },
    {
      name: 'postlude-final-retention',
      label: '二次挽留',
      screenshot: '新增-后置10-二次挽留.png',
      texts: [
        '最后一次专属优惠！', { text: '终身版:¥68.0!', dynamic: true }, '最低价格', '全部 健身课程',
        '全部 训练计划', '全面数据追踪', '抓紧时间！仅剩1分钟！', { text: '00 : 58 : 77', dynamic: true },
        '锁定最终价格', '不用了，谢谢'
      ]
    },
    {
      name: 'postlude-purchase-register',
      label: '购买成功绑定邮箱',
      screenshot: '新增-后置11-购买成功绑定邮箱.png',
      texts: [
        '您好。您已成为尊贵的SPAX会员。', '定制训练计划已添加到日程中。', 'Fitness', 'Intervals',
        '8-Week Fat Loss', '8 weeks · 30 · Beginner', 'Total Body Activa...', '25Min Whole Bod...',
        '25 min · Intermediate · ...', '支付成功', '立即注册', '邮箱', '密码', '不能少于6个字符',
        '继续', '已有账户？ 登录'
      ]
    },
    {
      name: 'postlude-purchase-success',
      label: '购买成功页',
      screenshot: '新增-后置12-购买成功页.png',
      texts: [
        '您好。您已成为尊贵的SPAX会员。', '定制训练计划已添加到日程中。', 'Fitness', 'Intervals',
        '8-Week Fat Loss', '8 weeks · 30 · Beginner', 'Total Body Activa...', '25Min Whole Bod...',
        '25 min · Intermediate · ...', '现在开始锻炼吧，爱上运动。', '让今天成为更美好、更健康生活的起点。',
        '会员可享所有课程、计划和训练营。', 'SPAX将始终陪伴您的变美之旅。', '查看我的专属计划。'
      ]
    }
  ]

  const startOrder = Array.isArray(window.QUESTIONNAIRE_TEXTS) ? window.QUESTIONNAIRE_TEXTS.length : 0
  const pages = definitions.map((definition, pageIndex) => ({
    order: startOrder + pageIndex + 1,
    name: definition.name,
    label: definition.label,
    screenshot: definition.screenshot,
    items: definition.texts.map((entry, itemIndex) => {
      const item = typeof entry === 'string' ? { text: entry, dynamic: false } : entry
      return {
        key: `${definition.name}|manual|text|${itemIndex + 1}`,
        text: item.text,
        dynamic: Boolean(item.dynamic)
      }
    })
  }))
  const reviewPages = pages.map(page => ({
    ...page,
    items: page.items.map(item => ({ ...item, modified: false, originalText: item.text }))
  }))

  window.QUESTIONNAIRE_TEXTS = [...(window.QUESTIONNAIRE_TEXTS ?? []), ...pages]
  window.REVIEW_QUESTIONNAIRE_TEXTS = [...(window.REVIEW_QUESTIONNAIRE_TEXTS ?? []), ...reviewPages]
})()
