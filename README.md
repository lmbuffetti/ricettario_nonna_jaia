# Ricettario Nonna Jaia

### WORKING PROGRESS

This Project is realized using React 16.7 (with Hooks), Redux and Firebase as database and storage.

## LINK

- **Firebase:** [Documentation](https://firebase.google.com/docs/database/web/start?authuser=0)
- **React:** [Documentation](https://reactjs.org/docs/getting-started.html)
- **React Hooks**: [Documentation](https://reactjs.org/docs/hooks-intro.html)

## Getting started

- `git clone git@github.com:lmbuffetti/ricettario_nonna_jaia.git` - Clone the project
- `cd ricettario_nonna_jaia` - Change directory to the project directory
- launch command `npm install` on terminal
- create the file `firebaseConfig.js` on folder `src/config` and save the firebase configuration
```
export const fbConfig = {
    apiKey: "XXXX",
    authDomain: "XXXX",
    databaseURL: "XXXX",
    projectId: "XXXX",
    storageBucket: "XXXX",
    messagingSenderId: "XXXX"
};
```
- launch command `npm start start-server`