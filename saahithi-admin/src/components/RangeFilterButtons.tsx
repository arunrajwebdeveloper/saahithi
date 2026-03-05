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
        className="px-5 cursor-pointer"
      >
        Day
      </Button>
      <Button
        onClick={() => onChange("week")}
        variant={range === "week" ? "default" : "outline"}
        size={"lg"}
        className="px-5 cursor-pointer"
      >
        Week
      </Button>
      <Button
        onClick={() => onChange("month")}
        variant={range === "month" ? "default" : "outline"}
        size={"lg"}
        className="px-5 cursor-pointer"
      >
        Month
      </Button>
      <Button
        onClick={() => onChange("year")}
        variant={range === "year" ? "default" : "outline"}
        size={"lg"}
        className="px-5 cursor-pointer"
      >
        Year
      </Button>
    </ButtonGroup>
  );
};
