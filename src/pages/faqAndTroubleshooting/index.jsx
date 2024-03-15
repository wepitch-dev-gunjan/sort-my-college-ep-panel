import './style.scss'
import 'rsuite/dist/rsuite.min.css';
import { IoMdSearch } from "react-icons/io";
import QnaList from '../../components/qnaList';
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { HelpContext } from '../../context/HelpContext';

const FaqAndTroubleshooting = () => {
    const {askQuestionEnable, setAskQuestionEnable} = useContext(HelpContext)
    function askQuestion() {
        setAskQuestionEnable(true)
    }
    return(
        <div className="fat-main">
            <div className='secondary-header'>
                <div className="search-fat">
                    <input type="text" placeholder='Search'/>
                    <IoMdSearch size={28}/>
                </div>
                <div className='ask-question-btn' onClick={askQuestion}>
                Ask a Question
                </div>
            </div>
            <QnaList />
        </div>
    )
}

export default FaqAndTroubleshooting