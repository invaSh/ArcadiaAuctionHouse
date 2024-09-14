import React from "react";
import DashboardCard from "../components/admin/DashboardCard";
import { getViews } from "../actions/dashboardActions";
import { getItems } from "../actions/itemActions";
import { FaEye, FaHandDots, FaUserLarge } from "react-icons/fa6";
import { GiColumnVase } from "react-icons/gi";
import { getAllBids } from "../actions/bidActions";
import { getUsers } from "../actions/userActions";
import LineChart from "../components/admin/charts/LineChart";
import BarChart from "../components/admin/charts/BarChart";
import Notifications from "../components/admin/Notifications";

async function Dashboard() {
  const views = await getViews();
  const bids = (await getAllBids()).length;
  const itemsArr = await getItems();
  const itemsWon = itemsArr.items.filter((i) => i.winner != null);
  const users = await getUsers();

  return (
    <div className="mt-5 py-12" style={{ paddingRight: "125px" }}>
      <h2 className="text-3xl text-gray-500 text-center my-12">Dashboard</h2>
      <div className="grid grid-cols-12 gap-3">
        <DashboardCard
          no={views}
          text={"Total Views"}
          icon={<FaEye />}
          color={"#a064fc"}
        />
        <DashboardCard
          no={bids}
          text={"Total Bids"}
          icon={<FaHandDots />}
          color={"#FFCE56"}
        />
        <DashboardCard
          no={itemsWon.length}
          text={"Items won"}
          icon={<GiColumnVase />}
          color={"#FF6384"}
        />
        <DashboardCard
          no={users.length}
          text={"No. users"}
          icon={<FaUserLarge />}
          color={"#36A2EB"}
        />
      </div>
      <div className="my-8 grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <LineChart />
        </div>
        <div className="col-span-12 md:col-span-6">
          <BarChart />
        </div>
      </div>
      <div>
        <Notifications />
      </div>
    </div>
  );
}

export default Dashboard;
