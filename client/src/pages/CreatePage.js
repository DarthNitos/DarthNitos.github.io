import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import "../index.css";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { to: link },
          { Authorization: `Bearer ${auth.token}` }
        );

        history.push(`/details/${data.link._id}`);
      } catch (e) {
        //  Handled by the http hook
      }
    }
  };

  return (
    <div className="row link-input">
      <div className="col s8 offset-s2 padding-top-2">
        <div className="input-field">
          <label htmlFor="link">Paste your link here and press Enter</label>
          <input
            placeholder="Link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
        </div>
      </div>
    </div>
  );
};
