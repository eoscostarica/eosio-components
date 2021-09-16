import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import fileDownload from "react-file-download";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { urlInputValidation, formInputValidation } from "../../utils";
import ArrayTextField from "../ArrayTextField";

import ImagePreview from "./ImagePreview";
import NodesForm from "./NodesForm";
import NodesList from "./NodesList";
import Styles from "./styles";

const initData = {
  candidate_name: "",
  website: "",
  code_of_conduct: "",
  ownership_disclosure: "",
  email: "",
  github_user: [],
  chain_resources: "",
  other_resources: [],
  branding: {
    logo_256: "",
    logo_1024: "",
    logo_svg: "",
  },
  location: {
    name: "",
    country: "",
    latitude: null,
    longitude: null,
  },
  social: {
    keybase: "",
    telegram: "",
    twitter: "",
    github: "",
    youtube: "",
    facebook: "",
    hive: "",
    reddit: "",
    wechat: "",
  },
};

const defaultValidationState = {
  candidate_name: {
    isError: false,
    message: "Candidate Name is required",
  },
  email: {
    isError: false,
    message: "Email is required",
  },
  website: {
    isError: false,
    message: "Website is required",
  },
  code_of_conduct: {
    isError: false,
    message: "Code of Conduct is required",
  },
  ownership_disclosure: {
    isError: false,
    message: "Ownership Disclosure is required",
  },
};

const useStyles = makeStyles(Styles);

const BPJsonForm = ({ accountName, bpJson, onSubmit }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [org, setOrg] = useState(initData);
  const [nodes, setNodes] = useState([]);
  const [currentNodeIndex, setCurrentNodeIndex] = useState(null);
  const [shouldUpdateChain, setShouldUpdateChain] = useState(false);
  const [requiredFieldsValidation, setRequiredFieldsValidation] = useState(
    defaultValidationState
  );

  const toCapitalCase = (string = "") => {
    return string
      .split("")
      .map((char, index) => (index === 0 ? char.toUpperCase() : char))
      .join("");
  };

  const handleOnChange = (key, value, parent) => {
    if (parent === "org") {
      setOrg({ ...org, [key]: value });
      return;
    }

    setOrg({
      ...org,
      [parent]: { ...org[parent], [key]: value },
    });
  };

  const handleOnSubmitNode = (nodes) => {
    setNodes(nodes);
    setCurrentNodeIndex(null);
  };

  const handleOnDeleteNode = (index) => {
    nodes.splice(index, 1);
    setNodes([...nodes]);
  };

  const handleOnEditNode = (index) => {
    setCurrentNodeIndex(index);
    setOpenModal(true);
  };

  const handleOnSubmit = () => {
    const { formValidated, isValidForm } = formInputValidation(org);
    setRequiredFieldsValidation(formValidated);

    if (!isValidForm) return;

    const producerJson = JSON.stringify(
      {
        org,
        nodes,
        producer_account_name: accountName,
      },
      null,
      "\t"
    );
    fileDownload(producerJson, "bp.json");
    onSubmit({
      shouldUpdateChain,
      bpJson: producerJson,
    });
  };

  useEffect(() => {
    setOrg(bpJson ? bpJson.org : initData);
    setNodes(bpJson ? bpJson.nodes : []);
  }, [bpJson]);

  return (
    <Box>
      <Box className={classes.wrapper}>
        <Typography variant="h4">BP JSON Generator</Typography>
        <Typography variant="body1">
          A simple way to create and update your node information on chain.
        </Typography>
      </Box>

      <Box className={classes.wrapper}>
        <Typography variant="h5">{`Account Name: ${accountName}`}</Typography>
        <Divider className={classes.divider} />
      </Box>

      <Box className={classes.wrapper}>
        <Typography variant="h5">Organization Info</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange("candidate_name", e.target.value, "org")
                }
                variant="outlined"
                required
                error={requiredFieldsValidation.candidate_name.isError}
                label="Candidate Name"
                value={org.candidate_name || ""}
                helperText={
                  requiredFieldsValidation.candidate_name.isError &&
                  requiredFieldsValidation.candidate_name.message
                }
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange("website", e.target.value, "org")
                }
                variant="outlined"
                required
                error={requiredFieldsValidation.website.isError}
                label="Website"
                value={org.website || ""}
                helperText={
                  requiredFieldsValidation.website.isError &&
                  requiredFieldsValidation.website.message
                }
                className={classes.formField}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(e) =>
                  handleOnChange("code_of_conduct", e.target.value, "org")
                }
                variant="outlined"
                required
                error={requiredFieldsValidation.code_of_conduct.isError}
                label="Code of Conduct"
                value={org.code_of_conduct || ""}
                helperText={
                  requiredFieldsValidation.code_of_conduct.isError &&
                  requiredFieldsValidation.code_of_conduct.message
                }
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(e) =>
                  handleOnChange("ownership_disclosure", e.target.value, "org")
                }
                variant="outlined"
                required
                error={requiredFieldsValidation.ownership_disclosure.isError}
                label="Ownership disclosure"
                value={org.ownership_disclosure || ""}
                helperText={
                  requiredFieldsValidation.ownership_disclosure.isError &&
                  requiredFieldsValidation.ownership_disclosure.message
                }
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(e) => handleOnChange("email", e.target.value, "org")}
                variant="outlined"
                required
                error={requiredFieldsValidation.email.isError}
                label="Email"
                value={org.email || ""}
                helperText={
                  requiredFieldsValidation.email.isError &&
                  requiredFieldsValidation.email.message
                }
                className={classes.formField}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={4}>
              <ArrayTextField
                onChange={(value) =>
                  handleOnChange("github_user", value, "org")
                }
                variant="outlined"
                label="Github User"
                value={org.github_user || []}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={(e) =>
                  handleOnChange("chain_resources", e.target.value, "org")
                }
                variant="outlined"
                label="Chain Resources"
                value={org.chain_resources || ""}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ArrayTextField
                onChange={(value) =>
                  handleOnChange("other_resources", value, "org")
                }
                variant="outlined"
                label="Other Resources"
                value={org.other_resources || []}
                className={classes.formField}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.wrapper}>
        <Typography variant="h5">Branding</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                onChange={(e) =>
                  handleOnChange("logo_256", e.target.value, "branding")
                }
                variant="outlined"
                label="Logo 256px"
                error={!urlInputValidation(org.branding.logo_256)}
                value={org.branding.logo_256 || ""}
                helperText={
                  !urlInputValidation(org.branding.logo_256) && "Invalid URL"
                }
                className={classes.formField}
              />
              <ImagePreview
                url={org.branding.logo_256}
                label="Logo 256px"
                isInvalidURL={!urlInputValidation(org.branding.logo_256)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                onChange={(e) =>
                  handleOnChange("logo_1024", e.target.value, "branding")
                }
                variant="outlined"
                label="Logo 1024px"
                error={!urlInputValidation(org.branding.logo_1024)}
                value={org.branding.logo_1024 || ""}
                helperText={
                  !urlInputValidation(org.branding.logo_1024) && "Invalid URL"
                }
                className={classes.formField}
              />
              <ImagePreview
                url={org.branding.logo_1024}
                label="Logo 1024px"
                isInvalidURL={!urlInputValidation(org.branding.logo_1024)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                onChange={(e) =>
                  handleOnChange("logo_svg", e.target.value, "branding")
                }
                variant="outlined"
                label="Logo SVG"
                error={!urlInputValidation(org.branding.logo_svg)}
                value={org.branding.logo_svg || ""}
                helperText={
                  !urlInputValidation(org.branding.logo_svg) && "Invalid URL"
                }
                className={classes.formField}
              />
              <ImagePreview
                url={org.branding.logo_svg}
                label="Logo SVG"
                isInvalidURL={!urlInputValidation(org.branding.logo_svg)}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.wrapper}>
        <Typography variant="h5">Location</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange("name", e.target.value, "location")
                }
                variant="outlined"
                label="Name"
                value={org.location.name || ""}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange("country", e.target.value, "location")
                }
                variant="outlined"
                label="Country"
                value={org.location.country || ""}
                className={classes.formField}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} item>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange("latitude", Number(e.target.value), "location")
                }
                variant="outlined"
                type="number"
                label="Latitude"
                value={org.location.latitude || 0}
                className={classes.formField}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  handleOnChange(
                    "longitude",
                    Number(e.target.value),
                    "location"
                  )
                }
                variant="outlined"
                type="number"
                label="Longitude"
                value={org.location.longitude || 0}
                className={classes.formField}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.wrapper}>
        <Typography variant="h5">Social</Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          {Object.keys(org.social).map((key) => (
            <Grid item xs={12} sm={4} key={`social-item-${key}`}>
              <TextField
                onChange={(e) => handleOnChange(key, e.target.value, "social")}
                variant="outlined"
                label={toCapitalCase(key)}
                value={org.social[key] || ""}
                className={classes.formField}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className={classes.wrapper}>
        <Typography variant="h5">Node List</Typography>
        <Divider className={classes.divider} />
        <NodesForm
          nodes={nodes}
          nodeIndex={currentNodeIndex}
          onSubmit={handleOnSubmitNode}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {(nodes || []).length ? (
              <NodesList
                nodes={nodes}
                onDelete={handleOnDeleteNode}
                onEdit={handleOnEditNode}
              />
            ) : (
              <Typography variant="body1" align="center">
                Nothing to display
              </Typography>
            )}
          </Grid>
          <Grid container item direction="column" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              className={classes.btn}
              onClick={() => setOpenModal(true)}
            >
              Add Node
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.wrapper}>
        <Typography variant="h5">Preview</Typography>
        <Divider className={classes.divider} />
        <ReactJson
          src={{
            producer_account_name: accountName,
            org: org,
            nodes: nodes,
          }}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          name="BPJson"
          collapsed
        />
      </Box>

      <Box className={classes.wrapper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.checkbox,
                  }}
                  checked={shouldUpdateChain}
                  onChange={() => setShouldUpdateChain(!shouldUpdateChain)}
                  disabled={!accountName}
                  color="primary"
                />
              }
              label="Also send bpjson to the chain"
            />
            <Typography variant="caption" className={classes.caption}>
              {!accountName ? "Please login to use this option" : ""}
            </Typography>
          </Grid>
          <Grid container item direction="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleOnSubmit}
            >
              Download bp.json
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

BPJsonForm.propTypes = {
  accountName: PropTypes.string,
  bpJson: PropTypes.any,
  onSubmit: PropTypes.func,
};

BPJsonForm.defaultProps = {
  bpJson: {},
};

export default BPJsonForm;
