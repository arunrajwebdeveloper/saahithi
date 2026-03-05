import { Badge } from "@/components/ui/badge";

export function BadgeCustom({ content }: { content: string | number }) {
  return (
    <Badge className="bg-emerald-50 text-emerald-700 dark:bg-blue-950 dark:text-emerald-300">
      {content}
    </Badge>
  );
}
