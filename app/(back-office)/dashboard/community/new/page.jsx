import FormHeader from "@/components/backoffice/FormHeader";
import TrainingForm from "@/components/backoffice/form/TrainingForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function NewTraining() {
  try {
    const categoriesData = await getData("categories");

    // ตรวจสอบว่า categoriesData เป็นอาร์เรย์ก่อนที่จะใช้ map
    const categories = Array.isArray(categoriesData) ? categoriesData.map((category) => ({
      id: category.id,
      title: category.title,
    })) : [];

    return (
      <div>
        <FormHeader title="New Training" />
        <TrainingForm categories={categories} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return <div>Error loading categories. Please try again later.</div>;
  }
}
