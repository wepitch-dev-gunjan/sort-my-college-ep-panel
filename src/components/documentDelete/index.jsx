import { useContext } from 'react'
import './style.scss'
import { HelpContext } from '../../context/HelpContext'

const DocumentDelete = ({documentDelete,setDocumentDelete}) => {
    const {askQuestionRef} = useContext(HelpContext)
    console.log(documentDelete);
    

    const handlePopUp=()=>{
        setDocumentDelete(!documentDelete)
        console.log(documentDelete);

    }

    return(
        <div ref={askQuestionRef} className='ask-question-main'>
            <div className='ask-question-container'>
                <h3 className='h3'>Are You Sure You Want To Delete Selected Document</h3>
                    
                
                <div className='btn'>
                    <button>Yes</button>
                    <button onClick={handlePopUp}>No</button>

                </div>
            </div>
        </div>
    )
}

export default DocumentDelete