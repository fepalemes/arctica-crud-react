# CRUD alunos - Arctica
CRUD developed in React for the Arctica company exam

To check the project deployed on web, go to:
https://arctica.fepalemes.com.br/

The project uses the following technologies:

- React
- Google Firebase
  - Cloud Firestore (NoSQL)

The project consists of the following features:

- Insert student
- List students (in alphabetical order)
- Consult student registration
- Update student registration
- Remove student

Follow the instructions below to install the dependencies and run the project.

## Install project
```
yarn
```
## Run project
```
yarn start
```

In the src/Firebase.js file, fill in the information provided by the Google Firebase Console

```
const config = {
    apiKey: "YOUR_APIKEY",
    authDomain: "YOUR_AUTHDOMAIN",
    projectId: "YOUR_PROJECTID",
    storageBucket: "YOUR_STORAGEBUCKET",
    messagingSenderId: "YOUR_MESSAGINGSENDERID",
    appId: "YOUR_APPID"
};
```