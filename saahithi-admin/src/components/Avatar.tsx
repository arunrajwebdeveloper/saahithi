import {
  Avatar as AvatarWrap,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

export function Avatar() {
  return (
    <AvatarWrap>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </AvatarWrap>
  );
}
