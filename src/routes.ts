export type RouteConfig = {
  name: string;
  path: string;
}

export type RedirectConfig = {
  path: string;
  redirect: string;  
}

export type Config = RouteConfig | RedirectConfig;

const routes: Config[] = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    name: 'admin',
    path: '/admin',
  },
  {
    name: 'login',
    path: '/login',
  },
];

export default routes;
