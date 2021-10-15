import { Router } from '@angular/router';

// 返回路由模型
interface Route {
  name: string
  data?: any
}

// 获取当前路由path
export function getCurrRoute(router: Router): Route {

  let root = router.routerState.snapshot.root;
  let route: Route = {
    name: ""
  };
  while (root) {
    if (root.children && root.children.length) {
      root = root.children[0];
    } 
    else {
      route.name = root.url[0].path;
      root.data && (route.data = root.data);
      break;
    }
  }
  return route;
}