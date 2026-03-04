import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface CategoryData {
  category: string;
  count: number;
  percentage: number;
}

export function CategoryDonut({ data = [] }: { data: CategoryData[] }) {
  const processedData = data.map((item, index) => ({
    name: item.category,
    value: item.count,
    fill: `var(--chart-${(index % 9) + 1})`,
  }));

  const chartConfig = data.reduce(
    (acc, item, index) => {
      acc[item.category] = {
        label: item.category.charAt(0).toUpperCase() + item.category.slice(1),
        color: `hsl(var(--chart-${(index % 9) + 1}))`,
      };
      return acc;
    },
    {
      count: { label: "Posts" },
    } as ChartConfig,
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Content Distribution</CardTitle>
        <CardDescription>Based on post categories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-72"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={processedData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing distribution for {data.length} categories
        </div>
      </CardFooter>
    </Card>
  );
}
