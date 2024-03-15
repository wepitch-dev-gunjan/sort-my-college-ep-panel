import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { frontend_url } from '../../config';

function ZoomMeeting() {
  const client = ZoomMtgEmbedded.createClient();

  var authEndpoint = 'http://localhost:9000/counsellor/sessions'
  // var authEndpoint = 'http://192.168.0.36:9000/counsellor/sessions'
  var sdkKey = 'PHgjcw9zSGGJ3ca81z0IQw'
  var meetingNumber = '123456789'
  var passWord = ''
  var role = 0
  var userName = 'React'
  var userEmail = ''
  var registrantToken = ''
  var zakToken = ''

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        counsellor_id: '6545f6cc996ae1471811384f',
        session_date: '2023-11-08',
        session_time: "14:30",
        session_duration: '60',
        session_type: 'Personal',
        session_fee: '60',
      })
    }).then(res => res.json())
      .then(response => {
        startMeeting(response.meeting_sdk_jwt)
      }).catch(error => {
        console.error(error)
      })
  }

  function startMeeting(signature) {

    let meetingSDKElement = document.getElementById('meetingSDKElement');

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {
                console.log('custom button');
              }
            }
          ]
        }
      }
    });

    client.join({
      signature: signature,
      sdkKey: sdkKey,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
      zak: zakToken
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default ZoomMeeting;