import axios from 'axios'

const API_TOKEN = ''

export default class GitHubService {
  constructor () {
    axios.defaults.baseURL = 'https://api.github.com/'
    axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`
  }

  getRepos (username) {
    return axios.get(`/users/${username}/repos`)
  }
}

export const gitHub = new GitHubService()
