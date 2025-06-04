import { Button } from "../radix-ui/Button";
import logo from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <Button variant="brutal-normal" className="p-2">
      <img
        src={logo.src}
        alt="logo"
        width={24}
        height={24}
        loading="eager"
        decoding="async"
        className="h-8 w-8"
        style={{ aspectRatio: "1/1" }}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    </Button>
  );
};

export { Logo };
