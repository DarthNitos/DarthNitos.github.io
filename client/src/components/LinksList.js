import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {
  if (!links.length) {
    return <p className="center">No links yet</p>;
  }

  return (
    <div className="row margin-top">
      {links.map((link, index) => {
        return (
          <div className="col s6" key={link._id}>
            <div className="card">
              <div className="card-content">
                <h4 className="margin-0">Link #{index + 1}</h4>
                <p>
                  Your Link:{" "}
                  <a href={link.from} target="_blank" rel="noopener noreferrer">
                    {link.from}
                  </a>
                </p>
                <p>
                  Original Link:{" "}
                  <a href={link.to} target="_blank" rel="noopener noreferrer">
                    {link.to}
                  </a>
                </p>
              </div>
              <div className="card-action">
                <Link to={`/details/${link._id}`}>
                  <span className="purple-text text-lighten-4">Browse</span>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
