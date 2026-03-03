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
import { ChartPieDonut } from "@/components/ChartPieDonut";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full">
      <div className="mb-20">
        <h1 className="font-medium text-2xl text-slate-900 mb-8">
          Analytics Overview
        </h1>
        <div className="flex w-full gap-x-6">
          <div className="w-1/4 h-72 bg-white rounded-lg flex justify-center">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-blue-200 text-blue-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <User size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-slate-800">4.6k</h2>
              <p className="font-normal text-base text-gray-500">Total Users</p>
              <div className="min-h-6"></div>
            </div>
          </div>
          <div className="w-1/4 h-72 bg-white rounded-lg flex justify-center">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-orange-200 text-orange-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <ScrollText size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-slate-800">4.6k</h2>
              <p className="font-normal text-base text-gray-500">Total Posts</p>
              <div className="min-h-6"></div>
            </div>
          </div>
          <div className="w-1/4 h-72 bg-white rounded-lg flex justify-center relative">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-green-200 text-green-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <User size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-slate-800">128</h2>
              <p className="font-normal text-base text-gray-500">User Growth</p>
              <div className="text-gray-400">
                <p className="font-normal text-sm">Last month: 3</p>
              </div>
              <div className="absolute top-6 right-6 flex justify-center items-center text-green-500 gap-x-1">
                <TrendingUp size={18} />
                <p className="font-normal text-sm">310%</p>
              </div>
            </div>
          </div>
          <div className="w-1/4 h-72 bg-white rounded-lg flex justify-center relative">
            <div className="m-auto space-y-2 text-center">
              <div className="bg-yellow-200 text-yellow-600 mx-auto w-16 h-16 rounded-full flex mb-5">
                <FileText size={28} className="m-auto" />
              </div>
              <h2 className="font-bold text-6xl text-slate-800">184</h2>
              <p className="font-normal text-base text-gray-500">
                Posts Growth
              </p>
              <div className="text-gray-400">
                <p className="font-normal text-sm">Last month: 225</p>
              </div>
              <div className="absolute top-6 right-6  flex justify-center items-center text-red-500 gap-x-1">
                <TrendingDown size={18} />
                <p className="font-normal text-sm">12%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex w-full gap-x-6">
          <div className="w-1/2">
            <h1 className="font-medium text-2xl text-slate-900 mb-8">Title</h1>
            <div className="flex w-full gap-x-6">
              <div className="w-full h-72 bg-white rounded-lg">
                <ChartLineMultiple />
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <h1 className="font-medium text-2xl text-slate-900 mb-8">
              Category Distribution
            </h1>
            {/* <div className="flex w-full"> */}
            <div className="w-full h-72 bg-white rounded-lg">
              <ChartPieDonut />
            </div>
            {/* <ChartPieDonut /> */}
            {/* <ChartLineMultiple /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
