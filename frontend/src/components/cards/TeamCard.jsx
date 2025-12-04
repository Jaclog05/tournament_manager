import { FaShield } from "react-icons/fa6";

function TeamCard({ name, playersAmout }) {
  return (
    <div
      className="card p-3 col-md-4 border-2"
      style={{ width: "215px", height: "250px" }}
    >
      <div className="d-flex flex-column align-items-center my-auto">
        <FaShield style={{ fontSize: "48px" }} />
        <p className="mt-3 text-center fw-4" style={{ fontSize: "20px" }}>
          {name}
        </p>
        <span className="text-muted">{playersAmout} Jugadores</span>
      </div>
    </div>
  );
}

export default TeamCard;
