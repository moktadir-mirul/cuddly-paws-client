import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ChartOfPayment = () => {
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axiosSecure.get("/donation-payments");
        const formatted = res.data.map((item) => ({
          name: item.donatedBy || "Anonymous",
          value: Number(item.amount),
        }));

        const aggregated = formatted.reduce((acc, curr) => {
          const existing = acc.find((d) => d.name === curr.name);
          if (existing) {
            existing.value += curr.value;
          } else {
            acc.push({ ...curr });
          }
          return acc;
        }, []);
        setData(aggregated);
      } catch (err) {
        toast.error("Error fetching donations:", err);
      }
    };
    fetchDonations();
  }, [axiosSecure]);
  const COLORS = [
    "#3B82F6", // blue-500
    "#0EA5E9", // sky-500
    "#F59E0B", // amber-500
    "#10B981", // emerald-500
    "#EF4444", // red-500
    "#8B5CF6", // violet-500
  ];

  return (
    <div className="w-full shadow-md rounded-2xl bg-white dark:bg-gray-800 p-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 dark:text-sky-400">
        Donation Distribution by Donor
      </h2>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                color: "#000",
              }}
              labelStyle={{ color: "#000" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartOfPayment;
