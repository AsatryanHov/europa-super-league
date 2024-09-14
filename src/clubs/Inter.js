import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamComponent from "../TeamComponent";

function Inter({ rating, position }) {
  const [statisticsSofascore, setStatisticsSofascore] = useState({});
  const [dataTransfermarkt, setDataTransfermarkt] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calculate average rating safely
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
            teamId: "2697",
            tournamentId: "23",
            seasonId: "52760",
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
            club_id: "46",
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
        setStatisticsSofascore(sofascoreResponse.data.statistics || {});
        setDataTransfermarkt(transfermarktResponse.data.data || {});
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Transform statistics and handle cases where data might be missing
  function transformStatistics(statisticsSofascore, dataTransfermarkt) {
    const {
      matches = 0,
      goalsScored = 0,
      goalsConceded = 0,
      avgRating = 0,
      bigChances = 0,
      bigChancesMissed = 0,
      totalDuels = 0,
      duelsWon = 0,
    } = statisticsSofascore;

    const {
      name = "Unknown",
      coachName = "Unknown",
      image = "",
      marketValueUnformatted = 0,
      clubnameEN = "Unknown",
    } = dataTransfermarkt;

    return {
      matchesPlayed: matches,
      goalsFor: goalsScored,
      goalsAgainst: goalsConceded,
      clubName: name,
      coach: coachName,
      teamValue: marketValueUnformatted,
      avgRating: avgRating,
      img: image,
      bigChances: bigChances,
      bigChancesMissed: bigChancesMissed,
      totalDuels: totalDuels,
      duelsWon: duelsWon,
      clubnameEN: clubnameEN,
    };
  }

  const transformedStatistics = transformStatistics(
    statisticsSofascore,
    dataTransfermarkt
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  console.log(transformedStatistics.clubnameEN);
  return (
    <TeamComponent
      teamName={transformedStatistics.clubnameEN}
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
  );
}

export default Inter;
