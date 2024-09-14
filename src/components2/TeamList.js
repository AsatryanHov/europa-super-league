import "./team-list.scss";
import TeamItem from "./TeamItem";
import { data } from "../data.js";

function TeamList() {
  const sortedData = [...data].sort((a, b) => b.avgRating - a.avgRating);
  return (
    <div className="wrapper-teams">
      <div className="block">
        <div className="block-team">
          <div
            className="block-team-position header-block header-block-position"
            style={{
              border: "none",
            }}></div>

          <div className="  header-block header-block-logo"></div>
          <div className="block-team-name header-block header-block-team">
            team
          </div>
          <div className="block-team-goal-per-game header-block">goal pg</div>
          <div className="block-team-missed-goal-per-game header-block">
            missed goal pg
          </div>
          <div className="block-team-big-chances  header-block">bc pg</div>
          <div className="block-team-big-chances-created  header-block">
            bc cr pg
          </div>
          <div className="block-team-big-chances-missed header-block">
            bc ms pg
          </div>
          <div className="block-team-shots-on-target header-block">
            shots ot pg
          </div>
          <div className="block-team-accurateOwnHalfPassesPercentage header-block">
            own half passes %
          </div>
          <div className="block-team-accurateOppositionHalfPassesPercentage header-block">
            opp half passes %
          </div>
          <div className="block-team-accuratePassesPercentage header-block">
            accurate passes %
          </div>

          <div className="block-team-won-duels-procent header-block">
            duels won %
          </div>

          <div className="block-team-averageBallPossession header-block">
            avg ball poss %
          </div>

          <div className="block-team-avgAge header-block">avg age</div>
          <div className="block-team-value header-block">value</div>
          <div className="block-team-rating header-block">rating</div>
        </div>
      </div>
      {sortedData.map((result, index) => (
        <TeamItem
          key={index}
          position={index + 1}
          logo={result.logo}
          teamName={result.clubName}
          goalPerGame={(result.goalsScored / result.matches).toFixed(1)}
          missedGoalPerGame={(result.goalsConceded / result.matches).toFixed(1)}
          wonDuelsProcent={result.duelsWonPercentage.toFixed(2)}
          averageAge={result.averageAge}
          teamValue={result.teamValue}
          rating={result.avgRating.toFixed(2)}
          averageBallPossession={result.averageBallPossession.toFixed(2)}
          accuratePassesPercentage={result.accuratePassesPercentage.toFixed(2)}
          bigChances={(result.bigChances / result.matches).toFixed(1)}
          bigChancesCreated={(
            result.bigChancesCreated / result.matches
          ).toFixed(1)}
          bigChancesMissed={(result.bigChancesMissed / result.matches).toFixed(
            1
          )}
          shotsOnTarget={(result.shotsOnTarget / result.matches).toFixed(1)}
          accurateOwnHalfPassesPercentage={result.accurateOwnHalfPassesPercentage.toFixed(
            2
          )}
          accurateOppositionHalfPassesPercentage={result.accurateOppositionHalfPassesPercentage.toFixed(
            2
          )}
        />
      ))}
      <div className="explanation-block">
        <b>goal pg</b> - goals per game, <b>missed goal pg</b> - missed goals
        per game,
        <b>bc pg</b> - big chances per game, <b>bc cr pg</b> - big chances
        created per game,
        <b>bc ms pg</b> - big chances missed per game, <b>shots ot pg</b> -
        shots on target per game, <b>own half passes %</b> - accurate own half
        passes percentage,
        <b>opp half passes %</b> - accurate opposition half passes percentage,
        <b>duels won %</b> - duels won percentage, <b>avg ball poss %</b> -
        average ball possession percentage, <b>accurate passes %</b> - accurate
        passes percentage, <b>avg age</b> - average team age, <b>value</b> -
        team players' value, <b>rating</b> - team average statistic rating
        (SofaScore).
      </div>
    </div>
  );
}

export default TeamList;
