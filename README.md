<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->

<p align="center">
    <img src="assets/icon.png" alt="Logo" width="80" height="80">
  
  <h3 align="center">TOP - ToDo List</h3>

  <p align="center">
   An easy to use to do list! Add projects, add items to projects, get stuff done.
    <br />
    <br />
    <a href="https://convale.github.io/TOP-ToDoList/">View Demo</a>
    ·
    <a href="https://github.com/Convale/TOP-ToDoList/issues">Report Bug</a>
    ·
    <a href="https://github.com/Convale/TOP-ToDoList/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## About The Project

[![ToDo List Screen Shot][product-screenshot]](https://convale.github.io/TOP-ToDoList/)

Here's a simple to do list using localstorage to store data.

The tasks are assigned to projects and require a home project. The parent knows it's children so continuosly looping through an array to find children is cut out.

This is part of The ODIN Project's Fullstack Javascript Bootcamp to teach budding web developers the basics.
Want to learn to be a web developer? [Check out The ODIN Project](https://www.theodinproject.com/)

### Built With

This application was built using pure HTML, CSS, and JS.

<!-- GETTING STARTED -->

## Getting Started

Since the project is built with pure HTML, CSS, and JS, no dependencies are required to install.
Note: You will need localStorage enabled.

### Installation

1. Clone the repo

```sh
git clone https://github.com/Convale/TOP-ToDoList.git
```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/Convale/TOP-ToDoList/issues) for a list of proposed features (and known issues).

Future Implementations:

1. Re-align the html structure and move one-off js created items to html
2. Give the CSS a makeover
   - editing and adding projects/tasks especially
3. Condense the functions
4. Add abilities
   - option to show/hide completed tasks per project
   - drill down what function the "uncategorized" project should serve
   - don't allow changing the uncategorized name
   - clear origDataset
   - re-populate origDataset
5. Move from localStorage to Postgres

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/Convale/TOP-ToDoList/blob/master/LICENSE) for more information.

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/Convale/TOP-ToDoList
[contributors-url]: https://github.com/Convale/TOP-ToDoList/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Convale/TOP-ToDoList
[forks-url]: https://github.com/Convale/TOP-ToDoList/network/members
[stars-shield]: https://img.shields.io/github/stars/Convale/TOP-ToDoList
[stars-url]: https://github.com/Convale/TOP-ToDoList/stargazers
[issues-shield]: https://img.shields.io/github/issues/Convale/TOP-ToDoList
[issues-url]: https://github.com/Convale/TOP-ToDoList/issues
[license-shield]: https://img.shields.io/github/license/Convale/TOP-ToDoList
[license-url]: https://github.com/Convale/TOP-ToDoList/blob/master/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/payneshaun
[product-screenshot]: assets/snapshot.png
