# eoscr-components

<p align="center">
	<a href="https://eoscostarica.io">
		<img src="https://github.com/eoscostarica/eos-rate/raw/master/docs/eoscostarica-logo-black.png" width="300">
	</a>
</p>
<br/>

A collection of React Components for EOSIO.

## Table of Contents

- [Installation](#installation)
- [Components](#components)
- [Run locally](#run-locally)
- [File Structure](#file-structure)
- [License](#license)
- [Contributors](#contributors)

## Version

- 3.1.5

### Installation

To add the package to your react app install the dependencies using yarn.

`$ yarn add @eoscostarica/eoscr-components`

## Components

|                               | Description                                                                                          | Tag                               |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------- |
| Create Account                | Form to create a new account                                                                         | `<CreateAccount />`               |
| Get Account Information       | Get an account information                                                                           | `<AccountInfo />`                 |
| Input Hash                    | Input Text to create or validate HASH256                                                             | `<InputHash />`                   |
| Dropzone Hash                 | Drop zone to handle files                                                                            | `<DropzoneHash />`                |
| Backdrop                      | Backdrop                                                                                             | `<Backdrop />`                    |
| BPJsonGenerator               | BPJsonGenerator                                                                                      | `<BPJsonGenerator />`             |
| InfiniteRegistryTableLoader   | Provides infinite scroll and dynamic load                                                            | `<InfiniteRegistryTableLoader />` |
| VisualCertificate             | Displays visual certificate with information and resources to verify the validity of the transaction | `<VisualCertificate />`           |
| Issuance Verifier             | Dropzone that validates the issuance of a file                                                       | `<IssuanceVerifier />`            |
| Ricardian Contract Visualizer | Shows Ricarian clauses                                                                               | `<RicardianContract />`           |

## Run locally

#### Local Development

We are using Storybook

> is an open source tool for developing UI
> components in isolation for React, Vue, and Angular.
> It makes building stunning UIs organized and efficient.

```bash
# Install dependencies and devDependencies
yarn
# Starts Storybook in development mode
yarn storybook
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
│   │   ├── 5-DropzoneHash.stories.js
│   │   ├── 6-InfiniteRegistryTableLoader.stories.js
│   │   ├── 7-BPJsonGenerator.stories.js
│   │   ├── 8-VisualCertificate.stories.js
│   │   └── 9-IssuanceVerifier.stories.js
│   │
│   ├── themes
│   │   └── index.js
│   │
│   ├── utils
│   │   ├── convertHex2RGB.js
│   │   ├── convertVotesToEosVotes.js
│   │   ├── filereader.js
│   │   └── getRgbColorsFromHex.js
│   │
│   ├── AccountInfo
│   │   ├── AccountInfo.js
│   │   ├── BPAvatar.js
│   │   ├── ProgressBar.js
│   │   └── index.js
│   ├── Backdrop
│   │   ├── Backdrop.js
│   │   └── index.js
│   ├── BPJsonGenerator
│   │   ├── BPJsonGenerator.js
│   │   ├── ImagePreview.js
│   │   ├── Modal.js
│   │   ├── NodesForm.js
│   │   └── index.js
│   ├── common
│   │   ├── DropzoneBase.js
│   │   └── index.js
│   ├── CreateAccount
│   │   ├── CreateAccount.js
│   │   └── index.js
│   ├── DropzoneHash
│   │   ├── DropzoneHash.js
│   │   ├── FileComponent.js
│   │   └── index.js
│   ├── InfiniteRegistryTableLoader
│   │   ├── InfiniteRegistryTableLoader.js
│   │   └── index.js
│   ├── InputHash
│   │   ├── InputHash.js
│   │   └── index.js
│   ├── IssuanceVerifier
│   │   ├── IssuanceVerifier.js
│   │   └── index.js
│   ├── RicardianContract
│   │   ├── RicardianContract.js
│   │   └── index.js
│   ├── VisualCertificate
│   │   ├── VisualCertificate.js
│   │   └── index.js
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
