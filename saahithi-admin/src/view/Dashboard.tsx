import {
  FileText,
  Gem,
  Layers2,
  ScrollText,
  TrendingDown,
  TrendingUp,
  User,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ChartLineMultiple } from "@/components/ChartLineMultiple";
import { ChartBarInteractive } from "@/components/ChartBarInteractive";
import { ButtonGroupElement } from "@/components/ButtonGroupElement";
import { UserTableLayout } from "@/components/UserTableLayout";
import { useAnalytics } from "@/hooks/useAnalytics";
import { formatNumber } from "@/utils";
import { cn } from "@/lib/utils";
import { AppSpinner } from "@/components/AppSpinner";
import { ActiveAuthorTableLayout } from "@/components/ActiveAuthorTableLayout";
import { PostTableLayout } from "@/components/PostTableLayout";
import { CategoryDonut } from "@/components/CategoryDonut";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    analytics,
    overallProgress,
    range,
    isLoadingDashboard,
    isLoadingOverallProgress,
    onChangeRange,
  } = useAnalytics({
    enabled: true,
  });

  if (isLoadingDashboard) return <AppSpinner />;

  const {
    totalUsers,
    totalPosts,
    userGrowth,
    postGrowth,
    totalPremiumUsers,
    mostActiveAuthors,
    recentUsers,
    recentPosts,
    categoryDistribution,
  } = analytics;

  return (
    <div className="min-h-screen w-full">
      <div className="mb-20">
        <h1 className="font-medium text-xl text-slate-900 mb-8">
          Analytics Overview
        </h1>
        <div className="flex w-full gap-x-6">
          <div className="w-1/4 h-72 bg-white rounded-lg flex justify-center">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-blue-200 text-blue-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <User size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-slate-800">
                {formatNumber(totalUsers)}
              </h2>
              <p className="font-normal text-base text-gray-500">Total Users</p>
              <div className="min-h-6">
                <p className="font-normal text-sm text-emerald-600">
                  {totalPremiumUsers} Premium members
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/4 h-72 bg-white rounded-lg flex justify-center">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-orange-200 text-orange-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <ScrollText size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-slate-800">
                {formatNumber(totalPosts)}
              </h2>
              <p className="font-normal text-base text-gray-500">Total Posts</p>
              <div className="min-h-6"></div>
            </div>
          </div>
          <div className="w-1/4 h-72 bg-white rounded-lg flex justify-center relative">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-green-200 text-green-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <User size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-slate-800">
                {formatNumber(userGrowth.thisMonth)}
              </h2>
              <p className="font-normal text-base text-gray-500">User Growth</p>
              <div className="text-gray-400">
                <p className="font-normal text-sm">
                  Last month: {userGrowth.lastMonth}
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
          </div>
          <div className="w-1/4 h-72 bg-white rounded-lg flex justify-center relative">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-yellow-200 text-yellow-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <FileText size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-slate-800">
                {formatNumber(postGrowth.thisMonth)}
              </h2>
              <p className="font-normal text-base text-gray-500">
                Posts Growth
              </p>
              <div className="text-gray-400">
                <p className="font-normal text-sm">
                  Last month: {postGrowth.lastMonth}
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
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-8">
            <h1 className="font-medium text-xl text-slate-900">
              Total Progress
            </h1>
            <ButtonGroupElement
              selected={range}
              onChangeRange={onChangeRange}
            />
          </div>
          <div className="flex w-full gap-x-6">
            <div className="w-full bg-white rounded-lg">
              <ChartBarInteractive
                chartData={overallProgress}
                isLoading={isLoadingOverallProgress}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="flex w-full gap-x-6">
          <div className="w-1/2">
            {/* <h1 className="font-medium text-xl text-slate-900 mb-8">
              Growth Summary
            </h1> */}
            <div className="flex w-full gap-x-6">
              <div className="w-full h-72 bg-white rounded-lg">
                <ChartLineMultiple height={250} />
              </div>
            </div>
          </div>

          <div className="w-1/2">
            {/* <h1 className="font-medium text-xl text-slate-900 mb-8">
              Category Distribution
            </h1> */}
            <div className="w-full bg-white rounded-lg">
              <CategoryDonut data={categoryDistribution} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="flex w-full gap-x-6">
          <div className="w-1/3">
            <h1 className="font-medium text-xl text-slate-900 mb-8">
              Most Active Authors
            </h1>
            <div className="flex w-full gap-x-6">
              <div className="w-full  bg-white rounded-lg p-4">
                <ActiveAuthorTableLayout data={mostActiveAuthors} />
              </div>
            </div>
          </div>

          <div className="w-1/3">
            <h1 className="font-medium text-xl text-slate-900 mb-8">
              Recent Users
            </h1>
            <div className="flex w-full gap-x-6">
              <div className="w-full bg-white rounded-lg p-4">
                <UserTableLayout data={recentUsers} />
              </div>
            </div>
          </div>

          <div className="w-1/3">
            <h1 className="font-medium text-xl text-slate-900 mb-8">
              Recent Posts
            </h1>
            <div className="w-full bg-white rounded-lg p-4">
              <PostTableLayout data={recentPosts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
