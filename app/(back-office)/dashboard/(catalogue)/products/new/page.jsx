// "use client";
import FormHeader from "@/components/backoffice/FormHeader";
import ProductForm from "@/components/backoffice/form/ProductForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function NewProduct() {
  try {
    const categoriesData = await getData("categories");
    const userData = await getData("users");

    // ตรวจสอบว่า userData เป็นอาร์เรย์ก่อนที่จะใช้ filter
    const farmersData = Array.isArray(userData) ? userData.filter((user) => user.role === "FARMER") : [];

    const farmers = farmersData.map((farmer) => ({
      id: farmer.id,
      title: farmer.name,
    }));

    const categories = categoriesData.map((category) => ({
      id: category.id,
      title: category.title,
    }));

    return (
      <div>
        <FormHeader title="New Product" />
        <ProductForm categories={categories} farmers={farmers} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}
