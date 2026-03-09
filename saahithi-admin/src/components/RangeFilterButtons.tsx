import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { setRange } from "@/store/features/dashboardSlice";
import type { RangeType } from "@/types/dashboard.types";
import { rangeList } from "@/assets/data";

export const RangeFilterButtons = () => {
  const dispatch = useAppDispatch();
  const { range } = useAppSelector((state: any) => state.dashboard);

  const onChange = (value: RangeType) => {
    dispatch(setRange(value));
  };

  return (
    <ButtonGroup>
      {rangeList?.map(({ value, label }) => {
        return (
          <Button
            key={`range-button-${value}`}
            onClick={() => onChange(value as RangeType)}
            variant={range === value ? "default" : "outline"}
            size={"lg"}
            className="px-2 max-md:h-9 md:px-5 cursor-pointer text-xs md:text-base"
          >
            {label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
