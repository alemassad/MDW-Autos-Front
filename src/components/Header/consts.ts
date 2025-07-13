import type { LogoInterface } from "../logo/Logo";
import autoLogo from "../../assets/coche-clasico.png";

export interface HeaderListItem {
  title: string;
  link: string;
}

export interface DropdownMenu {
  title: string;
  items: HeaderListItem[];
}

export type NavItem = HeaderListItem | DropdownMenu;

export const headerList: HeaderListItem[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Autos",
    link: "/autos",
  },
  {
    title: "Login",
    link: "/login",
  },
  {
    title: "Registro",
    link: "/signup",
  },
  {
    title: "Acerca de",
    link: "/about",
  },
];
export const adminList: NavItem[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Users",
    items: [
      {
        title: "Users",
        link: "/users",
      },
      {
        title: "Buscar Usuario",
        link: "/users/buscar",
      },
      {
        title: "Agregar Usuario",
        link: "/users/agregar",
      },
      {
        title: "Modificar Usuario",
        link: "/users/modificar",
      },
      {
        title: "Eliminar Usuario",
        link: "/users/borrar",
      },
    ],
  },
  {
    title: "Autos",
    items: [
      {
        title: "Autos",
        link: "/autos",
      },
      {
        title: "Buscar auto",
        link: "/autos/buscar",
      },
      {
        title: "Eliminar auto",
        link: "/autos/borrar",
      },
      {
        title: "Agregar auto",
        link: "/autos/agregar",
      },
      {
        title: "Modificar auto",
        link: "/autos/modificar",
      },
    ],
  },
  {
    title: "Categorías",
    items: [
      {
        title: "Categorías",
        link: "/categories",
      },
      {
        title: "Buscar categoría",
        link: "/categories/buscar",
      },
      {
        title: "Agregar categoría",
        link: "/categories/agregar",
      },
      {
        title: "Modificar categoría",
        link: "/categories/modificar",
      },
      {
        title: "Eliminar categoría",
        link: "/categories/borrar",
      },
    ],
  },
  {
    title: "Acerca de",
    link: "/about",
  },
];

export const tokenList: NavItem[] = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Users",
    link: "/users",
  },
  {
    title: "Autos",
    items: [
      {
        title: "Autos",
        link: "/autos",
      },
      {
        title: "Buscar auto",
        link: "/autos/buscar",
      },
    ],
  },
  {
    title: "Categories",
    items: [
      {
        title: "Categories",
        link: "/categories",
      },
      {
        title: "Buscar categoría",
        link: "/categories/buscar",
      },
    ],
  },
  {
    title: "Acerca de",
    link: "/about",
  },
];

export const logoData: LogoInterface[] = [
  {
    src: autoLogo,
    href: "https://mdw-autos-front.vercel.app",
    className: "logo-react",
    alt: "MDW Autos logo",
  },
];

