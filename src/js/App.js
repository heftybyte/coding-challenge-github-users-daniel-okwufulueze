import React, { Component } from 'react'
import SearchArea from './SearchArea'
import UserRow from './UserRow'
import githubList from './GithubList'
import '../css/App.css'

class App extends Component {
  constructor () {
    super()
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)
    this.populateResults = this.populateResults.bind(this)
    this.tryToEnableButton = this.tryToEnableButton.bind(this)
    this.state = {
      users: [],
      searchInput: ''
    }
  }

  handleSearchInputChange (evt) {
    let value = evt.target.value
    if (value.trim() !== '') {
      evt.target.classList.remove('error')
    }
    this.setState({
      searchInput: value
    })
  }

  handleSearchClick (evt) {
    const target = evt.target
    target.disabled = true
    target.style.background = '#dcdeff'
    target.style.cursor = 'not-allowed'
    const searchInput = this.state.searchInput
    if (searchInput.trim() === '') {
      const usersInputField = target.closest('.search-area').querySelector('#users')
      usersInputField.classList.add('error')
      this.tryToEnableButton(target, 1, 0)
    } else {
      this.populateResults(target)
    }
  }

  populateResults (target) {
    let newUsers = []
    const users = githubList.getUsersData(this.state.searchInput)
    users.forEach((user, index) => {
      user
      .then((response) => {
        newUsers.push(
          <UserRow
            data={ response }
            index= { index }
            key={ index }
          />
        )

        this.setState({
          users: newUsers
        })

        this.tryToEnableButton(target, users.length, index)
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }

  tryToEnableButton(target, max, index) {
    if (index === max - 1) {
      target.disabled = false
      target.style.background = '#29aae1'
      target.style.cursor = 'auto'
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='wrapper'>
          <SearchArea
            onSearchClick={ () => this.handleSearchClick }
            onKeyUp={ () => this.handleSearchInputChange }
          />
          <div className='result heading'>
            <div className='user-row'>
              <div className='user-name title'>User Name</div>
              <div className='number-of-repo title'>Number of Repositories</div>
            </div>
          </div>
          <div className='result'>
            { this.state.users }
          </div>
        </div>
      </div>
    )
  }
}

export default App
