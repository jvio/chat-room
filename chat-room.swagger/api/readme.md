# Swagger Chat-Room

## Version: 1.0.0

[Find out more about Swagger](http://swagger.io)

### /hello

#### GET

##### Description:

Returns 'Hello' to the caller

##### Parameters

| Name | Located in | Description                                 | Required | Schema |
| ---- | ---------- | ------------------------------------------- | -------- | ------ |
| name | query      | The name of the person to whom to say hello | No       | string |

##### Responses

| Code    | Description | Schema                                    |
| ------- | ----------- | ----------------------------------------- |
| 200     | Success     | [HelloWorldResponse](#helloworldresponse) |
| default | Error       | [ErrorResponse](#errorresponse)           |

### /messages

#### POST

##### Summary:

Add a new message to the conversation

##### Description:

##### Parameters

| Name | Located in | Description                                               | Required | Schema              |
| ---- | ---------- | --------------------------------------------------------- | -------- | ------------------- |
| body | body       | Message object that needs to be added to the conversation | Yes      | [Message](#message) |

##### Responses

| Code | Description          | Schema              |
| ---- | -------------------- | ------------------- |
| 200  | successful operation | [Message](#message) |
| 405  | Invalid input        |                     |

null

#### PUT

##### Summary:

Update an existing message

##### Description:

##### Parameters

| Name | Located in | Description                                                 | Required | Schema              |
| ---- | ---------- | ----------------------------------------------------------- | -------- | ------------------- |
| body | body       | Message object that needs to be updated to the conversation | Yes      | [Message](#message) |

##### Responses

| Code | Description          | Schema              |
| ---- | -------------------- | ------------------- |
| 200  | successful operation | [Message](#message) |
| 400  | Invalid ID supplied  |                     |
| 404  | Message not found    |                     |
| 405  | Validation exception |                     |

null

### /messages/{messageId}

#### GET

##### Summary:

Find message by ID

##### Description:

Returns a single message

##### Parameters

| Name      | Located in | Description             | Required | Schema |
| --------- | ---------- | ----------------------- | -------- | ------ |
| messageId | path       | Id of message to return | Yes      | long   |

##### Responses

| Code | Description          | Schema              |
| ---- | -------------------- | ------------------- |
| 200  | successful operation | [Message](#message) |
| 400  | Invalid ID supplied  |                     |
| 404  | Message not found    |                     |

null

#### DELETE

##### Summary:

Deletes a message

##### Description:

##### Parameters

| Name      | Located in | Description          | Required | Schema |
| --------- | ---------- | -------------------- | -------- | ------ |
| messageId | path       | Message id to delete | Yes      | long   |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 400  | Invalid ID supplied |
| 404  | Message not found   |

null

### /conversations

#### GET

##### Summary:

Get conversations

##### Description:

Returns all conversations

##### Responses

| Code | Description          | Schema                            |
| ---- | -------------------- | --------------------------------- |
| 200  | successful operation | [ [Conversation](#conversation) ] |
| 400  | Invalid ID supplied  |                                   |
| 404  | Message not found    |                                   |

null

#### POST

##### Summary:

Add a new conversation

##### Description:

##### Parameters

| Name | Located in | Description                                | Required | Schema                        |
| ---- | ---------- | ------------------------------------------ | -------- | ----------------------------- |
| body | body       | Conversation object that needs to be added | Yes      | [Conversation](#conversation) |

##### Responses

| Code | Description          | Schema                        |
| ---- | -------------------- | ----------------------------- |
| 200  | successful operation | [Conversation](#conversation) |
| 405  | Invalid input        |                               |

null

#### PUT

##### Summary:

Update an existing conversation

##### Description:

##### Parameters

| Name | Located in | Description                                  | Required | Schema                        |
| ---- | ---------- | -------------------------------------------- | -------- | ----------------------------- |
| body | body       | Conversation object that needs to be updated | Yes      | [Conversation](#conversation) |

##### Responses

| Code | Description            | Schema                        |
| ---- | ---------------------- | ----------------------------- |
| 200  | successful operation   | [Conversation](#conversation) |
| 400  | Invalid ID supplied    |                               |
| 404  | Conversation not found |                               |
| 405  | Validation exception   |                               |

null

### /conversations/{conversationId}

#### GET

##### Summary:

Find conversation by ID

##### Description:

Returns a single conversation

##### Parameters

| Name           | Located in | Description                  | Required | Schema |
| -------------- | ---------- | ---------------------------- | -------- | ------ |
| conversationId | path       | Id of conversation to return | Yes      | long   |

##### Responses

| Code | Description          | Schema                        |
| ---- | -------------------- | ----------------------------- |
| 200  | successful operation | [Conversation](#conversation) |
| 400  | Invalid ID supplied  |                               |
| 404  | Message not found    |                               |

null

#### DELETE

##### Summary:

Deletes a conversation

##### Description:

##### Parameters

| Name           | Located in | Description               | Required | Schema |
| -------------- | ---------- | ------------------------- | -------- | ------ |
| conversationId | path       | Conversation id to delete | Yes      | long   |

##### Responses

| Code | Description         |
| ---- | ------------------- |
| 400  | Invalid ID supplied |
| 404  | Message not found   |

null

### /users

#### GET

##### Summary:

Get users

##### Description:

Returns all users

##### Responses

| Code | Description          | Schema            |
| ---- | -------------------- | ----------------- |
| 200  | successful operation | [ [User](#user) ] |
| 400  | Invalid ID supplied  |                   |
| 404  | Message not found    |                   |

null

#### POST

##### Summary:

Create user

##### Description:

This can only be done by the logged in user.

##### Parameters

| Name | Located in | Description         | Required | Schema        |
| ---- | ---------- | ------------------- | -------- | ------------- |
| body | body       | Created user object | Yes      | [User](#user) |

##### Responses

| Code | Description          | Schema        |
| ---- | -------------------- | ------------- |
| 200  | successful operation | [User](#user) |

### /users/login

#### GET

##### Summary:

Logs user into the system

##### Description:

##### Parameters

| Name     | Located in | Description                          | Required | Schema |
| -------- | ---------- | ------------------------------------ | -------- | ------ |
| username | query      | The user name for login              | Yes      | string |
| password | query      | The password for login in clear text | Yes      | string |

##### Responses

| Code | Description                        |
| ---- | ---------------------------------- |
| 200  | successful operation               |
| 400  | Invalid username/password supplied |

### /users/logout

#### GET

##### Summary:

Logs out current logged in user session

##### Description:

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |


##### Responses

| Code    | Description          |
| ------- | -------------------- |
| default | successful operation |

### /users/logged

#### GET

##### Summary:

Get user logged

##### Description:

##### Responses

| Code | Description          | Schema        |
| ---- | -------------------- | ------------- |
| 200  | successful operation | [User](#user) |
| 404  | User not found       |               |

### /users/{username}

#### GET

##### Summary:

Get user by user name

##### Description:

##### Parameters

| Name     | Located in | Description                                               | Required | Schema |
| -------- | ---------- | --------------------------------------------------------- | -------- | ------ |
| username | path       | The name that needs to be fetched. Use user1 for testing. | Yes      | string |

##### Responses

| Code | Description               | Schema        |
| ---- | ------------------------- | ------------- |
| 200  | successful operation      | [User](#user) |
| 400  | Invalid username supplied |               |
| 404  | User not found            |               |

#### PUT

##### Summary:

Updated user

##### Description:

This can only be done by the logged in user.

##### Parameters

| Name     | Located in | Description                  | Required | Schema        |
| -------- | ---------- | ---------------------------- | -------- | ------------- |
| username | path       | name that need to be updated | Yes      | string        |
| body     | body       | Updated user object          | Yes      | [User](#user) |

##### Responses

| Code | Description           |
| ---- | --------------------- |
| 400  | Invalid user supplied |
| 404  | User not found        |

#### DELETE

##### Summary:

Delete user

##### Description:

This can only be done by the logged in user.

##### Parameters

| Name     | Located in | Description                       | Required | Schema |
| -------- | ---------- | --------------------------------- | -------- | ------ |
| username | path       | The name that needs to be deleted | Yes      | string |

##### Responses

| Code | Description               |
| ---- | ------------------------- |
| 400  | Invalid username supplied |
| 404  | User not found            |

### /swagger

### Models

#### HelloWorldResponse

| Name    | Type   | Description | Required |
| ------- | ------ | ----------- | -------- |
| message | string |             | Yes      |

#### ErrorResponse

| Name    | Type   | Description | Required |
| ------- | ------ | ----------- | -------- |
| message | string |             | No       |

#### Message

| Name           | Type     | Description | Required |
| -------------- | -------- | ----------- | -------- |
| messageId      | long     |             | No       |
| userId         | long     |             | No       |
| conversationId | long     |             | No       |
| content        | string   |             | No       |
| sentDate       | dateTime |             | No       |

#### Conversation

| Name           | Type                    | Description | Required |
| -------------- | ----------------------- | ----------- | -------- |
| conversationId | long                    |             | No       |
| users          | [ long ]                |             | No       |
| messages       | [ [Message](#message) ] |             | No       |

#### User

| Name       | Type    | Description | Required |
| ---------- | ------- | ----------- | -------- |
| userId     | long    |             | No       |
| username   | string  |             | Yes      |
| firstName  | string  |             | No       |
| lastName   | string  |             | No       |
| email      | string  |             | No       |
| password   | string  |             | No       |
| phone      | string  |             | No       |
| isDoctor   | boolean |             | No       |
| age        | integer |             | No       |
| blood      | string  |             | No       |
| userStatus | string  | User Status | No       |
