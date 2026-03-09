import {
  Avatar as AvatarWrap,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function Avatar({
  src = null,
  alt = "@shadcn",
  size = "default",
}: {
  src?: string | null;
  alt?: string;
  size?: "default" | "sm" | "lg";
}) {
  return (
    <AvatarWrap size={size}>
      <AvatarImage
        src={src || "https://github.com/shadcn.png"}
        alt={alt}
        // className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarWrap>
  );
}
