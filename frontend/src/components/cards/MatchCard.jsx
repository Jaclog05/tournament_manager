import formatDateTime from "../../utils/dateFormatter";
import { FaShield } from "react-icons/fa6";

function MatchCard({ matchData }) {
  return (
    <div className="border-bottom p-3 border">
      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-around text-center align-items-center">
          <FaShield style={{ fontSize: "24px" }} />
          <span className="fw-bold">{matchData.homeTeam.name}</span>
          {matchData.status === "finished" ? (
            <span className="fw-bold fs-5">
              {matchData.goalsHomeTeam} - {matchData.goalsAwayTeam}
            </span>
          ) : (
            <span className="text-muted small">Vs.</span>
          )}
          <span className="fw-bold">{matchData.awayTeam.name}</span>
          <FaShield style={{ fontSize: "24px" }} />
        </div>
        <div className="text-center">
          <span className="text-muted d-block">
            {formatDateTime(matchData.matchDate, true)}
          </span>
          {matchData.status === "finished" && (
            <span className="text-muted small">{matchData.status}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MatchCard;
