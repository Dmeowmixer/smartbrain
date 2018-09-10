import React, { Component } from 'react'
import Navigation from './components/navigation/Navigation.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'

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
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(Clarifai.COLOR_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      console.log(response);
    },
    function(err) {
      // there was an error
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <Rank />
        <Particles className='particles' params={particlesOptions}/>
        <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
