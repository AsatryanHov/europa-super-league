import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamComponent from "../TeamComponent";

function Barcelona({ rating, position }) {
  const [statisticsSofascore, setStatisticsSofascore] = useState({});
  const [dataTransfermarkt, setDataTransfermarkt] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(rating);

  // const average = rating.reduce((a, b) => a + b) / rating.length;
  const average = rating.length
    ? rating.reduce((a, b) => a + b) / rating.length
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sofascoreOptions = {
          method: "GET",
          url: "https://sofascore.p.rapidapi.com/teams/get-statistics",
          params: {
            teamId: "2817",
            tournamentId: "8",
            seasonId: "52376", //61643
            type: "overall",
          },
          headers: {
            "x-rapidapi-key":
              "9cc23dbe10msh88b24033afbdd88p1c90b3jsn9890bf0c8751",
            "x-rapidapi-host": "sofascore.p.rapidapi.com",
          },
        };

        const transfermarktOptions = {
          method: "GET",
          url: "https://transfermarkt-db.p.rapidapi.com/v1/clubs/info",
          params: {
            club_id: "131",
            locale: "DE",
          },
          headers: {
            "x-rapidapi-key":
              "9cc23dbe10msh88b24033afbdd88p1c90b3jsn9890bf0c8751",
            "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
          },
        };

        // Fetching both APIs
        const [sofascoreResponse, transfermarktResponse] = await Promise.all([
          axios.request(sofascoreOptions),
          axios.request(transfermarktOptions),
        ]);

        // Set state with the fetched data
        setStatisticsSofascore(sofascoreResponse.data.statistics);
        setDataTransfermarkt(transfermarktResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //------------------------------------------------
  function transformStatistics(statisticsSofascore, dataTransfermarkt) {
    if (!statisticsSofascore || !dataTransfermarkt) return null;
    const {
      matches,
      goalsScored,
      goalsConceded,
      avgRating,
      bigChances,
      bigChancesMissed,
      totalDuels,
      duelsWon,
    } = statisticsSofascore;
    const { name, coachName, image, marketValueUnformatted } =
      dataTransfermarkt;
    return {
      matchesPlayed: matches,
      goalsFor: goalsScored,
      goalsAgainst: goalsConceded,
      clubName: name,
      coach: coachName,
      teamValue: marketValueUnformatted, //marketValue,
      avgRating: avgRating,
      img: image,
      bigChances: bigChances,
      bigChancesMissed: bigChancesMissed,
      totalDuels: totalDuels,
      duelsWon: duelsWon,
    };
  }
  //-----
  const transformedStatistics = transformStatistics(
    statisticsSofascore,
    dataTransfermarkt
  );
  console.log(transformedStatistics);
  // console.log(dataTransfermarkt);
  //--------------------------------------------------

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <TeamComponent
        teamName={transformedStatistics.clubName}
        rating={average}
        position={position}
        logo={transformedStatistics.img}
        teamValue={
          (transformedStatistics.teamValue / 1000000).toFixed(2) + " M € "
        }
        goalMomentPerGame={(
          transformedStatistics.bigChances / transformedStatistics.matchesPlayed
        ).toFixed(2)}
        missedGoalMomentPerGame={(
          transformedStatistics.bigChancesMissed /
          transformedStatistics.matchesPlayed
        ).toFixed(2)}
        wonDuelsProcent={(
          (transformedStatistics.duelsWon / transformedStatistics.totalDuels) *
          100
        ).toFixed(2)}
        ratingSofascore={transformedStatistics.avgRating.toFixed(2)}
      />
    </>
  );
}

export default Barcelona;
