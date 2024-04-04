import './style.scss';
import KeyFeaturesChildren from '../../components/keyFeaturesChildren';
import axios from "axios";
import config from "@/config"
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../context/UserContext';
import { ProfileContext } from '../../context/ProfileContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const { backend_url } = config;
const KeyFeatures = () => {
    const [keyFeaturesInstitute, setKeyFeaturesInstitute] = useState([]);
    const [remainingKeyFeatures, setRemainingKeyFeatures] = useState([]);
    const [draggedFeature, setDraggedFeature] = useState(null);
    const { user } = useContext(UserContext);
    const { editKeyFeatureEnable, setEditKeyFeatureEnable } = useContext(ProfileContext);
    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(`${backend_url}/ep/key-features`, {
                    headers: {
                        Authorization: user.token
                    }
                });
                setKeyFeaturesInstitute(data);
            } catch (error) {
                console.log("Error Fetching Key Features");
            }
        }
        fetchData();
    }, [user.token]);
    useEffect(() => {
        async function fetchRemainingFeatures() {
            try {
                const { data } = await axios.get(`${backend_url}/admin/key-features-institute/remaining-key-features-for-institute`, {
                    headers: {
                        Authorization: user.token
                    }
                });
                setRemainingKeyFeatures(data);
            } catch (error) {
                console.log("Error fetching the remaining key features");
            }
        }
        fetchRemainingFeatures();
    }, [user.token]);
    const handleDragStart = (e, feature) => {
        console.log("start")
        setDraggedFeature(feature);
    };
    const handleDragOver = (e) => {
        console.log("dragging")
        e.preventDefault();
    };
    const handleDrop = (e, target) => {
        console.log(target)
        e.preventDefault();
        if (draggedFeature) {
            let updatedRemainingFeatures = [...remainingKeyFeatures];
            let updatedInstituteFeatures = [...keyFeaturesInstitute];
            if (target === 'existing') {
                updatedInstituteFeatures.push(draggedFeature);
                updatedRemainingFeatures = updatedRemainingFeatures.filter(feature => feature !== draggedFeature);
            } else if (target === 'remaining') {
                updatedRemainingFeatures.push(draggedFeature);
                updatedInstituteFeatures = updatedInstituteFeatures.filter(feature => feature !== draggedFeature);
            }
            setRemainingKeyFeatures(updatedRemainingFeatures);
            setKeyFeaturesInstitute(updatedInstituteFeatures);
            setDraggedFeature(null);
        }
    };
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="key-features-parent">
                <div className="key-features-head">
                    <h1>Key Features</h1>
                    {!editKeyFeatureEnable ?
                        <button className='kf-edit' onClick={() => setEditKeyFeatureEnable(true)}>Edit</button>
                    :
                        <div className='cancel-save-btns'>
                            <button className='kf-save' onClick={() => setEditKeyFeatureEnable(false)}>Save</button>
                            <button className='kf-cancel' onClick={() => setEditKeyFeatureEnable(false)}>Cancel</button>
                        </div>
                    }
                </div>
                {editKeyFeatureEnable ?
                    <div className="edit-key-features">
                        <div className="key-features-child key-features-remaining" >
                            {remainingKeyFeatures.map((remainingKeyFeature, i) => (
                                <KeyFeaturesChildren
                                    onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'remaining')}
                                    key={i}
                                    featureName={remainingKeyFeature.name}
                                    featurePng={remainingKeyFeature.key_features_icon}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, remainingKeyFeature)}
                                />
                            ))}
                        </div>
                        <div className="key-features-child key-features-existing" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'existing')}>
                            {keyFeaturesInstitute.map((keyFeatureInstitute, i) => (
                                <KeyFeaturesChildren
                                    key={i}
                                    featureName={keyFeatureInstitute.name}
                                    featurePng={keyFeatureInstitute.key_features_icon}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, keyFeatureInstitute)}
                                />
                            ))}
                        </div>
                    </div>
                :
                    <div className="key-features-child">
                        {keyFeaturesInstitute.map((keyFeatureInstitute, i) => (
                            <KeyFeaturesChildren key={i} featureName={keyFeatureInstitute.name} featurePng={keyFeatureInstitute.key_features_icon} />
                        ))}
                    </div>
                }
            </div>
        </DndProvider>
    );
};
export default KeyFeatures;