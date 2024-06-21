import './actualRaceBefore.css';
import { MapPreview } from '../../../components/MapPreview/MapPreview';

const ActualRaceBefore = ({race}) => {
  return (<>
    <div className="race-before-header">
      {race.attributes.name}
    </div>
    <div className="race-before-body">
      <MapPreview/>
      <div className="race-before-text-field">

      </div>
    </div>
  </>);
};

export default ActualRaceBefore;
