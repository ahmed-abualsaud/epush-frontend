import axios from 'axios'
import { Config } from '../config/Config'

const api = axios.create({ baseURL: Config.get("REACT_APP_SERVER_URL")})

export default api