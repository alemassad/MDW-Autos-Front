export interface LogoInterface {
    src: string;
    href: string;
    className: string;
    alt: string;
}

const Logo = ({href, src, className, alt}: LogoInterface) => {
    return (
     <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={src} className={className} alt={alt} />
        </a>
    );
}
export default Logo;