import type { LogoInterface } from "../logo/Logo";
import autoLogo from "../../assets/coche-clasico.png";

interface HeaderList{
    title: string;
    link: string;
}

export const headerList: HeaderList[] = [
    {
        title: "Home",
        link: "/"
    },
    {
        title: "Login",
        link: "/login"
    },
    {
        title: "Registro",
        link: "/signup"
    },
    {
        title: "Acerca de",
        link: "/about"
    }
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
