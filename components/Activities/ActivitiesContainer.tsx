import React, { FC, Fragment } from "react";
import { ActivityType } from "../../types/Activity";
import ActivityCard from "./ActivityCard";

type ActivitiesContainerType = {
  activitiesData: ActivityType[];
};

const ActivitiesContainer: FC<ActivitiesContainerType> = ({
  activitiesData,
}) => {
  return (
    <div className="flex flex-wrap justify-between gap-12">
      {activitiesData.map((activity) => (
        <Fragment key={activity._id}>
          <ActivityCard {...activity} />
        </Fragment>
      ))}
    </div>
  );
};
export default ActivitiesContainer;
