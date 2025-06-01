import { Palette } from "lucide-react";
import { Checkboxes } from "@/components/react/radix-ui/CheckedBoxes";
import { Button } from "@/components/react/radix-ui/Button";

const ThemePopoverList = () => {
  return (
    <Button variant="brutal" size="icon">
      <Palette />
    </Button>
  );
};

export { ThemePopoverList };
