import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";

import Styles from "./styles";

const useStyles = makeStyles(Styles);

const FileComponent = ({
  filename,
  filesize,
  filehash,
  lastModifiedDate,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.detailsContainer}>
      <Box className={classes.fileBox}>
        <DescriptionIcon />
        <Typography className={classes.fileDetailsHeader}>
          {filename}
          <Button
            className={classes.styledButton}
            onClick={onClick}
            variant="contained"
          >
            <DeleteIcon />
          </Button>
        </Typography>
        <br />
      </Box>
      <Typography className={classes.fileDetails}>
        Tamaño: {filesize}
      </Typography>
      <Typography className={classes.fileDetails}>
        Última modificación: {lastModifiedDate}
      </Typography>
      <Typography className={classes.fileDetails}>Hash: {filehash}</Typography>
    </Container>
  );
};

FileComponent.propTypes = {
  filename: PropTypes.string,
  filesize: PropTypes.string,
  filehash: PropTypes.string,
  lastModifiedDate: PropTypes.string,
  onClick: PropTypes.func,
};

export default FileComponent;
