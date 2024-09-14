import "./assets/team-component.scss";

function TeamComponent({
  teamName,
  rating,
  position,
  logo,
  teamValue,
  goalMomentPerGame,
  missedGoalMomentPerGame,
  wonDuelsProcent,
  ratingSofascore,
}) {
  return (
    <div className="block">
      <div className="block-team">
        <div className="block-team-position">{position}</div>
        <img className="block-team-logo" src={logo} alt={`${teamName} logo`} />
        <div className="block-team-name">{teamName}</div>
        <div className="block-team-goal-moment-per-game">
          {goalMomentPerGame}
        </div>
        <div className="block-team-missed-goal-moment-per-game">
          {missedGoalMomentPerGame}
        </div>
        <div className="block-team-won-duels-procent">{wonDuelsProcent}</div>
        <div className="block-team-value">{teamValue}</div>
        <div className="block-team-rating">{rating}</div>
        <div className="block-team-rating">{ratingSofascore}</div>
      </div>
    </div>
  );
}

export default TeamComponent;
