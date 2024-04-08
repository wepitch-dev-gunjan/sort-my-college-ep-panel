import './style.scss';
import KeyFeaturesChildren from '../../components/keyFeaturesChildren';
import axios from "axios";
import config from "@/config"
import { useState, useEffect, useContext } from "react";
import { UserContext } from '../../context/UserContext';
import { ProfileContext } from '../../context/ProfileContext';

const { backend_url } = config;

const KeyFeatures = () => {
    const [keyFeaturesInstitute, setKeyFeaturesInstitute] = useState([]);
    const [remainingKeyFeatures, setRemainingKeyFeatures] = useState([]);
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
                console.log(keyFeaturesInstitute)
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

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(item));
    };

    const handleDrop = (e, target) => {
        e.preventDefault();
        const item = JSON.parse(e.dataTransfer.getData('text/plain'));
        
        // Check if the item is already in the target list
        const isDuplicate = target === 'institute' ? 
            keyFeaturesInstitute.some(feature => feature.name === item.name) :
            remainingKeyFeatures.some(feature => feature.name === item.name);
    
        // If it's not a duplicate, update the lists accordingly
        if (!isDuplicate) {
            if (target === 'institute') {
                setKeyFeaturesInstitute(prevState => [...prevState, item]);
                setRemainingKeyFeatures(prevState => prevState.filter(el => el.name !== item.name));
            } else {
                setRemainingKeyFeatures(prevState => [...prevState, item]);
                setKeyFeaturesInstitute(prevState => prevState.filter(el => el.name !== item.name));
            }
        }
    };
    console.log(keyFeaturesInstitute)
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSave = async () => {
        try {
            // Extract _id from each item in keyFeaturesInstitute and create new_key_features array
            const new_key_features = keyFeaturesInstitute.map(feature => ({ _id: feature._id }));
            
            await axios.put(`${backend_url}/ep/key-features/edit`, { new_key_features }, {
                headers: {
                    Authorization: user.token
                }
            });
            // Handle success
            console.log("Key features updated successfully!");
            setEditKeyFeatureEnable(false); // Disable editing mode after successful save
        } catch (error) {
            console.log("Error updating key features:", error);
            // Handle error
        }
    };
    

    return (
        <div className="key-features-parent">
            <div className="key-features-head">
                <h1>Key Features</h1>
                {!editKeyFeatureEnable ?
                    <button className='kf-edit' onClick={() => setEditKeyFeatureEnable(true)}>Edit</button>
                    :
                    <div className='cancel-save-btns'>
                        <button className='kf-save' onClick={handleSave}>Save</button>
                        <button className='kf-cancel' onClick={() => setEditKeyFeatureEnable(false)}>Cancel</button>
                    </div>
                }
            </div>
            {editKeyFeatureEnable ?
                <div className="edit-key-features">
                    <div className="key-features-child key-features-remaining"
                         onDrop={(e) => handleDrop(e, 'remaining')}
                         onDragOver={handleDragOver}>
                        {remainingKeyFeatures.map((remainingKeyFeature, i) => (
                            <KeyFeaturesChildren
                                key={i}
                                featureName={remainingKeyFeature.name}
                                featurePng={remainingKeyFeature.key_features_icon}
                                draggable
                                onDragStart={(e) => handleDragStart(e, remainingKeyFeature)}
                            />
                        ))}
                    </div>
                    <div className="key-features-child key-features-existing"
                         onDrop={(e) => handleDrop(e, 'institute')}
                         onDragOver={handleDragOver}>
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
                    {keyFeaturesInstitute.length === 0 ? (
                        <p>You don't have any key features. Please click on edit to add.</p>
                    ) : (
                        keyFeaturesInstitute.map((keyFeatureInstitute, i) => (
                            <KeyFeaturesChildren key={i} featureName={keyFeatureInstitute.name} featurePng={keyFeatureInstitute.key_features_icon} />
                        ))
                    )}
                </div>
            }
        </div>
    );
};

export default KeyFeatures;
