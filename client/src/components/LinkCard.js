import React from "react";

export const LinkCard = ({ link }) => {
  return (
    <div className="row mt-2">
      <div className="col s6 offset-s3" key={link._id}>
        <div className="card purple lighten-5">
          <div className="card-content text-center">
            <h2 className="margin-0">Link Details</h2>
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
            <p>
              Clicks: <strong>{link.clicks}</strong>
            </p>
            <p>
              Creation Date:{" "}
              <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
