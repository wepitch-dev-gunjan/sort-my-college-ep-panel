import './style.scss'



const KeyFeaturesChildren = (props) => {
    return (
        <div className="key-features-children-block">
            <img src={props.featurePng} alt="" />
            <p>{props.featureName}</p>
        </div>
    );
}

export default KeyFeaturesChildren;