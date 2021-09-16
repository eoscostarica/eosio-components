const Styles = (theme, TRANSITION_DURATION) => ({
  backLayer: {
    overflow: "hidden",
  },
  backlayerTransition: {
    transitionDuration: `${TRANSITION_DURATION}ms`,
    transitionProperty: "height",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
  },
  frontLayer: {
    width: "100%",
    flex: 1,
    borderRadius: theme.spacing(2, 2, 0, 0),
    display: "flex",
    flexDirection: "column",
  },
  contentWrapper: {
    position: "relative",
    flex: 1,
  },
  frontLayerContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  iconDrop: {
    fontSize: 25,
    padding: 0,
    width: 35,
    height: 35,
  },
  secondaryPage: {
    width: "100%",
    height: "100%",
  },
});

export default Styles;
