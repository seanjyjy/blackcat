# Table of contents

- [Documentations](#documentations)
- [Get Started](#get-started)
- [Project Structure](#project-structure)
- [APIs](#apis)

## Documentations

[Technical Requirements](requirements.md)
[Tech Design Document](https://docs.google.com/document/d/19P30BS0AQLVt_4zD0LXlUZBbsXhRQ4JZAwz96e_N6to/edit)

## Get Started

To get started

```
git clone https://git.garena.com/sean.lum/blackcat.git
```

**Important**

Check if you have `data.json` in your root directory. If `data.json` is missing, go to `faker.mjs` to generate the data

Ensure [yarn](https://yarnpkg.com/) is installed on your local machine.

Then execute:

`yarn install`

In the project directory, you can run:

### `yarn run start`

Runs the app in the development mode.<br />
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn run server`

Runs the backend server of the app. <br/>

### `yarn run build`

Builds the app for production to the `dist` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn run demo`

Runs both the frontend and backend server. Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) to view it in the browser. **Note**: Should always run `yarn run build` first.

### `yarn run test`

Launches the test runner.<br />

## Project structure

The current project structure and its important directories are shown below:

```
blackcat
└─public/
└─src/
  │ App.tsx
  │ index.tsx
  | types.ts
  | global.d.ts
  └─__mocks__/
  └─__tests__/
  └─api/
  └─components/
  └─contexts/
  └─hooks/
  └─images/
  └─store/
  └─styles/
  └─util/
server
faker
...configs
```

<br/>
<br/>

## APIs

### GET

- `authentication` <br/>
  - Endpoint `/api/authentication`: : Simple authentication to check if user have login before.
  - Frontend: `apiFetchAuthentication` which replies `(success: boolean, name: string, avatar: string)`
- `post` <br/>
  - Endpoint `/api/post/:uuid`: Gets a particular post who has that `uuid`
  - Frontend: `apiFetchPost` which takes in `(uuid: string)`
- `posts` <br/>
  - Endpoint `/api/posts/`: Endpoint which filter posts based on serach and pageNo
  - Frontend: `apiFetchPosts` which takes in `(page: number, queryParams?: QueryParamsProps)`. QueryParamsProps consists of `{ sDate?: string; eDate?: string; chn?: string; }`

### POST

- `login` <br/>
  - Endpoint `/api/login`: Stores the user login information and session.
  - Frontend: `apiPostLogin` which takes in `(userName: string, password: string)`
- `post`: <br/>
  - Endpoint `/api/post/:uuid`: Updating a post (like, going, comment only)
  - Frontend: `apiPostUpdatePost` which takes in `(uuid: string, postObject: { like?: number; going?: number; comment?: CommentDetails })`. Note that `0` refers to false (not going / not like), vice versa

<br/>
<br/>
