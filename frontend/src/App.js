// Copyright Nicholas Buckeridge 

import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import nyan from './nyan.gif';
import './App.css';

import axios from "axios"

// Default route
const Index = () => (<>
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Welcome to the React and Flask example!
  </p>
  <p>Try going to some other pages and click around.</p>
</>)


// Just another page to route to
const About = () => (<>
  <h1>About Page!</h1>
  <p>See the <code>README.md</code> for more information</p>
  <img src={nyan} alt="cosmic cat" />
</>)

class AxiosExample extends React.Component {
  state = {
    files: []
  }

  constructor(props) {
    super(props)
    this.nameInput = React.createRef();
    this.contentInput = React.createRef();
  }

  handleCreate = () => {
    axios.get('/create-file?name=' + this.nameInput.current.value + '&content=' + this.contentInput.current.value)
  }

  handleRefresh = () => {
    axios.get('/list-files')
    .then( response => {
      this.setState({files: response.data})
    })
  }

  render() {
    return (<>
      <h1>Axios Example</h1>
      <a href="https://github.com/axios/axios">Axios Github</a>
      <table>
        <tbody>
          <tr>
            <td>File name</td>
            <td>
              <input type="text" ref={this.nameInput} />
            </td>
          </tr>
          <tr>
            <td>Content</td>
            <td>
              <input type="text" ref={this.contentInput} />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <input type="button" onClick={this.handleCreate} value="Create File" />
            </td>
          </tr>
        </tbody>
      </table>
  
      <br />
  
      <table>
        <thead>
          <tr>
            <th>File name</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>{
          this.state.files.map( node => {
            let { name, content } = node
            return (
              <tr key={name}>
                <td>{name}</td>
                <td>{content}</td>
              </tr>
            )
          })
        }</tbody>
      </table>
      <input type="button" onClick={this.handleRefresh} value="Refresh" />
    </>)
  }
}

// Handy navigation component
const Nav = () => (<>
  <nav className="Nav">
    Try out some other pages:
    <ul>
      <li>
        <Link className="App-link" to="/">Home</Link>
      </li>
      <li>
        <Link className="App-link" to="/axios-example">Axios</Link>
      </li>
      <li>
        <Link className="App-link" to="/about">About</Link>
      </li>
    </ul>
  </nav>
</>)

// Main entry point
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <header className="App-header">
          <Route path="/" exact component={Index} />
          <Route path="/axios-example" component={AxiosExample} />
          <Route path="/about" component={About} />
        </header>
      </div>
    </Router>
  );
}

export default App;
