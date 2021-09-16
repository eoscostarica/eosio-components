import React from "react";

import IssuanceVerifier from "../components/IssuanceVerifier";

export default {
  title: "Example/Issuance Verifier",
  component: IssuanceVerifier,
};

const Template = (args) => <IssuanceVerifier {...args} />;

export const Example = Template.bind({});
Example.args = {
  code: "notarioeoscr",
  scope: "notarioeoscr",
  table: "libro",
  nodeLink: "https://jungle3.bloks.io/transaction",
  errorMsg: "No se ha podido verificar la emisión de este documento",
  successMsg: "Emisión de documento verificada",
  verificationState: "Estado de verificación",
  analyzeAnotherDoc: "Analizar otro documento",
  showInExplorer: "Ver en explorador",
};
