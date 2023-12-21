import React, { FC } from "react";
import { ActivityType } from "../../types/Activity";
import Image from "next/image";
import Link from "next/link";

const ActivityCard: FC<ActivityType> = ({
  type,
  description,
  picture,
  _id,
}) => {
  return (
    <Link href={`/activity/${_id}`}>
      <div className="w-72 hover:scale-105 transition-all ">
        <div className="relative h-80">
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
        <h2>{type}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};
export default ActivityCard;
