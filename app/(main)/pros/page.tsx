import { HeroSection } from "./_components/hero-section";
import { SearchResults } from "./_components/search-results";
import { getAllOrganizations } from "@/src/actions/organization.action";
import { parseSearchParams } from "@/src/nuqs-queries/search-queries";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CompaniesListPage({ searchParams }: PageProps) {
  const searchParamsPromise = await searchParams;
  const params = parseSearchParams(searchParamsPromise);

  const data = await getAllOrganizations({
    search: params.search,
    location: params.location,
    categories: params.categories,
    availableToday: params.availableToday,
    instantBooking: params.instantBooking,
    sortBy: params.sortBy,
    page: parseInt(params.page),
  });

  return (
    <div className="h-screen w-screen bg-background">
      <HeroSection />
      <SearchResults organizations={data.data!} />
    </div>
  );
}
