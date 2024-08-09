import axios from 'axios'

const baseUrl = '/api/login'

const login = (credentials) =>
  axios.post(baseUrl, credentials, {}).then((response) => {
    console.log('Response data:', response.data)
    return response.data
  })

export default { login }
