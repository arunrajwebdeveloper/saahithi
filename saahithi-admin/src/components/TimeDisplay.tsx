import { useRelativeTime } from "@/utils/dateFormatter";

export const TimeDisplay = ({
  date,
  prefix,
}: {
  date: string;
  prefix: string | null;
}) => {
  const relativeTime = useRelativeTime(date);
  return <p>{`${prefix ? prefix : ""} ${relativeTime}`}</p>;
};
