import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  HiOutlineUsers,
  HiOutlineBuildingOffice2,
  HiOutlineCurrencyDollar,
  HiOutlineDocument,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi2";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get(
          "http://localhost:5000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(summary.data);
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-170 min-h-screen ">
      <h3 className="text-3xl font-extrabold text-gray-800 mb-8">
        Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          icon={<HiOutlineUsers className="text-blue-500 text-4xl" />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-blue-100"
        />
        <SummaryCard
          icon={<HiOutlineBuildingOffice2 className="text-purple-500 text-4xl" />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-purple-100"
        />
        <SummaryCard
          icon={<HiOutlineCurrencyDollar className="text-green-500 text-4xl" />}
          text="Monthly Salary"
          number={`$${summary.totalSalary}`}
          color="bg-green-100"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-extrabold text-gray-800 mb-8">
          Leave Details
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCard
            icon={<HiOutlineDocument className="text-teal-500 text-4xl" />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-100"
          />
          <SummaryCard
            icon={<HiOutlineCheckCircle className="text-emerald-500 text-4xl" />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-emerald-100"
          />
          <SummaryCard
            icon={<HiOutlineClock className="text-orange-500 text-4xl" />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-orange-100"
          />
          <SummaryCard
            icon={<HiOutlineXCircle className="text-red-500 text-4xl" />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-100"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
