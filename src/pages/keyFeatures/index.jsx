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
    const {user} = useContext (UserContext);
    const {editKeyFeatureEnable, setEditKeyFeatureEnable} = useContext(ProfileContext)
    const getKeyFeatures = async () => {
        try{
            const { data } = await axios.get(`${backend_url}/ep/key-features`, {
                headers:{
                    Authorization : user.token
                }
            });
            console.log(data);
            setKeyFeaturesInstitute(data);
        } catch (error) {
            console.log("Error Fetching Key Features")
        };
    }
    useEffect(() => {
        getKeyFeatures();
    }, []);


    return(
        <div className="key-features-parent">
            <div className="key-features-head">
                <h1>Key Features</h1>
                <button onClick={() => setEditKeyFeatureEnable(true)}>Add New</button>
            </div>
            {editKeyFeatureEnable ? 
                <>

                </> 
            :
                <div className="key-features-child">
                    {keyFeaturesInstitute.map((keyFeatureInstitute, i) => {
                        return (
                            <KeyFeaturesChildren featureName={keyFeatureInstitute.name} featurePng={keyFeatureInstitute.key_features_icon} />
                        )
                    })}
                </div>
            }

        </div>
    )
}

export default KeyFeatures;