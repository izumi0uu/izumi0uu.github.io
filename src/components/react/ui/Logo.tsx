import { Link } from "./Link";
import logo from "@/assets/images/logo.png";
import { ROUTES } from "@/constants/routes";
import { getPathWithLocale } from "@/utils/routing/paths";

const Logo = () => {
  return (
    <Link
      href={getPathWithLocale(ROUTES.HOME)}
      variant="brutal-normal"
      size="md"
      className="inline-flex items-center justify-center p-2"
    >
      <img
        src={logo.src}
        alt="logo"
        width={24}
        height={24}
        loading="eager"
        decoding="async"
        className="h-8 w-8"
        style={{ aspectRatio: "1/1" }}
      />
    </Link>
  );
};

export { Logo };
