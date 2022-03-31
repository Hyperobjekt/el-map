import { Box, styled } from "@mui/material";
import theme from "../theme";

export const NewsletterStyle = styled("div")`
  position: relative;
  z-index: 10;
  width: 100%;
  padding: 24px;
  background: #333;
  color: #b2b5b7;
  .content-inner {
    max-width: 272px;
  }
  p {
    font-family: Akkurat-Regular, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    color: #c6cccf;
    margin-bottom: 16px;
  }
  .signup-form {
    display: flex;
  }
  .form-control {
    margin-right: 16px;
    font-size: 12px;
    height: 40px;
  }
  .btn.btn-primary {
    padding: 0 16px;
    font-size: 10px;
    height: 40px;
  }
  @media screen and (min-width: 767px) {
    .content-inner {
      max-width: 1200px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
    }
    p {
      margin: 0 16px 0 0;
      width: 208px;
      font-size: 13px;
      line-height: 19px;
      color: #fff;
    }
    .form-control {
      font-size: 13px;
      width: 272px;
      height: 56px;
      margin-right: 16px;
    }
    .btn.btn-primary {
      font-size: 15px;
      height: 56px;
      padding: 0 56px;
    }
  }
  @media screen and (min-width: 1023px) {
    .form-control,
    p {
      margin-right: 56px;
      width: 264px;
    }
    .form-control {
      width: 304px;
    }
    .btn.btn-primary {
      width: 240px;
    }
  }
  @media screen and (min-width: 1439px) {
    p {
      line-height: 22px;
    }
    .form-control,
    p {
      font-size: 14px;
    }
  }
`;

export const FooterStyle = styled(Box)``;
