import React from "react";

import CreateAccount from "../components/CreateAccount";

export default {
  title: "Example/Create Account",
  component: CreateAccount,
};

const Template = (args) => <CreateAccount {...args} />;

export const Example = Template.bind({});
Example.args = {
  onHandleSubmit: () => console.log("click Submit button"),
  customBtnStyle: "",
};
