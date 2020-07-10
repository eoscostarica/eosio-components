# eoscr-components

[![N|Solid](https://eoscostarica.io/wp-content/uploads/2019/06/EOSCr-logo.png)](https://eoscostarica.io/)

A collection of React Components for EOSIO.

## Table of Contents

- [Installation](#installation)
- [Components](#components)
- [Run locally](#run-locally)
- [File Structure](#file-structure)
- [License](#license)
- [Contributors](#contributors)

## Version

- 1.1.0

### Installation

Install the dependencies and devDependencies and start the server.

```
$ npm install eoscr-components --save
```

## Components

|                         | Description                              | Tag                 |
| ----------------------- | ---------------------------------------- | ------------------- |
| Create Account          | Form to create a new account             | `<CreateAccount />` |
| Get Account Information | Get an account information               | `<AccountInfo />`   |
| Input Hash              | Input Text to create or validate HASH256 | `<InputHash />`     |
| Dropzone Hash           | Drop zone to handle files                | `<DropzoneHash />`  |
| Backdrop                | Backdrop                                 | `<Backdrop />`      |

## Run locally

#### Local Development

We are using Storybook

> is an open source tool for developing UI
> components in isolation for React, Vue, and Angular.
> It makes building stunning UIs organized and efficient.

```bash
npm run storybook
```

_you can see more information about [STORYBOOK](https://storybook.js.org/)_

## File Structure

Within the download you'll find the following directories and files:

```
eoscr-components/
├── .storybook
│   ├── main.js
│   ├── preview.js
│   ├── preview-head.html
│   └── styles-decorator.js
│
├──  src
│   ├── api
│   │   └── eosjs-api.js
│   │
│   ├── config
│   │   └── index.js
│   │
│   ├── stories
│   │   ├── 0-AccountInfo.stories.js
│   │   ├── 1-CreateAccount.stories.js
│   │   ├── 2-InputHash.stories.js
│   │   ├── 3-Backdrop.stories.js
│   │   ├── 4-RicardianContract.stories.js
│   │   └── 5-DropzoneHash.stories.js
│   │
│   ├── utils
│   │   ├── convertHex2RGB.js
│   │   ├── convertVotesToEosVotes.js
│   │   ├── filereader.js
│   │   └── getRgbColorsFromHex.js
│   │
│   ├── AccountInfo.js
│   ├── Backdrop.js
│   ├── BPAvatar.js
│   ├── CreateAccount.js
│   ├── DropzoneHash.js
│   ├── FileComponent.js
│   ├── InputHash.js
│   ├── ProgressBar.js
│   ├── RicardianContract.js
│   └── index.js
│
├── .eslintrc
├── .gitignore
├── .prettierignore
├── README.md
├── prettier.config.js
└── package.json
```

## License

MIT © [EOS Costa Rica](https://eoscostarica.io)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<table>
  <tr>
    <td align="center"><a href="https://github.com/xavier506"><img src="https://avatars0.githubusercontent.com/u/5632966?v=4" width="100px;" alt="Xavier Fernandez"/><br /><sub><b>Xavier Fernandez</b></sub></a><br /><a href="#ideas-xavier506" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-xavier506" title="Blogposts">📝</a> <a href="#talk-xavier506" title="Talks">📢</a> <a href="#infra-xavier506" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
 <td align="center"><a href="https://github.com/tetogomez">
      <img src="https://avatars3.githubusercontent.com/u/10634375?s=460&v=4" width="100px;" alt="Teto Gomez"/><br /><sub><b>Teto Gomez</b></sub></a><br /><a href="https://github.com/eoscostarica/eosrate/commits?author=tetogomez" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/eoscostarica/eosrate/commits?author=tetogomez" title="Code">💻</a> <a href="#review-tetogomez" title="Reviewed Pull Requests">👀</a></td>
      <td align="center"><a href="https://github.com/JustinCast"><img src="https://avatars1.githubusercontent.com/u/17890146?v=4" width="100px;" alt=""/><br /><sub><b>JustinCast</b></sub></a><br /><a href="https://github.com/eoscostarica/eoscr-theme/commits?author=JustinCast" title="Code">💻</a> <a href="https://github.com/eoscostarica/eoscr-theme/commits?author=JustinCast" title="Documentation">📖</a> <a href="#projectManagement-JustinCast" title="Project Management">📆</a> <a href="#maintenance-JustinCast" title="Maintenance">🚧</a></td>
  </tr>
</table>

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
