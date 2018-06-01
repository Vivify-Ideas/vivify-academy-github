import axios from 'axios'

const API_TOKEN = '4fc916fa2ab0b640529233730f95b134ce913060'

export default class GitHubService {
  constructor () {
    axios.defaults.baseURL = 'https://api.github.com/'
    axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`
  }

  getRepos (username) {
    return axios.get(`/users/${username}/repos`)
  }

  getUser (username) {
    return axios.get(`/users/${username}`)
  }
}

export const gitHub = new GitHubService()
