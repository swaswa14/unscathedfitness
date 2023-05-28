import Head from "next/head";
import AllMembersContent from "@modules/components/members/new/AllMembersContent";
import { useState } from "react";
import DataTable from "@modules/components/ui/data-table";
import { columns } from "@modules/pages/dashboard/transactions/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Title from "@modules/components/dashboard/Title";
import {getAllMembers} from "@modules/utils/axiosApi";



const MemberPage = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const { data, refetch } = useQuery({
    queryKey: ["all_members"],
    queryFn: getAllMembers,
  });
  return (
    <div>
      <Head>
        <title>Member</title>
      </Head>

      <div className="container pr-4 py-8 overflow-hidden">
        <section className="">
          <h2 className=" text-3xl font-bold xl:text-left xl:pl-4 text-gray-800">
            All members
          </h2>
        </section>
        <AllMembersContent
          setSelectedMember={setSelectedMember}
          data={data?.data}
          refetchTransactions={refetch}
          selectedMember={selectedMember}
        />
        {selectedMember !== null && (
          <DataTable
            data={selectedMember?.transactions}
            columns={columns}
            title={"All Transactions"}
          />
        )}
      </div>
    </div>
  );
};

export default MemberPage;
