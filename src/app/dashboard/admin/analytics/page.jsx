import EngineDensityChart from "@/components/Dashboard/admin/EngineDensityChart";
import PromptDistributionChart from "@/components/Dashboard/admin/PromptDistributionChart";
import { adminAnalytics } from "@/lib/admin/data";
import {
  Users,
  FileText,
  MessageSquare,
  Copy,
  DollarSign,
} from "lucide-react";

const AdminAnalytics = async () => {
  const data = await adminAnalytics();
  
  const stats = [
    {
      title: "TOTAL USERS",
      value: data.totalUsers,
      icon: <Users size={22} />,
    },
    {
      title: "TOTAL PROMPTS",
      value: data.totalPrompts,
      icon: <FileText size={22} />,
    },
    {
      title: "TOTAL REVIEWS",
      value: data.totalReviews,
      icon: <MessageSquare size={22} />,
    },
    {
      title: "TOTAL COPIES",
      value: data.totalCopies,
      icon: <Copy size={22} />,
    },
    {
      title: "TOTAL REVENUE",
      value: `$${data.totalRevenue}`,
      icon: <DollarSign size={22} />,
    },
  ];

  return (
    <section className="w-full min-h-screen bg-[#ebdcc9] text-[#2c221e] p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8 border-b-2 border-[#dfcbaf] pb-5">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
          Administrative System Analytics
        </h1>
        <p className="text-[#2c221e]/70 mt-2 text-xs md:text-sm font-semibold">
          Aggregate metrics and engine distribution breakdowns.
        </p>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/20 border-2 border-[#dfcbaf] rounded-2xl p-5 md:p-6 flex items-center gap-4 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 border-[#2c221e] bg-[#2c221e] text-[#ebdcc9] shrink-0"
            >
              {stat.icon}
            </div>

            <div className="min-w-0">
              <p className="text-[#2c221e]/60 text-[10px] md:text-xs font-black uppercase tracking-wider truncate">
                {stat.title}
              </p>
              <h2 className="text-2xl md:text-3xl font-black mt-1 text-[#2c221e] tracking-tight truncate">
                {stat.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6 lg:gap-10 my-8 md:my-10">
        <div className="w-full lg:w-1/2 flex">
          <EngineDensityChart prompts={data.prompts} />
        </div>
        <div className="w-full lg:w-1/2 flex">
          <PromptDistributionChart prompts={data.prompts} />
        </div>
      </div>
    </section>
  );
};

export default AdminAnalytics;