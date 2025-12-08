import "./PredictionCard.css";
import { FaShield } from "react-icons/fa6";

const PredictionCard = ({ matchData }) => {
  const { matchDate, homeTeam, awayTeam, prediction } = matchData;
  const {
    expectedGoalsHome,
    expectedGoalsAway,
    probabilities,
    predictedResult,
  } = prediction;

  const dateObj = new Date(matchDate);
  const formattedDate = dateObj.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  });
  const formattedTime = dateObj.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getPredictionText = () => {
    if (predictedResult === "1") return `Victoria ${homeTeam.name}`;
    if (predictedResult === "2") return `Victoria ${awayTeam.name}`;
    return "Empate";
  };

  const pieStyle = {
    background: `conic-gradient(
      #e74c3c 0% ${probabilities.awayWin}%, 
      #95a5a6 ${probabilities.awayWin}% ${
      probabilities.awayWin + probabilities.draw
    }%, 
      #2c3e50 ${probabilities.awayWin + probabilities.draw}% 100%
    )`,
  };

  return (
    <div className="col d-flex flex-column align-items-center">
      <div className="prediction-card text-center">
        <div className="card-header p-2">
          <div className="d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-around text-center align-items-center gap-2">
              <FaShield style={{ fontSize: "24px" }} />
              <span className="fw-bold small text-start ms-1">
                {homeTeam.name}
              </span>
              <span className="text-muted small">Vs.</span>
              <span className="fw-bold small text-end me-1">
                {awayTeam.name}
              </span>
              <FaShield style={{ fontSize: "24px" }} />
            </div>
            <div className="text-center">
              <span className="text-muted d-block small">
                {formattedDate} - {formattedTime}
              </span>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="stats-section">
          <label>Goles Esperados</label>
          <div className="xg-display">
            <span className="xg-value" style={{ color: "#2c3e50" }}>
              {expectedGoalsHome}
            </span>
            <span className="xg-separator">|</span>
            <span className="xg-value" style={{ color: "#e74c3c" }}>
              {expectedGoalsAway}
            </span>
          </div>
        </div>

        <div className="stats-section">
          <label>Probabilidades</label>
          <div className="probabilities-container">
            <div className="pie-chart" style={pieStyle}></div>

            <div className="prob-legend">
              <small>L: {probabilities.homeWin}%</small>
              <small>E: {probabilities.draw}%</small>
              <small>V: {probabilities.awayWin}%</small>
            </div>
          </div>
        </div>

        <hr className="divider" />
        <div className="prediction-footer">
          <label>Predicción</label>
          <div className="prediction-result-text">{getPredictionText()}</div>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;
