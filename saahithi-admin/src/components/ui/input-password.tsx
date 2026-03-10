import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

function InputPassword({
  className,
  disabled,
  ...props
}: React.ComponentProps<"input">) {
  const [isShow, setIsShow] = React.useState(false);

  return (
    <div className="relative flex items-center">
      <InputPrimitive
        type={isShow ? "text" : "password"}
        data-slot="input"
        className={cn(
          "dark:bg-input/30 pe-12 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 file:text-foreground placeholder:text-muted-foreground h-9 w-full min-w-0 rounded-md border bg-transparent px-2.5 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3 md:text-sm",
          className,
        )}
        disabled={disabled}
        {...props}
      />
      <div className="-ms-10">
        <Button
          className="cursor-pointer"
          variant="link"
          size="icon-xs"
          onClick={() => setIsShow((prev) => !prev)}
          disabled={disabled}
          render={isShow ? <EyeOff /> : <Eye />}
        />
      </div>
    </div>
  );
}

export { InputPassword };
