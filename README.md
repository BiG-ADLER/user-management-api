
# User Management Api

Simple User Management Api With Express

## API Reference

#### Create User (Put Datas in Body With JSON Format)

```http
  POST /create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Username |
| `email` | `string` | **Required**. Email |
| `password` | `string` | **Required**. Password |

#### Login Into User Account (Put Datas in Body With JSON Format)

```http
  POST /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email |
| `password` | `string` | **Required**. Password |

#### Delete User Account (Put Datas in Body With JSON Format)

```http
  DELETE /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Email |
| `password` | `string` | **Required**. Password |

#### Get User Data

```http
  GET /user/${email}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Get User Data From **User Email** |


## Deployment

To deploy this api run this command in console(cmd)

```bash
  npm Start
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/BiG-ADLER/user-management-api
```

Go to the project directory

```bash
  cd user-management-api
```

Install dependencies

```bash
  npm install
```

Start the api server

```bash
  npm start
```


## Authors

- [@BiG ADLER](https://www.github.com/BiG-ADLER)


## Acknowledgements

 - [Express JS](https://expressjs.com/)
 - [Node JS](https://nodejs.org/en)
 - [Postman Application](https://www.postman.com/)


## Support

For support, [Send Email](https://mail.google.com/mail/?view=cm&source=mailto&to=bigadler40@gmail.com) or [DM to Me](https://discord.com/users/809903662947893319) in Discord.


## License

[MIT](https://choosealicense.com/licenses/mit/)

