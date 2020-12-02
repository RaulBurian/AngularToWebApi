export class Routes{
  static BASEURL: string="https://localhost:5001";
  static PREFIX: string="api";
  static VERSION: string="v1";

  static Auth= class{
    static LOGIN: string=`${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/identity/login`;
    static REGISTER: string=`${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/identity/register`;
  };

  static Post= class{
    static GETALL: string=`${Routes.BASEURL}/${Routes.PREFIX}/${Routes.VERSION}/posts`;
  };
}
