import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React, { Suspense } from "react";
import { columns } from "./columns";
import Loading from "@/app/api/loading";
export const dynamic = "force-dynamic";

// คอมโพเนนต์สำหรับดึงข้อมูลหมวดหมู่
const CategoriesData = async() => {
  const categories = await getData("categories");
  return <DataTable data={categories} columns={columns} filterKeys={["title", "createdAt"]} />;
};

const Page = () => {
  return (
    <div className="mt-8">
      {/* Header */}
      <PageHeader
        heading="Categories"
        linkTitle="Add Category"
        href="/dashboard/categories/new"
      />

      <div className="py-8">
        <Suspense fallback={<Loading/>}>
          <CategoriesData />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;