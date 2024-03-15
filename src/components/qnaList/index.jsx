import { Panel, Stack,Dropdown, ButtonGroup, Button, AvatarGroup, Avatar } from 'rsuite';
import React, {useContext , useState} from 'react';
import './style.scss'
import { MediaQueryContext } from '../../context/MediaQueryContext';

const QnaList = () => {
 const { xSmallScreen } = useContext(MediaQueryContext);
 const [showFullText, setShowFullText] = useState([]);

 const toggleShowFullText = (index) => {
     setShowFullText((prevShowFullText) => {
         const updatedShowFullText = [...prevShowFullText];
         updatedShowFullText[index] = !updatedShowFullText[index];
         return updatedShowFullText;
     });
 };
 const questions = [
  {
      text:
          "I've heard that having a comprehensive profile can increase my chances of getting noticed by colleges. Could you provide some tips or suggestions on how to make my profile stand out?",
      avatars: [
          "https://avatars.githubusercontent.com/u/12592949",
          "https://avatars.githubusercontent.com/u/8225666",
          "https://avatars.githubusercontent.com/u/15609339"
      ]
  },
  {
      text:
          "I'm starting my college search journey and feeling a bit overwhelmed. Can you walk me through how I can effectively use the search and filtering features on your platform to narrow down my options?",
      avatars: [
          "https://avatars.githubusercontent.com/u/12592949",
          "https://avatars.githubusercontent.com/u/8225666",
          "https://avatars.githubusercontent.com/u/15609339",
          "https://avatars.githubusercontent.com/u/14308293",
          "https://avatars.githubusercontent.com/u/1203827",
          "https://avatars.githubusercontent.com/u/10924138",
          "https://avatars.githubusercontent.com/u/2797600",
          "https://avatars.githubusercontent.com/u/23637144"
      ]
  },
  // Add other questions with their respective avatars
];

return (
 <div className='qna-container-super'>
     <Panel className='qna-container-main' bordered
         header={
             <Stack justifyContent="space-between">
                 <span>Top Questions</span>
                 <ButtonGroup>
                     <Button active>All</Button>
                     <Button>Hot</Button>
                     {!xSmallScreen && <>
                         <Button>Week</Button>
                         <Button>Month</Button>
                     </>}
                     <Dropdown title="More">
                         {xSmallScreen && <>
                             <Button>Week</Button>
                             <Button>Month</Button>
                         </>}
                         <Button>My Question</Button>
                     </Dropdown>
                 </ButtonGroup>
             </Stack>
         }>
         <div className='qna-container-sub'>
             {questions.map((question, index) => (
                 <div key={index} className='question-block'>
                     <div className="truncate">
                         <h6>
                             {showFullText[index] || question.text.length <= 20
                                 ? question.text
                                 : `${question.text.slice(0, 100)}...`}
                             {question.text.length > 100 && (
                                 showFullText[index] ? (
                                     <>
                                         <a className="tq-read-btn" onClick={() => toggleShowFullText(index)}> Read Less</a>
                                     </>
                                 ) : (
                                     <>
                                         <a className="tq-read-btn" onClick={() => toggleShowFullText(index)}> Read More</a>
                                     </>
                                 )
                             )}
                         </h6>
                     </div>
                     <AvatarGroup size="xs" spacing={6}>
                         {question.avatars.map((avatar, idx) => (
                             <Avatar key={idx} circle src={avatar} alt={`Avatar ${idx}`} />
                         ))}
                     </AvatarGroup>
                     <hr></hr>
                 </div>
             ))}
         </div>
     </Panel>
 </div>
);


           }

export default QnaList;