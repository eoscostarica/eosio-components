const Styles = (theme) => ({
  root: {
    minHeight: 400,
    display: "flex",
    padding: 0,
  },
  btn: {
    display: "flex",
    justifyContent: "center",
    margin: 10,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    width: "100%",
    height: "auto",
    "&:focus": {
      outline: "none",
    },
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
  },
  inputBox: {
    display: "flex",
    flexDirection: "column",
    height: 300,
    justifyContent: "space-between",
    padding: "0px 20px",
  },
  deleteBtn: {
    height: 27,
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 10px",
    borderBottom: "1px solid #e9ecef",
  },
  iconBtnPadding: {
    padding: 0,
  },
  captcha: {
    marginTop: 10,
  },
});

export default Styles;
