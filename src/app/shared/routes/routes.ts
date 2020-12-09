export class Routes {
  static BASEURL: string = 'https://localhost:5001';
  static PREFIX: string = 'api';
  static VERSION: string = 'v1';

  static Auth = class {
    static LOGIN: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/identity/login`;
    static REGISTER: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/identity/register`;
  };

  static Post = class {
    static GETALL: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/posts`;
    static GETPAGINATED: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/postsPaginated`;
    static ADD: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/posts`;
    static DELETE: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/posts`;
    static UPDATE: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/posts`;
    static COUNT: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/posts/count`;
    static RECOMMENDED: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/posts/search`;
  };

  static Tags = class {
    static GETALL: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/tags`;
    static GETPAGINATED: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/tagsPaginated`;
    static COUNT: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/tags/count`;
    static ADD: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/tags`;
    static DELETE: string = `${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/tags`;
  };
}
