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
      className="inline-flex shrink-0 items-center justify-center p-2"
    >
      <img
        src={logo.src}
        alt="logo"
        width={24}
        height={24}
        loading="eager"
        decoding="async"
        className="h-8 w-8 shrink-0 object-contain"
        style={{ aspectRatio: "1/1", minWidth: "32px", minHeight: "32px" }}
      />
    </Link>
  );
};

export { Logo };
