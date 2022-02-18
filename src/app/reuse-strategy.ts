import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';

export class ReuseStrategy implements RouteReuseStrategy {
  public static handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // 若是全缓存可去掉此分支
    if (!route.data.keep) {
      return false;
    }
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    ReuseStrategy.handlers[this.getRouteUrl(route)] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!ReuseStrategy.handlers[this.getRouteUrl(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!ReuseStrategy.handlers[this.getRouteUrl(route)]) {
      return null;
    }
    return ReuseStrategy.handlers[this.getRouteUrl(route)];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return (
      future.routeConfig === curr.routeConfig &&
      JSON.stringify(future.params) === JSON.stringify(curr.params)
    );
  }

  /** 使用route的path作为快照的key */
  getRouteUrl(route: ActivatedRouteSnapshot) {
    const path = route.url.map(ele => ele.path).join('_');
    return path;
  }
}
