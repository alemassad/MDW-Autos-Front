import type { LogoInterface } from "../logo/Logo";
import autoLogo from "../../assets/coche-clasico.png";

interface HeaderList {
  title: string;
  link: string;
  isCategoryLink?: boolean;
}

export const headerList: HeaderList[] = [
  {
    title: "Home",
    link: "/",
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
export const tokenList: HeaderList[] = [
  {
    title: "Home",
    link: "/",
  },
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
  {
    title: "Categorías",
    link: "/categories",
    isCategoryLink: true,
  },
  {
    title: "Buscar categoría",
    link: "/categories/buscar",
    isCategoryLink: true,
  },
  {
    title: "Agregar categoría",
    link: "/categories/agregar",
    isCategoryLink: true,
  },
  {
    title: "Modificar categoría",
    link: "/categories/modificar",
    isCategoryLink: true,
  },
  {
    title: "Eliminar categoría",
    link: "/categories/borrar",
    isCategoryLink: true,
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
