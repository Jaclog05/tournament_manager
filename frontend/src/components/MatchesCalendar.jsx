import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import GroupStage from './GroupStage';
import FinalChart from './FinalChart';


function MatchesCalendar({ matches }) {
  const [key, setKey] = useState('group-stage');

  const groupStageMatches = matches.filter(match => match.round === "Group Stage")
  const finalChartMatches = matches.filter(match => match.round !== "Group Stage")

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="group-stage" title="Fase de Grupos">
        <GroupStage groupStageMatches={groupStageMatches} />
      </Tab>
      <Tab eventKey="final-chart" title="Cuadro Final">
        <FinalChart finalStageMatches={finalChartMatches} />
      </Tab>
    </Tabs>
  );
}

export default MatchesCalendar;
