# Doczy-Todo-CRUD

Backend test for internship application at Doczy.

## Live testing

Visit https://doczy-todo-crud.onrender.com/api

The host services' free instance will spin down with inactivity, which can delay requests by 50 seconds or more. So please be patient.

## Building and running your application

When you're ready, start your application by running:
`docker compose up --build`.

Remember to change your application's port in the .env file.

## References

- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)

## Running without using Docker

If you are not using Docker, follow these steps

First, install the required dependencies:

`npm i`

Then run the application:

`npm run start:prod`

# API Documentation

Main endpoint: https://doczy-todo-crud.onrender.com/todo

## Response format

All API responses follow a consistent structure as described below:

```ts
type ResponseEntity<T> = {
  success: boolean;
  error?: string;
  data: T;
};
```

- **`success`** (`boolean`): Indicates whether the request was successful.
- **`error`** (`string`, optional): Describes the error if `success` is `false`.
- **`data`** (`T`): Contains the actual response payload, which varies depending on the endpoint.

Example responses:

```json
{
    "success": false,
    "error": "Todo entity not found",
    "data": null
}
```

```json
{
    "success": true,
    "data": {
        "_id": "6837436322a8524eb6b66a70",
        "title": "Buy groceries",
        "status": "todo",
        "createdAt": "2025-05-28T17:09:55.559Z",
        "updatedAt": "2025-05-28T17:09:55.559Z"
    }
}
```

## Response DTO

This application has a single response DTO for TODO items.

| Name       | Data Type        | Description              |
|------------|------------------|--------------------------|
| `_id`      | `string`         | MongoDB ObjectId         |
| `title`    | `string`         | Title of the todo        |
| `content`  | `string`         | (Optional) Content detail |
| `status`   | `Status` enum    | (Optional) Todo status `todo`, `in_progress`, `completed`, `cancelled`   |
| `dateTime` | `string` (ISO)   | (Optional) Scheduled date and time |
| `createdAt`| `string` (ISO)   | (Optional) Creation timestamp |
| `updatedAt`| `string` (ISO)   | (Optional) Last update timestamp |


Example:

```json
{
    "success": true,
    "data": {
        "_id": "6837436322a8524eb6b66a70",
        "title": "Buy groceries",
        "status": "todo",
        "createdAt": "2025-05-28T17:09:55.559Z",
        "updatedAt": "2025-05-28T17:09:55.559Z"
    }
}
```

## Endpoints

### 📌 Create a New TODO Item

<details>
<summary><code>POST</code> <code><b>/</b></code> <code>(create new TODO item)</code></summary>

#### 🔸 Request Body

Send a JSON object with the following fields:

| Name       | Type     | Required | Description                       |
|------------|----------|----------|-----------------------------------|
| `title`    | `string` | Yes      | Title of the TODO item            |
| `content`  | `string` | No       | Optional content/details          |
| `status`   | `Status` | No       | Optional status (`todo`, `in_progress`, `completed`, `cancelled`) |
| `dateTime` | `string` (ISO) | No  | Optional ISO 8601 datetime string |

Example:
```json
{
  "title": "Buy groceries",
  "content": "Milk, bread, eggs",
  "status": "todo",
  "dateTime": "2025-06-01T10:00:00.000Z"
}
```

</details>

### 📄 Get All TODO Items

<details>
<summary><code>GET</code> <code><b>/</b></code> <code>(fetch TODO items with filters, pagination, and sorting)</code></summary>

#### 🔸 Query Parameters

| Name         | Type                       | Required | Description                                    |
|--------------|----------------------------|----------|------------------------------------------------|
| `title`      | `string`                   | No       | Filter by exact title                          |
| `content`    | `string`                   | No       | Filter by content                              |
| `status`     | `todo` &#124; `in_progress` &#124; `completed` &#124; `cancelled` | No | Filter by TODO status                          |
| `dateTime`   | `string` (ISO 8601)        | No       | Filter by exact datetime                       |
| `skip`       | `number`                   | No       | Number of items to skip (for pagination), default: `0` |
| `limit`      | `number`                   | No       | Max number of items to return, default: `10`   |
| `sortBy`     | `title` &#124; `dateTime` &#124; `_id` | No | Field to sort by, default: `_id`               |
| `sortOrder`  | `asc` &#124; `desc`        | No       | Sorting order, default: `desc`                 |
</details>

### 🔍 Get a TODO Item by ID

<details>
<summary><code>GET</code> <code><b>/:id</b></code> <code>(retrieve a single TODO item by ID)</code></summary>

#### 🔸 Path Parameter

| Name  | Type     | Required | Description                  |
|-------|----------|----------|------------------------------|
| `id`  | `string` | Yes      | MongoDB ObjectId of the TODO item |
</details>

### ✏️ Update a TODO Item

<details>
<summary><code>PATCH</code> <code><b>/:id</b></code> <code>(partially update a TODO item by ID)</code></summary>

#### 🔸 Path Parameter

| Name  | Type     | Required | Description                  |
|-------|----------|----------|------------------------------|
| `id`  | `string` | Yes      | MongoDB ObjectId of the TODO item |

#### 🔸 Request Body (Partial)

You may include **any subset** of the fields below to update:

| Name       | Type     | Description                       |
|------------|----------|-----------------------------------|
| `title`    | `string` | Title of the TODO item            |
| `content`  | `string` | Optional content/details          |
| `status`   | `todo` &#124; `in_progress` &#124; `completed` &#124; `cancelled` | Status of the TODO item |
| `dateTime` | `string` (ISO 8601) | Scheduled date and time |

Example:

```json
{
    "title": "Buy me flower",
    "status": "completed"
}
```

</details>

### 🗑️ Delete a TODO Item

<details>
<summary><code>DELETE</code> <code><b>/:id</b></code> <code>(delete a TODO item by ID)</code></summary>

#### 🔸 Path Parameter

| Name  | Type     | Required | Description                  |
|-------|----------|----------|------------------------------|
| `id`  | `string` | Yes      | MongoDB ObjectId of the TODO item |

</details>
