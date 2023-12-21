/* eslint-disable @next/next/no-async-client-component */
"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { fetchData } from "@components/utils/utils";
import { ActivityType } from "../../types/Activity";
import AuthContext from "@components/app/context/AuthContext";
import activityLogo from "../../assets/logo/activityLogo.png";
import CreateActivityForm from "./CreateActivityForm";
import ActivityCard from "../Activities/ActivityCard";

const UserActivity = () => {
  const [open, setOpen] = React.useState(false);
  const { userId } = useContext(AuthContext);
  const [activitiesByUserData, setActivitiesByUserData] = useState<
    ActivityType[] | []
  >([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetchData("activities/user/", userId);
      setActivitiesByUserData(response);
    };
    fetchActivities();
  }, [userId]);

  return (
    <>
      {activitiesByUserData.length > 0 ? (
        activitiesByUserData.map((activity) => (
          <ActivityCard key={activity._id} {...activity} />
        ))
      ) : (
        <div className="relative w-40 h-96 mx-auto text-gray-500">
          <div className="relative w-40 h-96">
            <Image
              src={activityLogo}
              alt={"Logo pas d'activités crées"}
              title={"Logo pas d'activités crées"}
              loading="lazy"
              fill
              sizes="(max-width: 1200px) 10vw"
              style={{ objectFit: "contain" }}
            />
          </div>
          <p>Pas d&apos;activités crées</p>
        </div>
      )}
      <div className="flex justify-center mt-48">
        <input
          type="submit"
          value="Créer une activité"
          onClick={() => setOpen(true)}
        />
      </div>
      <CreateActivityForm
        open={open}
        setOpen={setOpen}
        setActivitiesByUserData={setActivitiesByUserData}
      />
    </>
  );
};
export default UserActivity;
