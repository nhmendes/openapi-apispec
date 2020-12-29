# API first design

## Principles of API first design

1. Your API is the first user interface of your application
2. Your API comes first, then the implementation
3. Your API is described (and maybe even self-descriptive)

### Your API is the first user interface of your application

People developing against your API are your users, and your API needs to be designed with those users in mind.
Your API is how your product exposes its functionality.
Careful plan and design your API because after your API's released into the wild, it will be hard (or nearly impossible) to change.

### Your API comes first, then the implementation

Your implementation will change frequently, your API should not.
API evolution is additive in terms of functionality, and subtractive in terms of requirements.
While change is inevitable, planning for a graceful API evolution is a good way to minimize changes that break things. For example: required input may become optional, but not the other way around.

Your API should be a contract and specification to the implementation, instead of just being a thin veneer on top of your implementation.

### Your API is described (and maybe even self-descriptive)

Your API needs to be easily understood by people that have not been involved in its creation. That means documentation.

Following a standard pattern for URLs, resource types, request methods, headers, request parameters, and response formats will make it easier to explore and understand functionality, and reduces surprises when your API grows.

APIs must be self-descriptive by using hypermedia constructs like links that allow the discovery of other API resources.

### Requirements

- nodejs

```sh
sudo npm install nodejs
```

- swagger

```sh
sudo npm install -g swagger-cli
```

- spectral

```sh
npm install @stoplight/spectral
```

### npm init your apispec project

```sh
npm init
```

## Swagger

<https://swagger.io/specification/>

## Bundle all files into one single yaml so that we can run spectral validations

```sh
swagger-cli bundle api.yaml -o ./bin/api.yaml -t yaml
```

## Spectral

A flexible JSON/YAML linter, with out of the box support for OpenAPI v2/v3 and AsyncAPI v2.

<https://stoplight.io/p/docs/gh/stoplightio/spectral>

### Using spectral to validate OpenAPI documents

Check if your APIs are being designed following the proposed guidelines by your company, which could be a difficult job to do manually.

Thereby we can ask for a tool like Spectral to help us and create an autonomous process, to do this job.

Spectral is an open-source project that works like a linter to OpenAPI documents and has a lot of rules to ensure very common guidelines in the software industry to develop RESTFul APIs.

To use spectral is very simple, you just need to install the node package using the command below.

```sh
// using npm
sudo npm install -g @stoplight/spectral
// using yarn
sudo yarn add @stoplight/spectral
```

Before executing the command to lint and check if the API meets the guidelines, you need to bundle the API as mentioned before, after that just run the command below.

```sh
spectral lint ./bin/api.yaml --ignore-unknown-format
```

### Check Spectral documentation to implement custom rules

> <https://meta.stoplight.io/docs/spectral/README.md>

We can also take advantage and add this in the process of continuous integration or even via git hook, ensuring that we will always have the OpenAPI documents validated and compliant with the guidelines.

## prism-mock

TODO: add details about prism mock here

### To help write your readme file

- <https://www.markdownguide.org/>
- <https://dillinger.io/>
