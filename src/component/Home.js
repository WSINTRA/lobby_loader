import React from 'react'
import home from '../home.png'
import YouTube from 'react-youtube';

class Home extends React.Component {

_onReady(event) {
  // access to player in all event handlers via event.target
  // event.target.mute();
}

_onEnd(event) {
  event.target.playVideo();
}

render() {


  const videoOptions = {
    playerVars: { // https://developers.google.com/youtube/player_parameters
      disablekb: 1,
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      start: 4,
      loop: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    }
  };

  const randomVideo = ()=> {
  	let videos = ["7r2ef7XRggA", "Pp2aMs38ERY", "xlxuPsQFX28","ta7ufW0Prws"
  	,"Xv20j8ChtRY","t9Bw-pgZcVo","dJJnxHcv1z4","1XUqK4l3VAU","RYVDt8XhTBM"
  	,"9eYi6FugU0k","FAzHyXZPm0"]
  	let randomIndex = Math.floor(Math.random() * (videos.length-1));

  	return videos[randomIndex]
  }

  return (
    <div >
    

      <div id="wrapper">

      </div>
      <img alt="LobbyLoader" src={home} />
      <p className="homeText">
      <strong>Login and join the party! 
      Add games to your profile and create new parties. Get other users to join your party and send party messages.</strong></p>

      <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId={randomVideo()}
            opts={videoOptions}
            className="video-iframe"
            onReady={this._onReady}
            onEnd={this._onEnd}
          />
        </div>
      </div>
    </div>
  )
}
}

export default Home;