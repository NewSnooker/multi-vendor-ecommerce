import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
export const dynamic = "force-dynamic";
const page = async () => {
  const farmers = await getData("farmers");
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Farmers"
        linkTitle="Add Farmers"
        href="/dashboard/farmers/new"
      />

      <div className="py-8">
        <DataTable data={farmers} columns={columns} filterKeys={["name","email","createdAt"]}/>
      </div>
    </div>
  );
};

export default page;
