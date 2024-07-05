import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";
import React from "react";
import UnknownUser from "../../assets/img/dashboard/UnknownUser.png";
import { MdContacts } from "react-icons/md";
import ProfileDetailsPanel from "./ProfileDetailsPanel";

const Settings = ({ user, setUser }) => {
  return (
    <div className="grid grid-cols-profile gap-8">
      <Card className="flex flex-col gap-8 w-fit justify-between items-center">
        <div className="flex flex-col gap-4 items-center">
          <div className="rounded-full border-[5px] border-primary w-fit">
            <img className="rounded-full" src={UnknownUser} width={150} alt="" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-dark font-semibold text-4xl">
              {user && user.fname + " " + user.lname}
            </span>
            <span className="text-slate-400">{user.email}</span>
            <span className="text-slate-400">{"+91 " + user.phone}</span>
          </div>
        </div>
        <div className="flex flex-col items-center bg-danger px-4 py-2 rounded-lg font-mulish">
          <span className="text-sm">Designation</span>
          <span className="text-2xl text-white font-extrabold capitalize">
            {user.position}
          </span>
          <span className="text-dark text-sm">
            Jeevan Shikshan School Guhagar No. 1
          </span>
        </div>
      </Card>
      <Card className="">
        <h1 className="font-bold">Update Details</h1>
        <TabGroup className="h-64">
          <TabList className="mt-8">
            <Tab icon={MdContacts}>Name & Contact</Tab>
          </TabList>
          <TabPanels className="h-full">
            <TabPanel>
              <ProfileDetailsPanel user={user} setUser={setUser} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Card>
    </div>
  );
};

export default Settings;
