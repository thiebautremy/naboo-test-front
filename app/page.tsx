import { Metadata } from "next";
import { ActivityType } from "../types/Activity";
import ActivitiesContainer from "@components/components/Activities/ActivitiesContainer";
import { fetchData } from "@components/utils/utils";

export const metadata: Metadata = {
  title: "Candidator - Accueil",
  description: "Retrouvez nos activités proposées",
};

const Home = async () => {
  const activitiesData: ActivityType[] = await fetchData("activities");
  return (
    <main>
      <h1>Découvrez des activités</h1>
      <ActivitiesContainer activitiesData={activitiesData} />
    </main>
  );
};

export default Home;
