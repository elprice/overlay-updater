import React, { Component } from 'react';
import './Home.css';
import { Container, Row, Col, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap';
import Select from 'react-select';


const options = [
  { value: 'Grand Finals' },
  { value: 'strawberry' },
  { value: 'vanilla' },
];

export default class Home extends Component {

  constructor(props) {
    super(props)

    /*TODO test data*/
    this.state = {
      playerOneName: 'p1',
      playerTwoName: 'p2',
      playerOneWins: 1,
      playerTwoWins: 2
    }

    this.baseState = this.state
  }
  
  handleChange = (event) =>{
    this.setState({[event.target.id]: event.target.value})
  }
  increment = (name) => {
    this.setState(prevState => ({[name]: ++prevState[name]}))
  }
  decrement = (name) => {
    this.setState(prevState => ({[name]: --prevState[name]}))
  }
  reset = () => {
    this.setState(this.baseState)
  }
  swapPlayers = () => {
    this.swap('playerOneWins', 'playerTwoWins')
    this.swap('playerOneName', 'playerTwoName')
  }
  swap = (first, second) =>{
    this.setState(prevState=> ({
      [first]: prevState[second],
      [second]: prevState[first]
    }))
  }

  render() {

    return (
      <div>
        <Container>
          <Row>
            <Col xs="8" sm="9" md="9" lg="10" xl="10">
              <label htmlFor="basic-url">Players</label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="playerOne">
                    P1
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="playerOneName" aria-describedby="playerOne" value= {this.state.playerOneName} onChange={this.handleChange}/>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="playerTwo">
                    P2
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="playerTwoName" aria-describedby="playerTwo" value= {this.state.playerTwoName} onChange={this.handleChange}/>
              </InputGroup>
            </Col>
            <Col xs="4" sm="3" md="3" lg="2" xl="2">
              <label htmlFor="basic-url">Wins</label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button {...(this.state.playerOneWins==0?{disabled:'disabled'}:{})} variant="danger" onClick={()=>this.decrement('playerOneWins')}>-</Button>
                </InputGroup.Prepend>
                <FormControl className="text-center" id="playerOneWins" placeholder={this.state.playerOneWins} aria-describedby="playerOne" readOnly/>
                <InputGroup.Append>
                  <Button variant="success" onClick={()=>this.increment('playerOneWins')}>+</Button>
                </InputGroup.Append>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button {...(this.state.playerTwoWins==0?{disabled:'disabled'}:{})} variant="danger" onClick={()=>this.decrement('playerTwoWins')}>-</Button>
                </InputGroup.Prepend>
                <FormControl className="text-center" id="playerTwoWins" placeholder={this.state.playerTwoWins} aria-describedby="playerTwo" readOnly/>
                <InputGroup.Append>
                  <Button variant="success" onClick={()=>this.increment('playerTwoWins')}>+</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <label htmlFor="basic-url">Round</label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="playerOne">
                    P1
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="playerOneName" aria-describedby="playerOne" value= {this.state.playerOneName} onChange={this.handleChange}/>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <ButtonToolbar>
                <Button variant="primary" onClick={this.swapPlayers}>Swap</Button>
                <Button variant="secondary" onClick={this.reset}>Reset</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
