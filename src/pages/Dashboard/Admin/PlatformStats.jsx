import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Legend,
    Cell
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PlatformStats = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payment, isLoading } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosSecure.get("/payments");
            return res.data; // { payments, totalAmount }
        },
    });

    // all users data
    const { data: users, isLoading: userLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users`);
            return res.data;
        }
    })

    //get total pending or delivered order
    const { data: orderCounts, isLoading: pdOrders } = useQuery({
        queryKey: ["orderStatusCount"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders/status-count");
            return res.data;
        }
    });


    if (isLoading || userLoading || pdOrders) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }
    
    const { totalAmount } = payment
    const { pending, delivered, accepted, cancelled } = orderCounts

    const totalPayments = totalAmount;
    const totalUsers = users.length;
    const ordersPending = orderCounts.pending;
    const ordersDelivered = orderCounts.delivered;
    const totalOrders = pending + delivered + accepted + cancelled;

    const paymentData = [
        { name: "Payments", total: totalAmount },
        { name: "Orders", total: totalOrders },
    ];

    const pieData = [
        { name: "Total Pending Orders", value: pending },
        { name: "Total Accepted Orders", value: accepted },
        { name: "Total Cancelled", value: cancelled },
        { name: "Total Delivered orders", value: delivered },
    ];

    const COLORS = ["#628141", "#ff8400", "#e6ccb2"];

    return (
        <div>
            <title>Platform Statistics | LocalChefBazaar</title>
            <div className="px-4 md:px-8 py-12 pb-32">

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center md:text-left text-[#628141]">
                    Platform Overview & Performance
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ff8400] dark:bg-primary">
                        <p className="text-sm text-gray-500">Total Payment Amount</p>
                        <p className="text-3xl font-bold text-[#628141] mt-2">৳{totalPayments}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ff8400] dark:bg-primary">
                        <p className="text-sm text-gray-500">Total Users</p>
                        <p className="text-3xl font-bold text-[#628141] mt-2">{totalUsers}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ff8400] dark:bg-primary">
                        <p className="text-sm text-gray-500">Orders Pending</p>
                        <p className="text-3xl font-bold text-yellow-600 mt-2">{ordersPending}</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ff8400] dark:bg-primary">
                        <p className="text-sm text-gray-500">Orders Delivered</p>
                        <p className="text-3xl font-bold text-[#628141] mt-2">{ordersDelivered}</p>
                    </div>
                </div>
                 {/* className="grid grid-cols-1 lg:grid-cols-2 gap-8" */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Bar Chart */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ff8400] dark:bg-primary">
                        <h2 className="text-xl font-semibold mb-6">Orders – Pending vs Delivered</h2>
                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={paymentData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="total" fill="#628141" radius={[8, 8, 0, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#ff8400] dark:bg-primary">
                        <h2 className="text-xl font-semibold mb-6">Platform Composition</h2>
                        <div className="w-full h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Tooltip formatter={(v) => `${v}%`} />
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={110}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}`}
                                    >
                                        {pieData.map((e, i) => (
                                            <Cell key={i} fill={["#628141", "#f59e0b", "#ef4444", "#3b82f6"][i]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* মোবাইলে লাস্ট চার্ট যেন কাটা না যায় না */}
                <div className="h-24 md:h-0"></div>

            </div>
        </div>
    );
}
export default PlatformStats;


