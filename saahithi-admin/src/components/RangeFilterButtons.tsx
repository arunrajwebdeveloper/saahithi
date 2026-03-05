import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { setRange } from "@/store/features/dashboardSlice";
import type { RangeType } from "@/types/analytics.types";

export const RangeFilterButtons = () => {
  const dispatch = useAppDispatch();
  const { range } = useAppSelector((state: any) => state.dashboard);

  const onChange = (value: RangeType) => {
    dispatch(setRange(value));
  };

  return (
    <ButtonGroup>
      <Button
        onClick={() => onChange("day")}
        variant={range === "day" ? "default" : "outline"}
        size={"lg"}
        className="px-2 max-md:h-9 md:px-5 cursor-pointer text-xs md:text-base"
      >
        Day
      </Button>
      <Button
        onClick={() => onChange("week")}
        variant={range === "week" ? "default" : "outline"}
        size={"lg"}
        className="px-2 max-md:h-9 md:px-5 cursor-pointer text-xs md:text-base"
      >
        Week
      </Button>
      <Button
        onClick={() => onChange("month")}
        variant={range === "month" ? "default" : "outline"}
        size={"lg"}
        className="px-2 max-md:h-9 md:px-5 cursor-pointer text-xs md:text-base"
      >
        Month
      </Button>
      <Button
        onClick={() => onChange("year")}
        variant={range === "year" ? "default" : "outline"}
        size={"lg"}
        className="px-2 max-md:h-9 md:px-5 cursor-pointer text-xs md:text-base"
      >
        Year
      </Button>
    </ButtonGroup>
  );
};
