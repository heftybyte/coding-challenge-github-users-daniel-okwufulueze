let githubList = null

class GithubList {
  constructor () {
    githubList = githubList ? githubList : this
  }

  getUsersData (commaSeparatedString = '') {
    const usersArray = commaSeparatedString.split(',')
    let responseArray = usersArray.map((user) => {
      user = user.trim()
      return new Promise (function (resolve, reject) {
        fetch(`https://api.github.com/users/${user}`)
        .then(response => response.json())
        .then((JSONResponse) => resolve(Object.assign(JSONResponse, { originalSearchTerm: user })))
        .catch((error) => reject(error))
      })
    })

    return responseArray
  }
}

githubList = new GithubList()

export default githubList
