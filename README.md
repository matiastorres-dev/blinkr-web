# Blinker Web

A React TypeScript application for file upload management with authentication.

## Features

- 🔐 Login authentication with API integration
- 📁 File upload support for CSV, XLS, and XLSX files
- 🏪 Store selection from API
- 📊 Upload progress tracking
- 🚪 Logout functionality

## API Endpoints

- **Login**: `POST https://blinker-api.onrender.com/auth/login`
- **Stores**: `GET https://blinker-api.onrender.com/stores`

## Usage

1. **Login**: Enter your email and password to authenticate
2. **Select Store**: Choose a store from the dropdown
3. **Upload Files**: Select CSV, XLS, or XLSX files to upload
4. **Monitor Progress**: Track upload progress for each file
5. **Logout**: Click the logout button in the header to sign out

## Tech Stack

- React 18 with TypeScript
- Material-UI (MUI)
- Axios for API calls

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
