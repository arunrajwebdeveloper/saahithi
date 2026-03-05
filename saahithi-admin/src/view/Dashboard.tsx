import {
  FileText,
  Gem,
  ScrollText,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { ChartLineMultiple } from "@/components/ChartLineMultiple";
import { ChartBarInteractive } from "@/components/ChartBarInteractive";
import { UserTableLayout } from "@/components/UserTableLayout";
import { useAnalytics } from "@/hooks/useAnalytics";
import { formatNumber } from "@/utils";
import { cn } from "@/lib/utils";
import { AppSpinner } from "@/components/AppSpinner";
import { ActiveAuthorTableLayout } from "@/components/ActiveAuthorTableLayout";
import { PostTableLayout } from "@/components/PostTableLayout";
import { CategoryDonut } from "@/components/CategoryDonut";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const { user } = useAuth();
  const { analytics, isLoadingDashboard } = useAnalytics({
    enabled: true,
  });

  if (isLoadingDashboard) return <AppSpinner />;

  const {
    totalUsers,
    totalPosts,
    unpublishedPosts,
    userGrowth,
    postGrowth,
    totalPremiumUsers,
    mostActiveAuthors,
    recentUsers,
    recentPosts,
    categoryDistribution,
    progressData,
    engagementTrends,
  } = analytics;

  return (
    <div className="min-h-screen w-full">
      <div className="mb-16 select-none pointer-events-none">
        <h1 className="font-medium text-3xl text-card-foreground mb-2">
          Welcome back, {user?.firstName ?? "Admin"}!
        </h1>
        <p className="font-normal text-base text-gray-500 dark:text-gray-400">
          Your community
          <span className="mx-1">
            {userGrowth.isPositive ? "expanded" : "contracted"}
          </span>
          by
          <span
            className={cn(
              "mx-1",
              userGrowth.isPositive ? "text-green-500" : "text-red-500",
            )}
          >
            <small>{userGrowth.growth}%</small>
            {userGrowth.isPositive ? (
              <TrendingUp size={18} className="inline-block" />
            ) : (
              <TrendingDown size={18} className="inline-block" />
            )}
          </span>
          this period, with a
          <span
            className={cn(
              "mx-1",
              postGrowth.isPositive ? "text-green-500" : "text-red-500",
            )}
          >
            <small>{postGrowth.growth}%</small>
            {postGrowth.isPositive ? (
              <TrendingUp size={18} className="inline-block" />
            ) : (
              <TrendingDown size={18} className="inline-block" />
            )}
          </span>
          <span className="mx-1">
            {postGrowth.isPositive ? "rise" : "fall"}
          </span>
          in content activity.
        </p>
      </div>
      <div className="mb-12">
        <h1 className="font-medium text-xl text-card-foreground mb-8">
          Analytics Overview
        </h1>
        <div className=" w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="h-72 rounded-lg flex justify-center">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-blue-200 text-blue-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <User size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-card-foreground">
                {formatNumber(totalUsers)}
              </h2>
              <p className="font-normal text-base text-gray-500">Total Users</p>
              <div className="min-h-6">
                <p className="font-normal text-sm text-blue-600">
                  {`${totalPremiumUsers} Premium member${totalPremiumUsers > 1 ? "s" : ""}`}
                </p>
              </div>
            </div>
          </Card>
          <Card className="h-72 rounded-lg flex justify-center">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-orange-200 text-orange-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <ScrollText size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-card-foreground">
                {formatNumber(totalPosts)}
              </h2>
              <p className="font-normal text-base text-gray-500">Total Posts</p>
              <div className="min-h-6">
                <p className="font-normal text-sm text-orange-600">
                  {unpublishedPosts} Unpublished
                </p>
              </div>
            </div>
          </Card>
          <Card className="h-72 rounded-lg flex justify-center relative">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-green-200 text-green-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <Gem size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-card-foreground">
                {formatNumber(userGrowth.currentPeriod)}
              </h2>
              <p className="font-normal text-base text-gray-500">User Growth</p>
              <div className="text-green-600">
                <p className="font-normal text-sm">
                  Previous: {userGrowth.previousPeriod}
                </p>
              </div>
              <div
                className={cn(
                  "absolute top-6 right-6  flex justify-center items-center gap-x-1",
                  userGrowth.isPositive ? "text-green-500" : "text-red-500",
                )}
              >
                {userGrowth.isPositive ? (
                  <TrendingUp size={18} />
                ) : (
                  <TrendingDown size={18} />
                )}
                <p className="font-normal text-sm">{userGrowth.growth}%</p>
              </div>
            </div>
          </Card>
          <Card className="h-72 rounded-lg flex justify-center relative">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-yellow-200 text-yellow-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <FileText size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-card-foreground">
                {formatNumber(postGrowth.currentPeriod)}
              </h2>
              <p className="font-normal text-base text-gray-500">
                Posts Growth
              </p>
              <div className="text-yellow-600">
                <p className="font-normal text-sm">
                  Previous: {postGrowth.previousPeriod}
                </p>
              </div>
              <div
                className={cn(
                  "absolute top-6 right-6  flex justify-center items-center gap-x-1",
                  postGrowth.isPositive ? "text-green-500" : "text-red-500",
                )}
              >
                {postGrowth.isPositive ? (
                  <TrendingUp size={18} />
                ) : (
                  <TrendingDown size={18} />
                )}
                <p className="font-normal text-sm">{postGrowth.growth}%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-8">
            <h1 className="font-medium text-xl text-card-foreground">
              Total Progress
            </h1>
          </div>
          <div className="flex w-full gap-x-6">
            <Card className="w-full">
              <ChartBarInteractive chartData={progressData} />
            </Card>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className=" w-full grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <Card className="w-full">
            <ChartLineMultiple data={engagementTrends} />
          </Card>
          <Card className="w-full">
            <CategoryDonut data={categoryDistribution} />
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <div className="w-full grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <div>
            <h1 className="font-medium text-xl text-card-foreground mb-8">
              Most Active Authors
            </h1>
            <div className="flex w-full gap-x-6">
              <Card className="w-full p-4">
                <ActiveAuthorTableLayout data={mostActiveAuthors} />
              </Card>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl text-card-foreground mb-8">
              Recent Users
            </h1>
            <div className="flex w-full gap-x-6">
              <Card className="w-full p-4">
                <UserTableLayout data={recentUsers} />
              </Card>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl text-card-foreground mb-8">
              Recent Posts
            </h1>
            <Card className="w-full p-4">
              <PostTableLayout data={recentPosts} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
