// this setup of creating a file and then setting up some defaults which can be used 
// throughout the rest of the app is one way of using axios
// alternatively you can just import axios in each file and use it normally for HTTP requests etc.
import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://react-my-burger-9b2bc.firebaseio.com/'
})

export default instance;