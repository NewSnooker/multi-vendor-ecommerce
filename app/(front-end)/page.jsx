import CategoryList from "@/components/frontend/CategoryList";
import CommunityTrainings from "@/components/frontend/CommunityTrainings";
import Hero from "@/components/frontend/Hero";
import MarketList from "@/components/frontend/MarketList";
import { getData } from "@/lib/getData";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function Home() {
  try {
    const categories = await getData("categories");
    const trainings = await getData("trainings");

    // ตรวจสอบให้แน่ใจว่า categories และ trainings เป็นอาร์เรย์
    const filteredCategories = Array.isArray(categories) 
      ? categories.filter(category => category.products && category.products.length > 0) 
      : [];

    const filteredCommunityTrainings = Array.isArray(trainings) && trainings.length > 0;

    return (
      <div className="min-h-screen">
        <Hero />
        <MarketList />

        {filteredCategories.map((category, i) => (
          <div key={i} className="py-4">
            <CategoryList category={category} />
          </div>
        ))}

        {filteredCommunityTrainings && (
          <div className="py-4">
            <CommunityTrainings />
          </div>
        )}

        <h2 className="text-4xl">Welcome to snooker ecommerce</h2>
        <Link href="/register-farmer" className="my-4 underline">
          Become a farmer/Vendor/Supplier
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}
