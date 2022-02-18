# solved question list

- 如何定义全局的方法或者需不需要定义全局方法(不需要每次 import)(vue 是使用 prototype,然后 this.绑定方法名)(需要抛弃这种方式)
- 如何刷新当前路由页面(我是用的是 ngIf 控制,暂时没有)
- 处理时区问题(后端返回 2021-10-22T03:29:31.000Z)(实际时间为 2021-10-22 11:29:31)(后端使用 0 时区)
- spec.ts 是否需要(项目需要单元测试就需要)
- 路由页面会在路由切换(如果不想切换可以使用 provide: RouteReuseStrategy 来让组件复用)
- 如果不是特别需要使用 ngrx(单例数据仓库管理),可以考虑用 service 来实现

# question list

- canload 不生效(canActivate 可生效)
- 定义一个指令 通过条件控制 display 为 block 或者 none(XSS 风险)
- eslint html 文件不生效 ng lint 后每个 html 报错(Parsing error: "parserOptions.project" has been set for @typescript-eslint/parser)
- 单元测试页面报错
- 路由能否自动化加载

# to-do list

- app.module.ts 分离各个模块(√)
- css 变量换肤(√)(侵入性高的问题)(如何应用到框架组件)
- 引入 ngrx(√) ngrx 的持久化(×)
- 使用 service 来实现 ngrx 单例仓库
- 单元测试
- eslint 失效
- 实例销毁时要清理可观察对象
- 没有权限控制
- 学习 rxjs
- 打包测试
