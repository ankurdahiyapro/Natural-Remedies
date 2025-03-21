import React, { useEffect } from "react";
import { GiHerbsBundle } from "react-icons/gi";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
import { IoIosCloseCircle, IoIosWarning } from "react-icons/io";
import { IoAddOutline } from "react-icons/io5";
import { TiThMenu } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import targetArea from "./targetArea";
import { useRemedyStore } from "../store/remedy";
import { BsShieldFillPlus } from "react-icons/bs";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkTheme, setDarkTheme, setFilter, filter } = useRemedyStore();

  useEffect(() => {
    // Initialize all popovers after component mounts
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new bootstrap.Popover(popoverTriggerEl); // Initialize popover
    });

    navigate("/remedy");
  }, []);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.classList.toggle("bg-dark", !darkTheme);
    document.body.classList.toggle("text-light", !darkTheme);
    document.body.classList.toggle("bg-light", darkTheme);
    document.body.classList.toggle("text-dark", darkTheme);
  };

  return (
    <>
      <nav
        className={`navbar ${
          darkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
      >
        <div className="container-lg">
          <div className="row align-items-center justify-content-between w-100 py-2 m-0">
            {/* Heading */}
            <div className="col text-start">
              <Link
                className={`navbar-brand ${
                  darkTheme ? "text-light" : "text-dark"
                }`}
                onClick={() => {
                  setFilter("");
                }}
                to={"/remedy"}
              >
                Nature's Apothecary {" "}
                <GiHerbsBundle
                  size={"2em"}
                  color={darkTheme ? "lightgreen" : "green"}
                />
              </Link>
            </div>

            {/* Select Dropdown (Hidden in Mobile) */}
            <div className="col d-none d-md-block">
              <select
                className="form-select shadow-none"
                id="canvasFilter"
                required
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
              >
                <option value="">All Parts</option>
                {targetArea.map((areas, index) => (
                  <option key={index} value={areas.area}>
                    {areas.area}
                  </option>
                ))}
              </select>
            </div>

            {/* Right Section (Theme Toggle + Warning Icon) */}
            <div className="col d-flex justify-content-end align-items-center">
              {/* Theme Toggle */}
              <button
                className={`btn btn-outline-${
                  darkTheme ? "light" : "dark"
                } me-2 d-none d-sm-inline-block`}
                onClick={toggleTheme}
              >
                {darkTheme ? (
                  <FaSun size={"1.5em"} />
                ) : (
                  <FaMoon size={"1.5em"} />
                )}
              </button>

              {/* Warning Popover (Hidden on Mobile) */}
              <span
                className="btn btn-warning px-3 py-2 me-2 d-none d-md-inline-block"
                tabIndex="0"
                data-bs-toggle="popover"
                data-bs-trigger="hover focus"
                data-bs-placement="bottom"
                data-bs-content="For serious cases, consult a doctor—nature complements, not replaces."
              >
                <FaTriangleExclamation />
              </span>

              {/* Menu Toggle (Visible on Mobile) */}
              <button
                className="btn btn-success px-3 py-2 d-md-none"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#remedyMenu"
                aria-controls="remedyMenu"
              >
                <TiThMenu />
              </button>
            </div>
          </div>
        </div>

        {/* Offcanvas for Mobile */}
        <div
          className="offcanvas offcanvas-end d-md-none"
          tabIndex={-1}
          id="remedyMenu"
          aria-labelledby="remedyMenuLabel"
        >
          {/* canvas header */}
          <div
            className={`offcanvas-header justify-content-between ${
              darkTheme ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            <button
              className={`btn btn-outline-${
                darkTheme ? "light" : "dark"
              } me-2 d-sm-none`}
              onClick={toggleTheme}
            >
              {darkTheme ? <FaSun size={"1.5em"} /> : <FaMoon size={"1.5em"} />}
            </button>
            <h5 className="offcanvas-title text-success" id="remedyMenuLabel">
              Menu
            </h5>
            <IoIosCloseCircle
              color="red"
              size={"2em"}
              className="m-0"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>

          {/* canvas body */}
          <div
            className={`offcanvas-body ${
              darkTheme ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            {!location.pathname.includes("/add") && (
              <>
                {/* Dropdown Filter */}
                <select
                  className="form-select shadow-none mb-3"
                  id="filter"
                  required
                  onChange={(e) => {
                    setFilter(e.target.value);
                    // Close the offcanvas
                    const closeRemedyMenu = bootstrap.Offcanvas.getInstance(
                      document.getElementById("remedyMenu")
                    );
                    if (closeRemedyMenu) closeRemedyMenu.hide();
                  }}
                >
                  <option value="">All Parts</option>
                  {targetArea.map((areas, index) => (
                    <option key={index} value={areas.area}>
                      {areas.area}
                    </option>
                  ))}
                </select>

                {/* Add Remedy */}
                <div className="d-sm-none mx-auto row align-items-center mb-3 w-100">
                  <p className="text-center">Have Something To Share?</p>
                  <ul className="mx-auto row " style={{ left: "-100%" }}>
                    <li className="col btn border border-end-0 border-success">
                      <Link
                        className="text-success text-decoration-none"
                        to="/remedy/add"
                        onClick={() => {
                          // Close the menu
                          const closeRemedyMenu = bootstrap.Offcanvas.getInstance(
                            document.getElementById("remedyMenu")
                          );
                          if (closeRemedyMenu) closeRemedyMenu.hide();
                        }}
                      >
                        Remedy
                      </Link>
                    </li>
                    <li className="col btn border border-end-0 border-start-0 border-info">
                      <Link
                        className="text-info text-decoration-none"
                        to="/booster/add"
                        onClick={() => {
                          // Close the menu
                          const closeRemedyMenu = bootstrap.Offcanvas.getInstance(
                            document.getElementById("remedyMenu")
                          );
                          if (closeRemedyMenu) closeRemedyMenu.hide();
                        }}
                      >
                        Booster
                      </Link>
                    </li>
                    <li className="col btn border border-start-0 border-danger">
                      <Link
                        className="text-danger text-decoration-none"
                        to="/poison/add"
                        onClick={() => {
                          // Close the menu
                          const closeRemedyMenu = bootstrap.Offcanvas.getInstance(
                            document.getElementById("remedyMenu")
                          );
                          if (closeRemedyMenu) closeRemedyMenu.hide();
                        }}
                      >
                        Poison
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}

            {/* Caution */}
            <div className="btn btn-warning mx-4 p-2 row">
              <FaTriangleExclamation /> Caution
              <p>
                For serious cases, consult a doctor—nature complements, not
                replaces.
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar */}
      <nav
        className={`navbar fixed-bottom ${
          darkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light"
        } shadow-lg`}
      >
        <div className="container-md d-flex justify-content-around">
          {/* Remedies */}
          <Link
            to="/remedy"
            onDoubleClick={()=>{navigate('/remedy/delete')}}
            className={`btn d-flex flex-column align-items-center ${
              location.pathname.includes("remedy")
                ? "active text-success"
                : darkTheme
                ? "text-light"
                : "text-dark"
            }`}
          >
            <GiHerbsBundle
              size="1.5em"
              className={`${
                location.pathname.includes("remedy") ? "text-success" : ""
              }`}
            />
            <small>Remedies</small>
          </Link>

          {/* Boosters */}
          <Link
            to="/booster"
            onDoubleClick={()=>{navigate('/booster/delete')}}
            className={`btn d-flex flex-column align-items-center ${
              location.pathname.includes("booster")
                ? "active text-info"
                : darkTheme
                ? "text-light"
                : "text-dark"
            }`}
          >
            <BsShieldFillPlus
              size="1.5em"
              className={`${
                location.pathname.includes("booster") ? "text-info" : ""
              }`}
            />
            <small>Boosters</small>
          </Link>

          {/* Poisons */}
          <Link
            to="/poison"
            onDoubleClick={()=>{navigate('/poison/delete')}}
            className={`btn d-flex flex-column align-items-center ${
              location.pathname.includes("poison")
                ? "active text-danger"
                : darkTheme
                ? "text-light"
                : "text-dark"
            }`}
          >
            <IoIosWarning
              size="1.5em"
              className={`${
                location.pathname.includes("poison") ? "text-danger" : ""
              }`}
            />
            <small>Poisons</small>
          </Link>

          {/* Add Button */}
          <div className="d-none d-sm-block btn-group dropup-center dropup">
            <button
              className="btn btn-success dropdown-toggle d-flex flex-column align-items-center"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IoAddOutline size="1.5em" />
              <small>Add</small>
            </button>
            <ul
              className={`dropdown-menu ${
                darkTheme ? "dropdown-menu-dark" : ""
              } mx-auto`}
              style={{ left: "-100%" }}
              aria-labelledby="dropdownMenuButton"
            >
              <li>
                <Link className="dropdown-item" to="/remedy/add">
                  Remedy
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/booster/add">
                  Booster
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/poison/add">
                  Poison
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
