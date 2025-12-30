import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <nav
      className="navbar navbar-expand-sm bg-body-tertiary"
      style={{ fontFamily: 'Source Code Pro' }}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <span className="fa-solid fa-terminal" aria-hidden="true"></span>
          Coty
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Challenges
              </a>
              <ul className="dropdown-menu">
                <li><NavLink id="phonesFlags" className="dropdown-item" to="/challenges/phones-flags">Phones and Flags</NavLink></li>
                <li><NavLink id="studentsApi" className="dropdown-item" to="/challenges/students">Students API</NavLink></li>
                {/* <li><a className="dropdown-item" href="#">???</a></li> */}
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Fun Stuff
              </a>
              <ul className="dropdown-menu">
                <li><NavLink id="camel" className="dropdown-item" to="/funstuff/camel">Camel</NavLink></li>
                <li><a className="dropdown-item" href="#">Modding</a></li>
                <li><a className="dropdown-item" href="#">???</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/about">
                About
              </a>
            </li>
          </ul>
          <div className="d-flex">
            <div className="nav-icon">
              <a href="https://www.linkedin.com/in/cotyj" target="_blank">
                <span
                  className="fa-brands fa-3x fa-linkedin m-1 p-1"
                  aria-hidden="true"
                  target="_blank"
                >
                  <span className="sr-only">LinkedIn</span>
                </span>
              </a>
            </div>

            <div className="nav-icon">
              <a
                href="https://github.com/CotyJ"
                aria-hidden="true"
                target="_blank"
              >
                <span className="fa-brands fa-3x fa-github-square m-1 p-1">
                  <span className="sr-only">Github</span>
                </span>
              </a>
            </div>

            <div className="nav-icon">
              <button
                id="theme-button"
                className="btn btn-light border-3 m-2"
                onClick={() =>
                  setTheme((t) => (t === 'light' ? 'dark' : 'light'))
                }
              >
                <span className="fa-solid fa-lightbulb"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
