function TeamItem({
  teamName,
  rating,
  position,
  logo,
  teamValue,
  goalPerGame,
  missedGoalPerGame,
  wonDuelsProcent,
  averageAge,
  averageBallPossession,
  accuratePassesPercentage,
  bigChances,
  bigChancesCreated,
  bigChancesMissed,
  shotsOnTarget,
  accurateOwnHalfPassesPercentage,
  accurateOppositionHalfPassesPercentage,
}) {
  let ratingBgColor;

  if (rating >= 7.25) {
    ratingBgColor = "#049EA1";
  } else if (rating >= 7.15) {
    ratingBgColor = "#65B300";
  } else if (rating >= 7.05) {
    ratingBgColor = "#C4CC00";
  } else if (rating >= 6.95) {
    ratingBgColor = "#FABA00";
  } else if (rating >= 6.85) {
    ratingBgColor = "#FF7B00";
  } else if (rating >= 6.7) {
    ratingBgColor = "#E91D27";
  } else {
    ratingBgColor = "#FFFFFF";
  }
  return (
    <div className="block">
      <div className="block-team">
        <div
          className="block-team-position"
          style={{
            borderColor: ratingBgColor,
          }}>
          {position}
        </div>

        <div className="block-team-logo">
          <img
            className="block-team-logo-img"
            src={logo}
            alt={`${teamName} logo`}
          />
        </div>

        <div className="block-team-name">{teamName}</div>
        <div className="block-team-goal-per-game">{goalPerGame}</div>
        <div className="block-team-missed-goal-per-game">
          {missedGoalPerGame}
        </div>
        <div className="block-team-big-chances">{bigChances}</div>
        <div className="block-team-big-chances-created">
          {bigChancesCreated}
        </div>

        <div className="block-team-big-chances-missed">{bigChancesMissed}</div>
        <div className="block-team-shots-on-target">{shotsOnTarget}</div>
        <div className="block-team-accurateOwnHalfPassesPercentage">
          {accurateOwnHalfPassesPercentage}
        </div>
        <div className="block-team-accurateOppositionHalfPassesPercentage">
          {accurateOppositionHalfPassesPercentage}
        </div>

        <div className="block-team-accuratePassesPercentage">
          {accuratePassesPercentage}
        </div>

        <div className="block-team-won-duels-procent">{wonDuelsProcent}</div>

        <div className="block-team-averageBallPossession">
          {averageBallPossession}
        </div>

        <div className="block-team-avgAge">{averageAge}</div>
        <div className="block-team-value">{teamValue}</div>
        <div
          className="block-team-rating"
          style={{ backgroundColor: ratingBgColor }}>
          {rating}
        </div>
      </div>
      <hr
        className="line-between-blocks"
        style={{
          backgroundColor: ratingBgColor,
        }}
      />
    </div>
  );
}

export default TeamItem;
