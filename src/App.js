import React, { Component } from 'react'
import Navigation from './components/navigation/Navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import Logo from './components/navigation/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import Rank from './components/Rank/Rank.js'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai';

import './App.css';

const particlesOptions = {
  //add options here, can make them responsive to mouse.
  particles: {
    number:{
      value:80,
      density:{
        enable: true,
        value_area: 800
      }
    }
  }
}

//Clarifai app obj instantiation w/ apiKey
const app = new Clarifai.App({
  apiKey: '85dcb4daccb246df99e7f373119522b2'
});

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width); 
    const height = Number(image.height); 
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }
  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response => this.displayFaceBox( this.calculateFaceLocation(response)))
  }
  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageURL, route, box} = this.state
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
         ? <div> 
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
            </div>
          : (
              this.state.route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;