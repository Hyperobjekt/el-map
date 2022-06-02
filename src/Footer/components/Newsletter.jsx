import { Button, Input, styled, TextField } from "@mui/material";
import React from "react";
import { NewsletterStyle } from "../Footer.style";
import { useLang } from "@hyperobjekt/react-dashboard";

const LightTextField = styled(TextField)`
  .MuiInputBase-input {
    color: #fff;
  }
  .MuiOutlinedInput-notchedOutline {
    border-width: 2px;
  }
`;

const Newsletter = () => {
  const [FOOTER_EMAIL, FOOTER_NEWSLETTER, FOOTER_SUBSCRIBE] = useLang([
    "FOOTER_EMAIL",
    "FOOTER_NEWSLETTER",
    "FOOTER_SUBSCRIBE",
  ]);
  return (
    <NewsletterStyle className="newsletter-signup">
      <div className="content-inner">
        <p>{FOOTER_NEWSLETTER}</p>
        <div id="mc_embed_signup">
          <form
            action="//evictionlab.us16.list-manage.com/subscribe/post?u=8e16f46a586eeb4578fbfe6ba&amp;id=9c55c12d21"
            className="validate"
            id="mc-embedded-subscribe-form"
            method="post"
            name="mc-embedded-subscribe-form"
            noValidate=""
            target="_blank"
          >
            <div className="signup-form" id="mc_embed_signup_scroll">
              <LightTextField
                className="form-control"
                variant="outlined"
                id="mce-EMAIL"
                name="EMAIL"
                label={FOOTER_EMAIL}
                required={true}
                type="email"
                defaultValue=""
                placeholder={FOOTER_EMAIL}
              />
              <input
                defaultChecked=""
                id="mce-group[4647]-4647-0"
                name="group[4647][1]"
                style={{ display: "none" }}
                type="checkbox"
                defaultValue="1"
              />
              <input
                id="mce-group[4647]-4647-1"
                name="group[4647][2]"
                style={{ display: "none" }}
                type="checkbox"
                defaultValue="2"
              />
              <div
                aria-hidden="true"
                style={{ position: "absolute", left: -5000 }}
              >
                <input
                  name="b_8e16f46a586eeb4578fbfe6ba_9c55c12d21"
                  tabIndex="-1"
                  type="text"
                  defaultValue=""
                />
              </div>
              <Button
                className="btn btn-primary"
                variant="contained"
                color="primary"
                id="mc-embedded-subscribe"
                name="subscribe"
                type="submit"
                value="Subscribe"
                disableElevation
              >
                {FOOTER_SUBSCRIBE}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </NewsletterStyle>
  );
};

export default Newsletter;
