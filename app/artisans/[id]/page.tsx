import { notFound } from "next/navigation";
import Footer from "../../components/defaults/Footer";
import TopNav from "../../components/defaults/TopNav";
import ArtisanProfileView from "./ArtisanProfileView";
import { getArtisanProfile } from "../profileData";

export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artisan = getArtisanProfile(Number(id));
  if (!artisan) notFound();

  return (
    <div>
      <TopNav />
      <ArtisanProfileView artisan={artisan} />
      <Footer />
    </div>
  );
}
