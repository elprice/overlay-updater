import React, { Component } from 'react'
import './Home.css'
import { Container, Row, Col, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap'
import Autosuggest from 'react-autosuggest'
import AutosuggestHighlightMatch from 'autosuggest-highlight/match'
import AutosuggestHighlightParse from 'autosuggest-highlight/parse'

const players = [
  'jambi',
  'toaster'
]

const rounds = [
  'Loser\'s Rounds',
  'Loser\'s Quarters',
  'Loser\'s Semis',
  'Loser\'s Finals',
  'Winner\'s Rounds',
  'Winner\'s Quarters',
  'Winner\'s Semis',
  'Winner\'s Finals',
  'Grand Finals'
]

const playersTheme = {
  container: 'autosuggest',
  input: 'form-control',
  suggestionsContainer: 'dropdown',
  suggestionsList: `dropdown-menu ${players.length ? 'show' : ''}`,
  suggestion: 'dropdown-item',
  suggestionFocused: 'active'
}

const roundsTheme = {
  container: 'autosuggest',
  input: 'form-control',
  suggestionsContainer: 'dropdown',
  suggestionsList: `dropdown-menu ${rounds.length ? 'show' : ''}`,
  suggestion: 'dropdown-item',
  suggestionFocused: 'active'
}

const getSuggestions = (name, value) => {
  const val = value.toLowerCase();
  if(name == 'players') return val.length === 0 ? players : players.filter(sug => sug.toLowerCase().slice(0, val.length) === val)
  if(name == 'rounds')  return val.length === 0 ? rounds : rounds.filter(sug => sug.toLowerCase().slice(0, val.length) === val)
}

const getSuggestionValue = (suggestion) => {
  return suggestion
}

const renderSuggestion = (suggestion, {query}) => {
  const matches = AutosuggestHighlightMatch(suggestion, query)
  const parts = AutosuggestHighlightParse(suggestion, matches)
  return (
    <span>
     {
        parts.map((part, index) => {
          const className = part.highlight ? 'highlight' : null
          return (
            <span className={className} key={index}>{part.text}</span>
          )
        })
      }
    </span>
  )
}

const shouldRenderSuggestions = (value) => {
  return true
}

const write = (state) => {
  console.log(fs)
  //hard code all of these?
  try { 
    //fs.writeFileSync('./output/playerOneName.txt', state.playerOneName, 'utf-8')
    //fs.writeFileSync('./output/playerOneWins.txt', state.playerOneWins, 'utf-8')
    //fs.writeFileSync('./output/playerTwoName.txt', state.playerTwoName, 'utf-8')
    //fs.writeFileSync('./output/playerTwoWins.txt', state.playerTwoWins, 'utf-8')
    //fs.writeFileSync('./output/round.txt', state.round, 'utf-8')
  }
  catch(e) { 
    console.error('Failed to save files. \n' + e) 
  }
}

export default class Home extends Component {

  constructor(props) {
    super(props)

    /*TODO test data*/
    this.state = {
      playerOneName: 'asd',
      playerTwoName: 'q',
      playerOneWins: 1,
      playerTwoWins: 2,
      round: 'z',
      players: players,
      rounds: rounds
    }

    this.baseState = this.state
  }
  
  increment = (name) => {
    this.setState(prevState => ({[name]: ++prevState[name]}))
  }
  decrement = (name) => {
    this.setState(prevState => ({[name]: --prevState[name]}))
  }
  clearAll = () => {
    this.setState(this.baseState)
  }
  swapPlayers = () => {
    this.swap('playerOneWins', 'playerTwoWins')
    this.swap('playerOneName', 'playerTwoName')
  }
  swap = (first, second) => {
    this.setState(prevState=> ({
      [first]: prevState[second],
      [second]: prevState[first]
    }))
  }
  onChange = (event, { newValue }) => {
    this.setState({
      [event.target.id]: newValue
    })
  }
  onSuggestionsFetchRequested = (name, { value }) => {
    this.setState({
      [name]: getSuggestions(name, value)
    })
  }
  clear = (name) => {
    this.setState({
      [name]: []
    })
  }
  onSuggestionSelected = (name, {suggestion, suggestionValue}) =>{
    this.setState({
      [name]: suggestionValue
    })
}

  render() {

    const { playerOneName, playerTwoName, round, players, rounds } = this.state

    const playerOneInputProps = {
      id: 'playerOneName',
      value: playerOneName,
      onChange: this.onChange
    }
    const playerTwoInputProps = {
      id: 'playerTwoName',
      value: playerTwoName,
      onChange: this.onChange
    }
    const roundInputProps = {
      id: 'round',
      value: round,
      onChange: this.onChange
    }

    return (
      <div>
        <Container>
          <Row>
            <Col xs="8" sm="9" md="9" lg="10" xl="10">
              <label>Players</label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="playerOne">
                    P1
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Autosuggest theme={playersTheme}
                  id={playerOneInputProps.id}
                  suggestions={players}
                  onSuggestionsFetchRequested={(e) => this.onSuggestionsFetchRequested('players', e)}
                  onSuggestionsClearRequested={() => this.clear('players')}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  onSuggestionSelected={(e,suggestion)=>this.onSuggestionSelected(playerOneInputProps.id,suggestion)}
                  shouldRenderSuggestions={shouldRenderSuggestions}
                  inputProps={playerOneInputProps} 
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="playerTwo">
                    P2
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Autosuggest theme={playersTheme}
                  id={playerTwoInputProps.id}
                  suggestions={players}
                  onSuggestionsFetchRequested={(e) => this.onSuggestionsFetchRequested('players', e)}
                  onSuggestionsClearRequested={() => this.clear('players')}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  onSuggestionSelected={(e,suggestion)=>this.onSuggestionSelected(playerTwoInputProps.id,suggestion)}
                  shouldRenderSuggestions={shouldRenderSuggestions}
                  inputProps={playerTwoInputProps} 
                />              
              </InputGroup>
            </Col>
            <Col xs="4" sm="3" md="3" lg="2" xl="2">
              <label>Wins</label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button {...(this.state.playerOneWins==0?{disabled:'disabled'}:{})} variant="danger" onClick={()=>this.decrement('playerOneWins')}>-</Button>
                </InputGroup.Prepend>
                <FormControl className="text-center" id="playerOneWins" value={this.state.playerOneWins} aria-describedby="playerOne" readOnly/>
                <InputGroup.Append>
                  <Button variant="success" onClick={()=>this.increment('playerOneWins')}>+</Button>
                </InputGroup.Append>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <Button {...(this.state.playerTwoWins==0?{disabled:'disabled'}:{})} variant="danger" onClick={()=>this.decrement('playerTwoWins')}>-</Button>
                </InputGroup.Prepend>
                <FormControl className="text-center" id="playerTwoWins" value={this.state.playerTwoWins} aria-describedby="playerTwo" readOnly/>
                <InputGroup.Append>
                  <Button variant="success" onClick={()=>this.increment('playerTwoWins')}>+</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <label>Round</label>
              <Autosuggest theme={roundsTheme}
                id={roundInputProps.id}
                suggestions={rounds}
                onSuggestionsFetchRequested={(e) => this.onSuggestionsFetchRequested('rounds', e)}
                onSuggestionsClearRequested={() => this.clear('rounds')}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={(e,suggestion)=>this.onSuggestionSelected(roundInputProps.id,suggestion)}
                shouldRenderSuggestions={shouldRenderSuggestions}
                inputProps={roundInputProps} 
              />
            </Col>
          </Row>
          <Row>
            <Col xs="4" sm="4" md="4" lg="4" xl="4">
              <ButtonToolbar>
                <Button variant="primary" onClick={write}>Update</Button>
              </ButtonToolbar>
            </Col>
            <Col xs="8" sm="8" md="8" lg="8" xl="8">
              <ButtonToolbar className="float-right">
                <Button variant="secondary" onClick={this.swapPlayers}>Swap</Button>
                <Button variant="danger" onClick={this.clearAll}>Clear</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
