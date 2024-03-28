import './style.scss'
import KeyFeaturesChildren from '../../components/keyFeaturesChildren'
import png_1 from '../../assets/nature_6007468.png'
import png_2 from '../../assets/loan_12292787.png'
import png_3 from '../../assets/3.png'
import png_4 from '../../assets/4.png'
import png_5 from '../../assets/5.png'

const KeyFeatures = () => {
    return(
        <div className="key-features-parent">
            <div className="key-features-head">
                <h1>Key Features</h1>
                <button>Add New</button>
            </div>
            <div className="key-features-child">
                <KeyFeaturesChildren featureName='Inclusive Environment' featurePng={ png_1 } />
                <KeyFeaturesChildren featureName='Affordability and Financial Aid' featurePng={ png_2 } />
                <KeyFeaturesChildren featureName='Extracurricular Activities' featurePng={ png_3 } />
                <KeyFeaturesChildren featureName='Community Engagement' featurePng={ png_4 } />
                <KeyFeaturesChildren featureName='Research Opportunities' featurePng={ png_5 } />
                <KeyFeaturesChildren featureName='Extracurricular Activities' featurePng={ png_3 } />
                <KeyFeaturesChildren featureName='Research Opportunities' featurePng={ png_5 } />
                <KeyFeaturesChildren featureName='Inclusive Environment' featurePng={ png_1 } />
                <KeyFeaturesChildren featureName='Affordability and Financial Aid' featurePng={ png_2 } />
                <KeyFeaturesChildren featureName='Community Engagement' featurePng={ png_4 } />
                <KeyFeaturesChildren featureName='Inclusive Environment' featurePng={ png_1 } />
                <KeyFeaturesChildren featureName='Affordability and Financial Aid' featurePng={ png_2 } />
                <KeyFeaturesChildren featureName='Extracurricular Activities' featurePng={ png_3 } />
                <KeyFeaturesChildren featureName='Community Engagement' featurePng={ png_4 } />
                <KeyFeaturesChildren featureName='Research Opportunities' featurePng={ png_5 } />
                <KeyFeaturesChildren featureName='Extracurricular Activities' featurePng={ png_3 } />
                <KeyFeaturesChildren featureName='Research Opportunities' featurePng={ png_5 } />
                <KeyFeaturesChildren featureName='Inclusive Environment' featurePng={ png_1 } />
                <KeyFeaturesChildren featureName='Affordability and Financial Aid' featurePng={ png_2 } />
                <KeyFeaturesChildren featureName='Community Engagement' featurePng={ png_4 } />
            </div>
        </div>
    )
}

export default KeyFeatures;