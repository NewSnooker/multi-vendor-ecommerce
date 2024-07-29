import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import Loading from "@/app/api/loading";
import { Fragment } from "react"

// คอมโพเนนต์ที่ใช้ในการดึงข้อมูลบันเนอร์
const BannersData = async () => {
  const banners = await getData("banners");
  return (
    <DataTable
      data={banners}
      columns={columns}
      filterKeys={["title", "createdAt"]}
    />
  );
};

const Page = () => {
  return (
    <Fragment>
      {" "}
      <div className="mt-8">
        {/* Header */}
        <PageHeader
          heading="Banners"
          linkTitle="Add Banners"
          href="/dashboard/banners/new"
        />
        <div className="py-8">
          <Suspense fallback={<Loading />}>
            <BannersData />
          </Suspense>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
