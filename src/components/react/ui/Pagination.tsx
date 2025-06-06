import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/utils/ui/styles";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  )
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />
);
PaginationItem.displayName = "PaginationItem";

const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    isActive?: boolean;
  }
>(({ className, isActive, ...props }, ref) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "inline-flex h-10 w-10 items-center justify-center border-2 border-outline text-sm font-bold transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
      isActive
        ? "bg-primary text-on-primary shadow-[2px_2px_0_0_var(--color-outline)]"
        : "bg-surface text-content-secondary shadow-[2px_2px_0_0_var(--color-outline)] hover:bg-surface-container",
      className
    )}
    {...props}
  />
));
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    aria-label="Go to previous page"
    className={cn(
      "mr-2 flex h-10 w-auto px-4 py-2",
      "border-2 border-outline bg-surface font-bold text-content shadow-[2px_2px_0_0_var(--color-outline)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
      className
    )}
    {...props}
  >
    <ChevronLeft className="mr-2 h-4 w-4" />
    Previous
  </PaginationLink>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof PaginationLink>
>(({ className, ...props }, ref) => (
  <PaginationLink
    aria-label="Go to next page"
    className={cn(
      "ml-2 flex h-10 w-auto px-4 py-2",
      "border-2 border-outline bg-surface font-bold text-content shadow-[2px_2px_0_0_var(--color-outline)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
      className
    )}
    {...props}
  >
    Next
    <ChevronRight className="ml-2 h-4 w-4" />
  </PaginationLink>
));
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex size-9 items-center justify-center text-content-secondary", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
