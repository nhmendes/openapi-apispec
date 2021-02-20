import { GuestUsersApi } from './sdk/api';

// Example usage of the openapi generated client SDK

// Note: start the mock server 'npm run mock' in a terminal 
// window, and then run 'node js/main.js' on another terminal

var api = new GuestUsersApi();
var result = api.getUsers();

Promise.resolve(result)
	.then((res) => console.log(res.body))
	.catch((err) => console.log(err));
