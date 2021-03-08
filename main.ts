import { TemporaryCredentials } from "aws-sdk";
//import { GuestUsersApi } from './sdk/api';
import { Configuration, ConfigurationParameters, OrdersViewApi, OrderSearchRequest, OrderSearchRequestSortDirEnum } from './sdk';



// Example usage of the openapi generated client SDK

// Note: start the mock server 'npm run mock' in a terminal 
// window, and then run 'node js/main.js' on another terminal

/*
// NODE
var api = new GuestUsersApi();
var result = api.getUsers();
Promise.resolve(result)
	.then((res) => console.log(res.body))
	.catch((err) => console.log(err));
*/

/*
// AXIOS
var api = new GuestUsersApi();
var result = api.getUsers();
Promise.resolve(result)
	.then((res) => console.log(res.data))
	.catch((err) => console.log(err));
*/


// AXIOS
var params: ConfigurationParameters = {
	basePath: "http://127.0.0.1:4010",
};
var configuration = new Configuration(params);
var api = new OrdersViewApi(configuration);

var securityContext: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
var request: OrderSearchRequest = {
	start: "guid",
	size: 10,
	channelName: "Consumer-API",
	excludeFields: ["checkId","externalId"],
	sortDir: OrderSearchRequestSortDirEnum.Asc,
	checkId: null,
	endDate: new Date().toISOString(),
	externalId: null,
	failureReasonId: null,
	fields: ["", "", ""],
	orderId: null,
	orderState: "Completed",
	paymentType: "cash",
	serviceType: "Delivery",
	sortField: "firstName",
	startDate: new Date().toISOString(),
	storeId: null,
	storeName: null,
	storeNumber: null,
	userEmail: null,
	userFirstName: null,
	userLastName: null,
	userPhoneNumber: null,
};

var result = api.searchOrders(
	securityContext,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	new Date().toISOString(),
	new Date().toISOString(),
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	undefined,
	["field1", "field2"],
	["field1", "field2"]);
Promise.resolve(result)
	.then((res) => console.log(res.data))
	.catch((err) => console.log(err));

/*
var apiOrderRequestService = new ApiRequestService(
	apigClientFactory,
	credentialsFactory,
	"http://localhost:4010",
);
var params = {
	baseServer: server1,
	httpApi: null,//apiOrderRequestService,
	middleware: null,
	promiseMiddleware: null,
	authMethods: null,
};
var config = createConfiguration(params);
var api = new GuestUsersApiRequestFactory(config);
*/


/*
const apigClientFactory = require("@tce/aws-api-gateway-client").default;
const stsParams = null;
const credentialsFactory = new TemporaryCredentials(stsParams);
var apiRequestService = new ApiRequestService(
	apigClientFactory,
	credentialsFactory,
	"http://localhost:4010",
	"accountNum",
	"roleName",
);
*/

/*
var config = {
	baseServer: server1,
	httpApi: null,
	middleware: null,
	authMethods: AuthMethods,
};
var api = new GuestUsersApiRequestFactory(config);
var result = api.getUsers();

	Promise.resolve(result)
	.then((res) => console.log(res.data))
	.catch((err) => console.log(err));
*/
