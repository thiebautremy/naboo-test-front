import { ActivityType } from "@components/types/Activity";
import { Metadata } from "next";
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import { fetchData } from "@components/utils/utils";

export const metadata: Metadata = {
  title: "Candidator - Activité",
  description: "Retrouvez notre activité proposée",
};

type ActivityPageType = {
  params: { id: string };
};

const ActivityPage: FC<ActivityPageType> = async ({ params }) => {
  const activityId = params.id;
  const activitiesData: ActivityType = await fetchData(
    "activities",
    `/${activityId}`
  );
  const { type, description, price, city, picture } = activitiesData;
  return (
    <>
      <Link href="/" className="flex items-center font-medium">
        <ChevronLeft />
        Retour aux activités
      </Link>
      <h2 className="mt-16">{type}</h2>
      <div className="flex w-full items-center ">
        <div className="relative h-80 w-72 mr-12">
          <Image
            src={`/activitiesPictures/${picture}`}
            alt={`Picture of ${picture}`}
            title={`Picture of ${picture}`}
            loading="lazy"
            fill
            sizes="(max-width: 768px) 30vw, (max-width: 1200px) 15vw"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex flex-col justify-between h-40">
          <p>
            <span className="font-medium">Lieu : </span> {city}
          </p>
          <p>
            <span className="font-medium">Description : </span>
            {description}
          </p>
          <p>
            <span className="font-medium">Prix : </span>
            {price} €
          </p>
        </div>
      </div>
    </>
  );
};
export default ActivityPage;
