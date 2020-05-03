```
    NOTE: USE YARN FOR RUNNING THE CREATE REACT APP NOT A NPM
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `Pacakages insall`

# Antd

-   we are using Antd css frame work for the component.
-   To use antd in create react app we need to install moment of version 2.18.1 for more refrence `https://github.com/ant-design/ant-design/issues/23823`

```
yarn add moment@2.18.1
```

-   This is one of the dependances craete react ask for using antd.
-   We also need to add the `import 'antd/dist/antd.css'` in the index.js file of the root folder of create-react-app

# Issues

```
    NOTE: It's a API issue not a UI issue
```

There are issues with API, All api is not correlated with each other, Because of that User is not getting proper data.<br>

API with end point `IncidentsByState` is suppose to be a subset of API with end point `incidents` but its not.<br>

Data that we are displaying to user is not a consistent. <br>

While inserting data for incident, `short_description` is required field but we are not showing this data on the screen(Table). Which will be irrelevant for the user.<br>

When we updating the data it is not updating the API endpoint `incidents`.

# Card

Reusable component

## Props:

-   title: We can pass title of a card
-   count: Data which will get represent inside the card body.
-   handleDisplayState: Function which get back the title of the card on onClick.

# Card Component

NOT Reusable component

## Props:

-   openCount: Data for one of the reusable card
-   inProcessCount: Data for one of the reusable card
-   resolvedCount: Data for one of the reusable card
-   closedCount : Data for one of the reusable card
-   handleDisplayState: Function which get back the title of the card on onClick.

# Error Component

Reusable component

## Props:

-   className: Class for selecting style
-   errorText: Error text for display

# Form Component

Not Reusable component.<br>
Used Antd library for getting predefined user side form validation.

## Props:

-   handleModalState: Will get back the state for modal which is Boolean.
-   handleSubmitForm: Function will get back all the data of the form for making fetch call.
-   submitButtonText: text will get display on button.

# Loading Component

Reusable component.<br>
Reason for making separate component is if we want to add design then we just need to add once.

# Main Component

Not Reusable component.<br>
It contain all the business logic of project<br>
NOTE: We can change the architecture and remove business logic from main component but it is matter of choice and depending how big is project, If project is but its better to distribute the logic to.

# Modal Component

Reusable component.<br>
Used Antd library so I an use predefined function

## Props:

-   modalButtonText: Text of modal button
-   modalTitle: Title of modal
-   modalState: state of the modal which is Boolean
-   handleModalState: Function which get back display state of modal.

# Table Component

Reusable component.<br>
Do not need to put into different file, but if the project is bigger then we want to add lot of props depending on requirement and that was the only reason to put table in different file so in the future we can scale the component.

## Props:

-   columns: Column structure in which we want to display data
-   data: Data source that we want to display on the screen

# Reusable Function

In Util folder I have written the reusable function file.<br>
api.js contain reusable function which is return for AJAX call.
<br>
Used facad design pattern which helps us in the future if we to change the library for AJAX call.<br>
Example if we want to use the Axios instead of fetch it will essay for to change with out changing lot of code.

---

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
