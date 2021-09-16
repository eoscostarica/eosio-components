const Styles = (theme) => ({
  papper: {
    [theme.breakpoints.up("md")]: {
      width: 660,
    },
    height: 400,
    backgroundColor: "red",
    margin: "auto",
  },
  fullHeight: {
    height: "100%",
  },
  dropzoneBox: {
    width: "100%",
    maxWidth: 620,
    height: "50vh",
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: "3%",
    minHeight: "150px",
    width: "100%",
    background: theme.palette.background.lightgray,
  },
  fileDetails: {
    color: theme.typography.caption.color,
    fontSize: theme.typography.caption.fontSize,
  },
  fileDetailsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  styledButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.dark,
  },
  fileBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
  },
});

export default Styles;
