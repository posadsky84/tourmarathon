import React from 'react';
import { useParams } from 'react-router-dom';


const PageRunner = () => {

  let params = useParams();

  return (
    <div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      {params.runnerId}
    </div>
  );
};

export default PageRunner;
