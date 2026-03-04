import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RangeSelect({
  data = [],
  selectedValue,
  setSelectedValue,
}: {
  data: { value: string; label: string }[];
  selectedValue: string | null;
  setSelectedValue: (value: string | null) => void;
}) {
  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="w-full max-w-36">
        <SelectValue placeholder="Select a range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Range</SelectLabel>
          {data?.map(({ value, label }) => {
            return (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
