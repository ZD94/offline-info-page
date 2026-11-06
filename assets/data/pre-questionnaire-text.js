(function () {
  'use strict'

  const pages = [
    {
      order: 1,
      name: 'prelude-splash',
      label: '闪屏页面',
      screenshot: '新增-前置01-闪屏页面.png',
      items: [
        { key: 'prelude-splash|manual|text|1', text: 'SPAX', dynamic: false },
        { key: 'prelude-splash|manual|text|2', text: '享受你的运动', dynamic: false }
      ]
    },
    {
      order: 2,
      name: 'prelude-home',
      label: '问卷首页',
      screenshot: '新增-前置02-问卷首页.png',
      items: [
        { key: 'prelude-home|manual|text|1', text: 'SPAX', dynamic: false },
        { key: 'prelude-home|manual|text|2', text: '享受你的运动', dynamic: false },
        { key: 'prelude-home|manual|text|3', text: 'NORTH AMERICAN HOT LIST', dynamic: false },
        { key: 'prelude-home|manual|text|4', text: '2023', dynamic: false },
        { key: 'prelude-home|manual|text|5', text: '开始体验', dynamic: false },
        { key: 'prelude-home|manual|text|6', text: '已有账户？', dynamic: false },
        { key: 'prelude-home|manual|text|7', text: '登录', dynamic: false }
      ]
    },
    {
      order: 3,
      name: 'prelude-login',
      label: '问卷登录页',
      screenshot: '新增-前置03-问卷登录页.png',
      items: [
        { key: 'prelude-login|manual|text|1', text: 'SPAX', dynamic: false },
        { key: 'prelude-login|manual|text|2', text: '登录', dynamic: false },
        { key: 'prelude-login|manual|text|3', text: '邮箱地址', dynamic: false },
        { key: 'prelude-login|manual|text|4', text: '密码', dynamic: false },
        { key: 'prelude-login|manual|text|5', text: '忘记密码？', dynamic: false },
        { key: 'prelude-login|manual|text|6', text: '登录', dynamic: false }
      ]
    },
    {
      order: 4,
      name: 'prelude-forgot-password',
      label: '忘记密码页',
      screenshot: '新增-前置04-忘记密码页.png',
      items: [
        { key: 'prelude-forgot-password|manual|text|1', text: '重置密码', dynamic: false },
        { key: 'prelude-forgot-password|manual|text|2', text: '请输入与您的 SPAX 账户关联的邮箱，我们将发送重置密码的指引给您。', dynamic: false },
        { key: 'prelude-forgot-password|manual|text|3', text: '邮箱', dynamic: false },
        { key: 'prelude-forgot-password|manual|text|4', text: '邮箱地址', dynamic: false },
        { key: 'prelude-forgot-password|manual|text|5', text: '发送', dynamic: false }
      ]
    },
    {
      order: 5,
      name: 'prelude-password-reset-sent',
      label: '忘记密码邮箱发送之后页面',
      screenshot: '新增-前置05-忘记密码邮箱发送之后页面.png',
      items: [
        { key: 'prelude-password-reset-sent|manual|text|1', text: '密码重置链接已发送', dynamic: false },
        { key: 'prelude-password-reset-sent|manual|text|2', text: '重置密码的链接已发送至 wia@onespax.com，重置密码后，请继续登录。', dynamic: true },
        { key: 'prelude-password-reset-sent|manual|text|3', text: '返回登录', dynamic: false }
      ]
    }
  ]

  const offset = pages.length
  const questionnairePages = Array.isArray(window.QUESTIONNAIRE_TEXTS) ? window.QUESTIONNAIRE_TEXTS : []

  window.QUESTIONNAIRE_TEXTS = [
    ...pages,
    ...questionnairePages.map((page, index) => ({ ...page, order: index + offset + 1 }))
  ]
})()
