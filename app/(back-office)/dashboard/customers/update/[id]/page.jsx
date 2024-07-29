import FormHeader from "@/components/backoffice/FormHeader";
import CustomersForm from "@/components/backoffice/form/CustomersForm";
import { getData } from "@/lib/getData";
import React from "react";
export const dynamic = "force-dynamic";

export default async function UpdateCustomers({ params: { id } }) {
  const user = await getData(`users/${id}`);
  return (
    <div>
      <FormHeader title="Update Customers" />
      <CustomersForm userProfile={user.userProfile} user={user} />
    </div>
  );
}
