import { useContext } from 'react'
import './style.scss'
import { HelpContext } from '../../context/HelpContext'

const AskQuestion = () => {
    const {askQuestionRef} = useContext(HelpContext)

    return(
        <div ref={askQuestionRef} className='ask-question-main'>
            <div className='ask-question-container'>
                <h3>Ask a Question</h3>
                    <div className='ask-question-dropdown'> 
                    <select >
                        <option value="">Choose a category</option>
                        <option value="Counselor Services">Counselor Services</option>
                        <option value="Application Process">Application Process</option>
                        <option value="Financial Aid and Scholarships">Financial Aid and Scholarships</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Privacy and Security">Privacy and Security</option>
                        <option value="User Account Management">User Account Management</option>
                        <option value="Community Guidelines">Community Guidelines</option>
                        <option value="Additional Resources">Additional Resources</option>
                        <option value="Mobile App Support">Mobile App Support</option>
                        <option value="Video Tutorials and How-To Guides">Video Tutorials and How-To Guides</option>
                        <option value="Payment and Billing">Payment and Billing</option>
                        <option value="Account Termination/Deactivation">Account Termination/Deactivation</option>
                        <option value="Platform Updates and Announcements">Platform Updates and Announcements</option>
                        <option value="Accessibility Assistance">Accessibility Assistance</option>
                        <option value="Feedback and Suggestions">Feedback and Suggestions</option>
                        <option value="Webinar">Webinar</option>
                        <option value="other">Other</option>                        
                    </select>
                </div>
                <div className='ask-question-textarea' >
                    <textarea placeholder='Type your question here...'></textarea>
                </div>
                <div className='ask-question-btn' >
                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AskQuestion