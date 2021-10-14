import { Router } from '@angular/router';

interface Route {
  name: string
  data?: any
}

export function getCurrRoute(router: Router): Route {

  let root = router.routerState.snapshot.root;
  let route: Route = {
    name: ''
  };

  while (root) {
    if (root.children && root.children.length) {
      root = root.children[0];
    } 
    // else if (root.data) {
    //   console.log(root.data);
    //   return
    // } 
    else {
      route.name = root.url[0].path;
      break;
    }
  }
  return route;
}