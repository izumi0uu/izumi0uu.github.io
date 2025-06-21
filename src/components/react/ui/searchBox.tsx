"use client";

import { useState } from "react";
import { Search } from "lucide-react";

const SearchBox = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-[200px] items-center justify-between rounded-md border border-gray-300 p-2">
      <span>Search...</span>
      <Search className="h-4 w-4" />
    </div>
  );
};

export { SearchBox };
