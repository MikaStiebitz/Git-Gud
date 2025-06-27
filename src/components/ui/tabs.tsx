import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const tabsVariants = cva("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", {
    variants: {
        variant: {
            default: "bg-muted",
            outline: "border border-border bg-transparent",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

const tabsListVariants = cva(
    "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
);

const tabsTriggerVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
);

const tabsContentVariants = cva(
    "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

const Tabs = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof tabsVariants>
>(({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(tabsVariants({ variant }), className)} {...props} />
));
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn(tabsListVariants(), className)} {...props} />,
);
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
    React.ElementRef<"button">,
    React.ComponentPropsWithoutRef<"button"> & { value: string }
>(({ className, ...props }, ref) => <button ref={ref} className={cn(tabsTriggerVariants(), className)} {...props} />);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
    React.ElementRef<"div">,
    React.ComponentPropsWithoutRef<"div"> & { value: string }
>(({ className, ...props }, ref) => <div ref={ref} className={cn(tabsContentVariants(), className)} {...props} />);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
