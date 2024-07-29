import Loading from "@/app/api/loading";
import FormHeader from "@/components/backoffice/FormHeader";
import BannersForm from "@/components/backoffice/form/BannerForm";
import { getData } from "@/lib/getData";
import React, { Suspense } from "react";
export const dynamic = "force-dynamic";
// คอมโพเนนต์ที่ใช้ในการดึงข้อมูลบันเนอร์
const BannerData = async ({ id }) => {
  const banner = await getData(`/banners/${id}`);
  return <BannersForm updateData={banner} />;
};

export default function UpdateBanners({ params: { id } }) {
  return (
    <div>
      <FormHeader title="Update Banner" />
      <Suspense fallback={<Loading />}>
        <BannerData id={id} />
      </Suspense>
    </div>
  );
}
