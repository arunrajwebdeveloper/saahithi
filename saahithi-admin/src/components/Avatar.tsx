import {
  Avatar as AvatarWrap,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function Avatar({
  src = null,
  alt = "@shadcn",
}: {
  src?: string | null;
  alt?: string;
}) {
  return (
    <AvatarWrap>
      <AvatarImage
        src={src || "https://github.com/shadcn.png"}
        alt={alt}
        // className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarWrap>
  );
}
