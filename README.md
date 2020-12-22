# videojs-angular-demo

This repository shows the usage of `videojs` with angular.
Each branch has a different feature implementation.
The branches used are as follows:

- `feature/basic-videojs-setup` - as the name suggests, this branch contains the very basic setup for videojs.
  
- `feature/user-actions-hotkeys` - this branch contains example for listening and performing actions on press of different keyboard keys.
  
- `main` - this branch contains the merge of all feature branches.

## How to use

- After cloning the repository, `cd` into the repository and checkout into the desired branch.

- In the branch, run `npm i` to install the required dependencies.

- Once all the dependencies are installed, run `npm start` to see the working demo.

## Notes about code

> - The videojs related js files are included in `angular.json`
> - The styles for videojs are included in `src/styles.css`
> - The type definition for videojs options is included in `src/models/videojs-options.ts`
