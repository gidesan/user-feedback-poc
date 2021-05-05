import ReactDOM from 'react-dom';
import Overlay from './Overlay';

function OverlayPortal({ node }) {
  if (!node) {
    return null;
  };
  const rect = node.getBoundingClientRect();

  return ReactDOM.createPortal(
    <Overlay rect={rect} />, 
    node.parentNode
  );
}

export default OverlayPortal;
