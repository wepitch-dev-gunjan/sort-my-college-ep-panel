import './style.scss'
import { useState, useEffect, useContext } from "react";
import { ProfileContext } from '../../context/ProfileContext';


const KeyFeaturesChildren = (props) => {

    const [showTooltip, setShowTooltip] = useState(false);
    const { editKeyFeatureEnable, setEditKeyFeatureEnable } = useContext(ProfileContext);

    const handleMouseDown = () => {
        document.body.classList.add('grabbing'); // Add class to change cursor to grabbing
      };
    
      const handleMouseUp = () => {
        document.body.classList.remove('grabbing'); // Remove class to revert cursor back to grab
      };

      const handleMouseEnter = () => {
        setShowTooltip(true);
    };
    
    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div 
        onDragStart={props.onDragStart}
        className="key-features-children-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
            {editKeyFeatureEnable && showTooltip && (
            <div className={`tooltip ${showTooltip ? 'active' : ''}`}>Drag this block to add/remove this key feature</div>
            )}
            <img
                onMouseDown={handleMouseDown} // Add onMouseDown event handler
                onMouseUp={handleMouseUp} // Add onMouseUp event handler
                src={props.featurePng} alt="" />
            <p>{props.featureName}</p>
        </div>
    );
}

export default KeyFeaturesChildren;