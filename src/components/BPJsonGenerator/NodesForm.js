import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import Styles from "./styles";
import Modal from "./Modal";

const nodeTypes = [
  {
    label: "Producer",
    value: "producer",
    info: "",
  },
  {
    label: "Query",
    value: "query",
    info: "",
  },
  {
    label: "Seed",
    value: "seed",
    info: "",
  },
];

const features = [
  {
    label: "chain-api",
    value: "chain-api",
    info: "basic eosio::chain_api_plugin (/v1/chain/*)",
  },
  {
    label: "account-query",
    value: "account-query",
    info: "(/v1/chain/get_accounts_by_authorizers)",
  },
  {
    label: "history-v1",
    value: "history-v1",
    info: "(/v1/history/*)",
  },
  {
    label: "hyperion-v2",
    value: "hyperion-v2",
    info: "(/v2/*)",
  },
  {
    label: "dfuse",
    value: "dfuse",
    info: "",
  },
  {
    label: "fio-api",
    value: "fio-api",
    info: "",
  },
  {
    label: "snapshot-api",
    value: "snapshot-api",
    info: "",
  },
  {
    label: "dsp-api",
    value: "dsp-api",
    info: "",
  },
];

const defaultNode = {
  location: {
    name: "",
    country: "",
    latitude: null,
    longitude: null,
  },
  node_type: "",
  p2p_endpoint: "",
  api_endpoint: "",
  ssl_endpoint: "",
  features: [],
};

const useStyles = makeStyles(Styles);

const NodesForm = ({ nodes, nodeIndex, onSubmit, openModal, setOpenModal }) => {
  const classes = useStyles();
  const [currentNode, setCurrentNode] = useState(defaultNode);

  const handleOnChange = (key, value) => {
    setCurrentNode({ ...currentNode, [key]: value });
  };

  const handleOnChangeLocation = (key, value) => {
    setCurrentNode({
      ...currentNode,
      location: { ...currentNode.location, [key]: value },
    });
  };

  const handleOnChangeFeatures = (event) => {
    setCurrentNode((prevValue) => ({
      ...prevValue,
      features: event.target.value,
    }));
  };

  const deleteEmptyKeyValues = () => {
    const aux = currentNode;
    if (aux.features.length === 0) delete aux.features;
    Object.keys(aux).forEach((k) => {
      if (aux[k] === "") delete aux[k];
    });

    return aux;
  };

  const handleOnSubmit = () => {
    if (nodeIndex !== null) {
      const newNodes = [...nodes];
      newNodes[nodeIndex] = deleteEmptyKeyValues();
      onSubmit(newNodes);
    } else {
      onSubmit([...nodes, deleteEmptyKeyValues()]);
    }

    setCurrentNode(defaultNode);
    setOpenModal(false);
  };

  useEffect(() => {
    setCurrentNode(nodes[nodeIndex] || defaultNode);
  }, [nodes, nodeIndex]);

  return (
    <Modal openModal={openModal} setOpenModal={(value) => setOpenModal(value)}>
      <Grid container justify="center" className={classes.nodes}>
        <Box className={classes.wrapperForm}>
          <Typography className={classes.sectionTitle} variant="h5">
            Nodes
          </Typography>

          <TextField
            onChange={(e) => handleOnChange("node_type", e.target.value)}
            variant="outlined"
            label="Node Type"
            select
            value={currentNode.node_type}
            className={classes.formFieldForm}
          >
            {nodeTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box className={classes.wrapperForm}>
          <Typography className={classes.sectionTitle} variant="h5">
            Location
          </Typography>

          <Box className={classes.locationWrapper}>
            <TextField
              onChange={(e) => handleOnChangeLocation("name", e.target.value)}
              variant="outlined"
              label="Name"
              value={currentNode.location.name}
              className={classes.formFieldForm}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation("country", e.target.value)
              }
              variant="outlined"
              label="Country"
              value={currentNode.location.country}
              className={classes.formFieldForm}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation("latitude", Number(e.target.value))
              }
              variant="outlined"
              label="Latitude"
              type="number"
              value={currentNode.location.latitude || ""}
              className={classes.formFieldForm}
            />
            <TextField
              onChange={(e) =>
                handleOnChangeLocation("longitude", Number(e.target.value))
              }
              variant="outlined"
              label="Longitude"
              type="number"
              value={currentNode.location.longitude}
              className={classes.formFieldForm}
            />
          </Box>
        </Box>

        <Box className={classes.wrapperForm}>
          <Typography
            style={{
              display:
                currentNode.node_type === "producer" ||
                currentNode.node_type === ""
                  ? "none"
                  : undefined,
            }}
            className={classes.sectionTitle}
            variant="h5"
          >
            Endpoints
          </Typography>

          <TextField
            style={{
              display: currentNode.node_type !== "seed" ? "none" : undefined,
            }}
            onChange={(e) => handleOnChange("p2p_endpoint", e.target.value)}
            variant="outlined"
            label="P2P Endpoint"
            value={currentNode.p2p_endpoint || ""}
            className={classes.formFieldForm}
          />

          <TextField
            onChange={(e) => handleOnChange("api_endpoint", e.target.value)}
            style={{
              display: currentNode.node_type !== "query" ? "none" : undefined,
            }}
            variant="outlined"
            label="API Endpoint"
            value={currentNode.api_endpoint || ""}
            className={classes.formFieldForm}
          />

          <TextField
            style={{
              display: currentNode.node_type !== "query" ? "none" : undefined,
            }}
            onChange={(e) => handleOnChange("ssl_endpoint", e.target.value)}
            variant="outlined"
            label="SSL Endpoint"
            value={currentNode.ssl_endpoint || ""}
            className={classes.formFieldForm}
          />
        </Box>

        <Box className={classes.wrapperForm}>
          <Typography
            style={{
              display: currentNode.node_type !== "query" ? "none" : undefined,
            }}
            className={classes.sectionTitle}
            variant="h5"
          >
            Features
          </Typography>

          <TextField
            style={{
              display: currentNode.node_type !== "query" ? "none" : undefined,
            }}
            onChange={handleOnChangeFeatures}
            variant="outlined"
            label="Node Feactures"
            select
            SelectProps={{
              multiple: true,
              classes: {
                root: currentNode.features?.length ? classes.selectChips : "",
              },
              renderValue: (selected) => (
                <div className={classes.chips}>
                  {selected.map((value, index) => (
                    <Chip
                      key={`chip-item-${index}`}
                      label={value}
                      className={classes.chip}
                    />
                  ))}
                </div>
              ),
            }}
            value={currentNode.features || []}
            className={classes.formFieldForm}
          >
            {features.map((option, index) => (
              <MenuItem key={`menu-item-${index}`} value={option.value}>
                <Checkbox
                  checked={
                    (currentNode.features || []).indexOf(option.value) > -1
                  }
                />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          className={classes.addButton}
          onClick={handleOnSubmit}
          disabled={!currentNode.node_type}
        >
          {nodeIndex !== null ? "Edit node" : "Add Node"}
        </Button>
      </Grid>
    </Modal>
  );
};

NodesForm.propTypes = {
  nodes: PropTypes.array,
  nodeIndex: PropTypes.number,
  onSubmit: PropTypes.func,
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
};

export default NodesForm;
