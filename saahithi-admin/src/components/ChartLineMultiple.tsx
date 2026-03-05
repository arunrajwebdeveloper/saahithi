import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  posts: {
    label: "Total Posts",
    color: "var(--chart-1)",
  },
  signups: {
    label: "New Signups",
    color: "var(--chart-2)",
  },
  activeAuthors: {
    label: "Active Authors",
    color: "var(--chart-3)",
  },
  premiumSignups: {
    label: "Premium Conversions",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

interface EngagementData {
  date: string;
  posts: number;
  signups: number;
  activeAuthors: number;
  premiumSignups: number;
}

export function ChartLineMultiple({ data = [] }: { data: EngagementData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Trends</CardTitle>
        <CardDescription>
          Relationship between content creation and user growth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-73.5 w-full">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12, top: 12 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleString("en-US", { month: "short" }); // Returns "Jan", "Feb", etc.
              }}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Line
              dataKey="posts"
              type="monotone"
              stroke="var(--color-posts)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="signups"
              type="monotone"
              stroke="var(--color-signups)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="activeAuthors"
              type="monotone"
              stroke="var(--color-activeAuthors)"
              strokeWidth={2}
              // strokeDasharray="5 5"
              dot={false}
            />
            <Line
              dataKey="premiumSignups"
              type="monotone"
              stroke="var(--color-premiumSignups)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="flex items-center justify-center w-full gap-2 leading-none text-muted-foreground">
            Showing cross-platform engagement metrics
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
