# Chart Room Demo

## Introduction

The following demo tries to accomplish the following:

* A simple demo for a chat application. 
* Built with:
  * .net core for back end
  * sqlite for simple database
  * angular for client 
  * swagger for open api 
  
 
## Requirements

For this application, wanted to cover the following user stories:

* Allow user to login.
* Allow user to register.
* Allow user to create a new conversation choosing another person.
* Allow user to send instant messages to selected person.
* Allow user to receive a new instant message when the other person responds.

## Live application

You can see the final result here:

https://chat-room.azurewebsites.net/

You can also take a look at the possible apis here:

https://chat-room.azurewebsites.net/swagger

## Setup

### Required

#### Backend

* dot net core 3 needs to be installed:

  https://dotnet.microsoft.com/download/dotnet-core/3.0

#### Front end

* node 12 needs to get installed:

  https://nodejs.org/en/download/

### Optional

#### Backend

* sqlite viewer: if you want to take a look at db at any point:

  https://sqlitebrowser.org/dl/

#### Frontend

* nvm: strongly recommended, to handle multiple versions of node.

  https://github.com/nvm-sh/nvm

  On mac,

  ```
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
  ```

  After installing, for using node 12, simple do

  ```
  nvm install 12
  nvm use 12
  ```

* angular-cli: if you want to add additional changes into.

  https://cli.angular.io/

  ```
  npm i -g @angular/cli
  ```

* swagger: if you want to use the code gen tools added:

  https://github.com/swagger-api/swagger-node/

  ```
  npm i -g swagger
  ```
  
### IDE

Using jetbrains products, just in case:

* project rider for backend:

  https://www.jetbrains.com/rider/
  
* webstorm for front end:

  https://www.jetbrains.com/webstorm/

## Running

To run the application, in your terminal go to to the web project:

```
/chat-room.web
```

And do:

```
dotnet run
```

At that point you access to:

https://localhost:5201/

dotnet and node will start running along side handle backend and client respectively.

## Features

Some features detailed about how this is built.

### Backend

#### Database

The database is using sqlite to setup a simple relational database.

Contains 4 different tables:

* Conversations: Contains conversations
* Messages: Contains messages referencing a user and a conversation.
* UserConversation: Maps many to many conversations and users.
* Users: Users in the application

These tables are able to accommodate for the requirements. 

#### Entity Framework Core

Using entity framework for db context, and using a code first approach to generate the db schema from code.

#### Encryption

Using simple encryption for storing passwords in the db using open sourced Bouncy Castle library.

#### SignalR

Using signalR to do push notifications to the client when a new message or conversation happens.

#### SPA services

Using spa services to create a bridge between node runtime and dotnet runtime and quickly host the angular solution in the web server.

### Frontend

#### Swagger

Using swagger and open api tools for:

* Documentation of the open api endpoints, you can take a look here also:

[swagger readme](chat-room.swagger/api/readme.md)

* Code generation for three cases:
  
  * Angular api module
  * Swagger json file for server hosted: https://chat-room.azurewebsites.net/swagger
  * Stubs for dotnet server for controllers

To use the code gen, go to

```
/chat-room.swagger
```

And do

```
npm run gen
```

To run the docs:

```
npm run doc
```

Also there is a swagger mock server available, which is used mainly for quickly modifying UI without running dot net.

To run it:

```
npm run start
```

#### Angular

In angular there are several features.

* Reactive forms used all over, register, login, chat.

* Guards to grant UI access on server approval.

* Application error handler.

* Observable pattern use for typeaheads and service calls.

* Bootstrap & NGBootstrap libraries usages for custom themes for UX.

* SignalR implementation to get push notifications from server.

* Extending environments configurations.

* Prettier for syntax consistency. 

angular-cli and swagger can be used to quickly do pure ui work, without dot net. 

After running swagger mock server as mentioned above, you can run the ui pointing to swagger:

Navigate to:

```
/chat-room.ng
```

```
npm run start:swagger
```

#### Devops

Using an azure account to create a pipeline that uses all the mentioned tech stack, and created:

- CI/CD for getting a new build/release on each check in.

- Unit tests and e2e testing part of pipeline to create successful releases.

### Inspiration

Wanted to provide an application that could be used in medical environments, so I found this clean UI from dribbble:

https://dribbble.com/shots/7150708-iPad-Hospital-App-chat/attachments/155008?mode=media

Created a bootstrap theme that accommodates for it.
