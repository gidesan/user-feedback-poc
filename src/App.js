import { useState } from 'react';
import OverlayPortal from './OverlayPortal';

function App({ node }) {
  const [commentsEnabled, setCommentsEnabled] = useState(false);
  const toggleComments = () => setCommentsEnabled(!commentsEnabled);

  const handleMouseDown = (syntethicEvent) => {
    const e = syntethicEvent.nativeEvent;
    e.stopImmediatePropagation();
    e.preventDefault();
  };

  return (
    <div onMouseDown={handleMouseDown} style={{ padding: '20px' }}>
      <button onClick={toggleComments}>Toggle Comments</button>
      &nbsp; Comments <b>{commentsEnabled ? ' enabled' : ' disabled'}</b>
      
      {commentsEnabled && <OverlayPortal node={node} />}

    </div>
  );
}

export default App;
