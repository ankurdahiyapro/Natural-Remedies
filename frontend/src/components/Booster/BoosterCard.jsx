import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { MdDelete, MdEdit, MdRestaurantMenu } from "react-icons/md";
import { SiPaperlessngx } from "react-icons/si";
import { ImWarning } from "react-icons/im";
import { FaRepeat } from "react-icons/fa6";
import { FcExpired } from "react-icons/fc";
import { FaChild } from "react-icons/fa";
import { toast } from "react-toastify";
import "../CustomToastify.css";
import defaultImage from "/defaul-remedy-image.jpg";
import targetArea from "../targetArea.js";

import { useRemedyStore } from "../../store/remedy.js";

function BoosterCard({ booster, modalId }) {
  const location = useLocation();
  const { darkTheme, deleteBooster } = useRemedyStore();
  const [image, setImage] = useState(defaultImage);

  const handleDeleteBooster = async (rid) => {
    const { status, message } = await deleteBooster(rid);
    if (status) {
      toast.success("Booster Deleted Successfully", {
        className: "toastify-container",
        bodyClassName: "toastify-container",
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    } else {
      toast.error(message || "Something went wrong. Please try again.", {
        className: "toastify-container",
        bodyClassName: "toastify-container",
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    }
  };

  function findImage(area) {
    const imageArea = targetArea.find((part) => part.area === area);
    return imageArea?.image || defaultImage;
  }

  return (
    <div className="col-md-4 col-sm-6 mb-3">
      <div className="card text-white rounded-3">
        <div
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`} // Link button to unique modal ID
        >
          <img
            src={image}
            className="card-img-top img-fluid rounded-3"
            alt={booster.part || "booster"}
            style={{ objectFit: "cover", height: "200px" }}
            onLoad={() => {
              setImage(findImage(booster.part));
            }}
            onError={() => {
              setImage(defaultImage); // Set the image to the default image on error
            }}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-75 rounded"></div>
          <div className="card-img-overlay">
            <div className="card-body p-0">
              <h5 className="card-title text-capitalize">{booster.name}</h5>
              {booster.ingredients && (
                <p className="card-text">{booster.ingredients.join(", ")}</p>
              )}

              {/* Unique modal for each booster */}
              <div
                className="modal fade pe-0"
                id={modalId}
                tabIndex={-1}
                aria-labelledby={`${modalId}Label`}
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div
                    className={`modal-content ${
                      darkTheme ? "text-light bg-dark" : "text-dark bg-light"
                    }`}
                  >
                    {/* Header */}
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-4 fw-semibold text-capitalize"
                        id={`${modalId}Label`}
                      >
                        {booster.name}{" "}
                        <span className="fs-6 text-grey text-info">
                          / {booster.part}
                        </span>
                      </h1>
                      <button
                        type="button"
                        className={`btn-close ${darkTheme ? "bg-light" : ""}`}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>

                    {/* Body */}
                    <div className="modal-body">
                      {/* Ingredients */}
                      {booster.ingredients[0].length > 0 && (
                        <div className="card-text fw-semibold text-capitalize mb-2">
                          <SiPaperlessngx size={"1.5em"} color="brown" />{" "}
                          Ingredients :{" "}
                          <p className="fw-normal my-0">
                            {booster.ingredients.join(", ")}
                          </p>
                        </div>
                      )}

                      {/* Recipe */}
                      <div className="fw-semibold text-capitalize mb-2">
                        <MdRestaurantMenu size={"1.5em"} color="green" /> Recipe
                        :{" "}
                        {booster.recipe.map((step, index) => {
                          return (
                            <p key={index} className="my-0">
                              {index + 1} :{" "}
                              <span className="fw-normal">{step}</span>
                            </p>
                          );
                        })}
                      </div>

                      {/* Caution */}
                      {booster.caution[0].length > 0 && (
                        <div className="fw-semibold text-capitalize mb-2">
                          <ImWarning
                            size={"1.2em"}
                            color={`${darkTheme ? "yellow" : "black"}`}
                          />{" "}
                          Caution :{" "}
                          {booster.caution.map((step, index) => {
                            return (
                              <p key={index} className="my-0">
                                {index + 1} :{" "}
                                <span className="fw-normal">{step}</span>
                              </p>
                            );
                          })}
                        </div>
                      )}

                      {/* Expiry */}
                      <div className="fw-semibold text-capitalize mb-2">
                        <FcExpired size={"1.3em"} /> Expiry :{" "}
                        <span className="fw-normal">
                          {booster.expiry == 99
                            ? "Never"
                            : `${booster.expiry} days`}
                        </span>
                      </div>

                      {/* Dosage */}
                      <div className="fw-semibold text-capitalize">
                        <FaRepeat /> :{" "}
                        <span className="fw-normal">
                          {booster.dosage ? booster.dosage : "undefined"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit and Delete Buttons */}
        {location.pathname == "/booster/delete" ? (
          <>
            <div
              type="button"
              className="text-danger p-2 position-absolute top-0 end-0"
              data-bs-dismiss="offcanvasDark"
              aria-label="Close"
              onClick={() => {
                handleDeleteBooster(booster._id);
              }}
            >
              <MdDelete size={"1.3em"} />
            </div>
            {booster.forKids == "yes" && (
              <FaChild
                size={"2.2em"}
                className="text-success p-2 position-absolute bottom-0 end-0"
              />
            )}
          </>
        ) : (
          <>
            <Link
              type="button"
              className="text-info p-2 position-absolute top-0 end-0"
              data-bs-dismiss="offcanvasDark"
              aria-label="Update"
              to="/booster/update"
              state={{ booster }}
            >
              <MdEdit size={"1.3em"} />
            </Link>
            {booster.forKids == "yes" && (
              <FaChild
                size={"2.2em"}
                className="text-success p-2 position-absolute bottom-0 end-0"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default BoosterCard;
