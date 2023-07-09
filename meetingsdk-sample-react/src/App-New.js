import React from 'react';

import './App.css';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';

function App() {

  const client = ZoomMtgEmbedded.createClient();

  var authEndpoint = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGtLZXkiOiJBbm5lZEwxalRSdXh1Q0htUjgwck1RIiwibW4iOiIxMjM0NTY3ODkiLCJyb2xlIjowLCJpYXQiOjE2ODg1NTI3ODIsImV4cCI6MTY4ODU1OTk4MiwiYXBwS2V5IjoiQW5uZWRMMWpUUnV4dUNIbVI4MHJNUSIsInRva2VuRXhwIjoxNjg4NTU5OTgyfQ.VPXQMrkWj62VZIitibdv65ev6awA4_ZT69Q6_DHER9w'
  var sdkKey = 'AnnedL1jTRuxuCHmR80rMQ'
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
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
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

export default App;
