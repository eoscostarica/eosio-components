(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{184:function(module,__webpack_exports__,__webpack_require__){"use strict";var eosjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(260),eosjs_dist_eosjs_jssig__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(439),text_encoding__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(261),node_fetch__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(440),node_fetch__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_3__),_config__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(185),signatureProvider=new eosjs_dist_eosjs_jssig__WEBPACK_IMPORTED_MODULE_1__.JsSignatureProvider([]),rpc=new eosjs__WEBPACK_IMPORTED_MODULE_0__.JsonRpc(_config__WEBPACK_IMPORTED_MODULE_4__.a.eosApiHost||"https://jungle.eosio.cr",{fetch:node_fetch__WEBPACK_IMPORTED_MODULE_3___default.a}),api=new eosjs__WEBPACK_IMPORTED_MODULE_0__.Api({rpc:rpc,signatureProvider:signatureProvider,textDecoder:new text_encoding__WEBPACK_IMPORTED_MODULE_2__.TextDecoder,textEncoder:new text_encoding__WEBPACK_IMPORTED_MODULE_2__.TextEncoder});__webpack_exports__.a={api:api,rpc:rpc}},185:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a={sitekey:"6Ld4qOoUAAAAAKwnrG4CGj9RjzG3FMFXLEaqEdVv",eosApiHost:"https://jungle.eosio.cr"}},450:function(module,exports,__webpack_require__){__webpack_require__(451),__webpack_require__(597),module.exports=__webpack_require__(598)},515:function(module,exports){},598:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(437);module._StorybookPreserveDecorators=!0,Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(842)],module)}.call(this,__webpack_require__(599)(module))},842:function(module,exports,__webpack_require__){var map={"./stories/0-AccountInfo.stories.js":917,"./stories/1-CreateAccount.stories.js":918};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=842},862:function(module,exports){},864:function(module,exports){},873:function(module,exports){},875:function(module,exports){},917:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"modal",(function(){return modal}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),objectSpread2=(__webpack_require__(46),__webpack_require__(102),__webpack_require__(843),__webpack_require__(79),__webpack_require__(33),__webpack_require__(59),__webpack_require__(35)),regenerator=__webpack_require__(74),regenerator_default=__webpack_require__.n(regenerator),asyncToGenerator=(__webpack_require__(95),__webpack_require__(142)),slicedToArray=__webpack_require__(34),defineProperty=__webpack_require__(90),makeStyles=__webpack_require__(952),TextField=__webpack_require__(963),Grid=__webpack_require__(955),Button=__webpack_require__(959),Typography=__webpack_require__(957),Modal=__webpack_require__(964),Backdrop=__webpack_require__(966),IconButton=__webpack_require__(920),build=__webpack_require__(438),build_default=__webpack_require__.n(build),ExpansionPanel=__webpack_require__(965),ExpansionPanelSummary=__webpack_require__(961),ExpansionPanelDetails=__webpack_require__(962),ExpandMore=__webpack_require__(197),ExpandMore_default=__webpack_require__.n(ExpandMore),VpnKey=__webpack_require__(262),VpnKey_default=__webpack_require__.n(VpnKey),CircularProgress=__webpack_require__(958),eosjs_api=__webpack_require__(184),classnames=(__webpack_require__(32),__webpack_require__(82),__webpack_require__(441)),classnames_default=__webpack_require__.n(classnames),convertHex2RGB=(__webpack_require__(100),__webpack_require__(911),__webpack_require__(80),__webpack_require__(58),__webpack_require__(156),function(str){var _ref=(str+"").match(/^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i)||[],_ref2=Object(slicedToArray.a)(_ref,3),_short=_ref2[1],_long=_ref2[2];if(_long){var value=Number.parseInt(_long,16);return{r:value>>16,g:255&value>>8,b:255&value}}if(_short){var _Array$from$map=Array.from(_short,(function(s){return Number.parseInt(s,16)})).map((function(n){return n<<4|n})),_Array$from$map2=Object(slicedToArray.a)(_Array$from$map,3);return{r:_Array$from$map2[0],g:_Array$from$map2[1],b:_Array$from$map2[2]}}}),useStylesBase=Object(makeStyles.a)((function(theme){return{skillsContainer:{marginTop:theme.spacing(2),display:"flex",overflow:"hidden",flexWrap:"wrap"},circularProgress:{"&, &:before, &:after":{width:100,height:100,borderRadius:"50%"},margin:"auto",position:"relative","&:before, &:after":{position:"absolute",top:0,left:0,boxSizing:"border-box",textAlign:"center"},"&:before":{padding:".5em",lineHeight:"56px",fontSize:"1.5rem",fontWeight:"bold"},"&:after":{fontSize:".8rem",fontWeight:"normal",textTransform:"uppercase",lineHeight:"120px"}}}})),useStyles=Object(makeStyles.a)({content:{background:function background(_ref){var color=_ref.color,rgb=_ref.rgb;return"linear-gradient(0deg, ".concat(color," 50%, rgba(").concat(rgb.r,", ").concat(rgb.b,", ").concat(rgb.b,", .3) 50%)")},transform:function transform(_ref2){var value=_ref2.value;return"rotate(".concat(value,"deg)")},"&:before":{color:function color(_ref3){return _ref3.color},background:"#fff content-box",transform:function transform(_ref4){var value=_ref4.value;return"rotate(-".concat(value,"deg)")},content:function content(_ref5){var percent=_ref5.percent;return'"'.concat(percent,'%"')}},"&:after":{color:function color(_ref6){return _ref6.color},background:"linear-gradient(transparent 50%, #fff 50%)",content:function content(_ref7){var name=_ref7.name;return'"'.concat(name,'"')},transform:function transform(_ref8){var value=_ref8.value;return"rotate(-".concat(value,"deg) scale(1.1)")}}}}),ProgressBar_CircularProgress=function(_ref9){var name=_ref9.name,color=_ref9.color,backgroundColor=_ref9.backgroundColor,percent=_ref9.percent,classesBase=useStylesBase(),classes=useStyles({value:percent/100*180,name:name,color:color,rgb:convertHex2RGB(color),backgroundColor:backgroundColor,percent:percent});return react_default.a.createElement("div",{className:classesBase.skillsContainer},react_default.a.createElement("div",{className:classnames_default()(classesBase.circularProgress,classes.content)}))};ProgressBar_CircularProgress.displayName="CircularProgress",ProgressBar_CircularProgress.defaultProps={name:"ram",color:"#F1642C",backgroundColor:"#fff",percent:80},ProgressBar_CircularProgress.__docgenInfo={description:"",methods:[],displayName:"CircularProgress",props:{name:{defaultValue:{value:"'ram'",computed:!1},type:{name:"string"},required:!1,description:""},color:{defaultValue:{value:"'#F1642C'",computed:!1},type:{name:"string"},required:!1,description:""},backgroundColor:{defaultValue:{value:"'#fff'",computed:!1},type:{name:"string"},required:!1,description:""},percent:{defaultValue:{value:"80",computed:!1},type:{name:"union",value:[{name:"number"},{name:"string"}]},required:!1,description:""}}};var ProgressBar=ProgressBar_CircularProgress;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/ProgressBar.js"]={name:"CircularProgress",docgenInfo:ProgressBar_CircularProgress.__docgenInfo,path:"src/ProgressBar.js"});var Avatar=__webpack_require__(967),getRgbColorsFromHex=(__webpack_require__(78),__webpack_require__(81),function(){var inputString=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"defaultString",inputStringSum=0;for(var i in inputString)inputStringSum+=inputString.charCodeAt(i);var r=~~(256*("0."+Math.sin(inputStringSum+1).toString().substr(6))),g=~~(256*("0."+Math.sin(inputStringSum+2).toString().substr(6))),b=~~(256*("0."+Math.sin(inputStringSum+3).toString().substr(6))),rgb="rgb(".concat(r,", ").concat(g,", ").concat(b,")"),hex="#".concat(r.toString(16)).concat(g.toString(16)).concat(b.toString(16)).toUpperCase();return{r:r,g:g,b:b,rgb:rgb,hex:hex}}),BPAvatar_useStyles=Object(makeStyles.a)({avatar:{margin:5,width:10,height:10,fontSize:1,color:"#111",backgroundColor:function backgroundColor(_ref){return _ref.backgroundColor.hex}}}),BPAvatar_useStylesBase=Object(makeStyles.a)((function(theme){return{bpAvatar:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",padding:theme.spacing(1),alignItems:"center"}}})),BPAvatar=function(_ref2){var name=_ref2.name,classesBase=BPAvatar_useStylesBase(),classes=BPAvatar_useStyles({backgroundColor:getRgbColorsFromHex(name)});return react_default.a.createElement(Grid.a,{className:classesBase.bpAvatar},react_default.a.createElement(Avatar.a,{className:classes.avatar},"."),react_default.a.createElement(Typography.a,null,name))};BPAvatar.displayName="BPAvatar",BPAvatar.defaultProps={name:"userdefault1"},BPAvatar.__docgenInfo={description:"",methods:[],displayName:"BPAvatar",props:{name:{defaultValue:{value:"'userdefault1'",computed:!1},type:{name:"string"},required:!1,description:""}}};var src_BPAvatar=BPAvatar;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/BPAvatar.js"]={name:"BPAvatar",docgenInfo:BPAvatar.__docgenInfo,path:"src/BPAvatar.js"});var AccountInfo_useStyles=Object(makeStyles.a)((function(theme){return{root:{minHeight:400,display:"flex",padding:0},btn:{display:"flex",justifyContent:"center",margin:10},modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:Object(defineProperty.a)({backgroundColor:theme.palette.background.paper,boxShadow:theme.shadows[5],borderRadius:10,width:"100%",height:"auto","&:focus":{outline:"none"}},theme.breakpoints.up("sm"),{width:"60%"}),contentBox:{display:"flex",flexDirection:"column",minHeight:300,maxHeight:600,overflowX:"scroll",marginTop:10,padding:"0px 20px","& button":{marginLeft:20}},deleteBtn:{height:27,display:"flex",justifyContent:"space-between",padding:"20px 10px",borderBottom:"1px solid #e9ecef"},iconBtnPadding:{padding:0},avatar:{margin:5,width:30,height:30,fontSize:12},accountInfo:{marginLeft:20},accountName:{margin:0,fontWeight:"500"},gridBox:{marginBottom:20},expansionPanel:{boxShadow:"none"},list:{display:"flex",flexWrap:"wrap",justifyContent:"space-between"},displayNone:{display:"none important!"},voterInfo:{display:"flex",flexDirection:"column",maxHeight:200,overflowX:"scroll"},subTitleInfo:{fontWeight:500},infoBox:{display:"flex",flexDirection:"column",padding:"0 15px !important"},titleInfo:{fontWeight:500},detailBox:{display:"flex",flexDirection:"row",justifyContent:"flex-start","& p:nth-child(2)":{marginLeft:10,color:"rgba(0, 0, 0, 0.54)"}},expanded:{margin:"0px !important",padding:0},keyIcon:{marginLeft:10,color:"rgba(0, 0, 0, 0.54)"}}})),_ref4=react_default.a.createElement(Typography.a,{variant:"h6",gutterBottom:!0,color:"primary"},"Get account info"),_ref5=react_default.a.createElement(Grid.a,{container:!0,alignItems:"center",justify:"center"},react_default.a.createElement(CircularProgress.a,null)),_ref6=react_default.a.createElement(ExpandMore_default.a,null),_ref7=react_default.a.createElement(Typography.a,{variant:"h6",color:"textSecondary"},"Resources"),_ref8=react_default.a.createElement(ExpandMore_default.a,null),AccountInfo_ref9=react_default.a.createElement(Typography.a,{variant:"h6",color:"textSecondary"},"Voter Information"),_ref10=react_default.a.createElement(ExpandMore_default.a,null),_ref11=react_default.a.createElement(Typography.a,{variant:"h6",color:"textSecondary"},"Keys"),AccountInfo=function(_ref){_ref.onHandleSubmit;var customBtnStyle=_ref.customBtnStyle,classes=AccountInfo_useStyles(),_useState=Object(react.useState)(),_useState2=Object(slicedToArray.a)(_useState,2),value=_useState2[0],setValue=_useState2[1],_useState3=Object(react.useState)(null),_useState4=Object(slicedToArray.a)(_useState3,2),account=_useState4[0],setAccount=_useState4[1],_useState5=Object(react.useState)(!1),_useState6=Object(slicedToArray.a)(_useState5,2),isError=_useState6[0],setIsError=_useState6[1],_useState7=Object(react.useState)(!1),_useState8=Object(slicedToArray.a)(_useState7,2),open=_useState8[0],setOpen=_useState8[1],_useState9=Object(react.useState)(!1),_useState10=Object(slicedToArray.a)(_useState9,2),loading=_useState10[0],setLoading=_useState10[1],handleOpen=function(){var _ref2=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:setOpen(!open);case 1:case"end":return _context.stop()}}),_callee)})));return function(){return _ref2.apply(this,arguments)}}(),handleOnSubmit=function(){var _ref3=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee2(){var _account,ram_usage,ram_quota,cpu_limit,net_limit,permissions,ram,cpu,net,keys;return regenerator_default.a.wrap((function(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:return _context2.prev=0,setLoading(!0),_context2.next=4,eosjs_api.a.api.rpc.get_account((value||"").toLocaleLowerCase());case 4:if(_account=_context2.sent,0!==Object.keys(_account).length){_context2.next=7;break}throw new Error("No Account data!");case 7:ram_usage=_account.ram_usage,ram_quota=_account.ram_quota,cpu_limit=_account.cpu_limit,net_limit=_account.net_limit,permissions=_account.permissions,ram=(100*ram_usage/ram_quota||0).toFixed(),cpu=(100*cpu_limit.used/cpu_limit.max||0).toFixed(),net=(100*net_limit.used/net_limit.max||0).toFixed(),keys={active:{label:permissions[0].perm_name,value:permissions[0].required_auth.keys[0].key},owner:{label:permissions[1].perm_name,value:permissions[1].required_auth.keys[0].key}},setAccount(Object(objectSpread2.a)(Object(objectSpread2.a)({},_account),{},{ram:ram,cpu:cpu,net:net,keys:keys})),setIsError(!1),setLoading(!1),_context2.next=22;break;case 17:_context2.prev=17,_context2.t0=_context2.catch(0),console.log("Get account info",_context2.t0),setIsError(!0),setLoading(!1);case 22:case"end":return _context2.stop()}}),_callee2,null,[[0,17]])})));return function(){return _ref3.apply(this,arguments)}}();return react_default.a.createElement("div",null,react_default.a.createElement(Button.a,{size:"large",color:"secondary",onClick:handleOpen,className:customBtnStyle},"Get account info"),react_default.a.createElement(Modal.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",className:classes.modal,open:open,onClose:handleOpen,closeAfterTransition:!0,BackdropComponent:Backdrop.a,BackdropProps:{timeout:500}},react_default.a.createElement("div",{className:classes.paper},react_default.a.createElement("form",{noValidate:!0,autoComplete:"off"},react_default.a.createElement(Grid.a,{container:!0,direction:"column",justify:"space-between",className:classes.root},react_default.a.createElement("div",{className:classes.deleteBtn},_ref4,react_default.a.createElement(IconButton.a,{classes:{root:classes.iconBtnPadding},"aria-label":"delete",onClick:function onClick(){return setOpen(!1)}},"X")),react_default.a.createElement("div",{className:classes.contentBox},react_default.a.createElement(Grid.a,{container:!0,direction:"row",justify:"flex-start",className:classes.gridBox},react_default.a.createElement(TextField.a,{variant:"filled",label:"Account Name",placeholder:"eoscrtest123",autoComplete:"off",name:"accountName",onChange:function handleChange(event){event.preventDefault();var value=event.target.value;setValue(value)}}),react_default.a.createElement(Button.a,{size:"large",variant:"contained",color:"primary",onClick:handleOnSubmit},"Get")),loading&&_ref5,isError&&react_default.a.createElement(Grid.a,{container:!0,alignItems:"center",justify:"center"},react_default.a.createElement(Typography.a,{variant:"h4",color:"primary",className:classes.accountName},"Account not found!")),account&&react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(Grid.a,{container:!0,direction:"row",alignItems:"center"},react_default.a.createElement(build_default.a,{string:account.account_name||"default",size:60,fg:"#F1642C"}),react_default.a.createElement(Grid.a,{container:!0,direction:"column",xs:9,className:classes.accountInfo},react_default.a.createElement(Typography.a,{variant:"h4",color:"primary",className:classes.accountName},account.account_name||"defaulteos12"),react_default.a.createElement(Typography.a,{variant:"h6",color:"textSecondary"},"EOS  balance: ".concat(account&&account.core_liquid_balance||"0 EOS")))),react_default.a.createElement(Grid.a,{container:!0,direction:"row",justify:"space-around"},react_default.a.createElement(ProgressBar,{name:"ram",color:"#F1642C",backgroundColor:"#fff",percent:account&&account.ram||0}),react_default.a.createElement(ProgressBar,{name:"cpu",color:"#25AFDE",backgroundColor:"#fff",percent:account&&account.cpu||0}),react_default.a.createElement(ProgressBar,{name:"net",color:"#767BB3",backgroundColor:"#fff",percent:account&&account.net||0})),react_default.a.createElement(Grid.a,{container:!0,direction:"column",className:classes.gridBox},react_default.a.createElement(ExpansionPanel.a,{classes:{root:classes.expansionPanel}},react_default.a.createElement(ExpansionPanelSummary.a,{classes:{expanded:classes.expanded,root:classes.expanded},expandIcon:_ref6,"aria-controls":"panel1a-content",id:"panel1a-header"},_ref7),react_default.a.createElement(ExpansionPanelDetails.a,{className:classes.infoBox},react_default.a.createElement("div",{className:classes.detailBox},react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},"Available:"),react_default.a.createElement(Typography.a,null,account.core_liquid_balance)),react_default.a.createElement("div",{className:classes.detailBox},react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},"CPU staked:"),react_default.a.createElement(Typography.a,null,account.total_resources.cpu_weight)),react_default.a.createElement("div",{className:classes.detailBox},react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},"NET staked:"),react_default.a.createElement(Typography.a,null,account.total_resources.net_weight)))),react_default.a.createElement(ExpansionPanel.a,{classes:{root:classes.expansionPanel}},react_default.a.createElement(ExpansionPanelSummary.a,{classes:{expanded:classes.expanded,root:classes.expanded},expandIcon:_ref8,"aria-controls":"panel3a-content",id:"panel3a-header"},AccountInfo_ref9),react_default.a.createElement(ExpansionPanelDetails.a,{className:classes.voterInfo},!!account.voter_info.proxy.length&&react_default.a.createElement("div",{className:classes.detailBox},react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},"Proxy:"),react_default.a.createElement(Typography.a,null,account.voter_info.proxy)),account.voter_info.producers.length&&react_default.a.createElement(react_default.a.Fragment,null,react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},"Voting for ".concat(account.voter_info.producers.length," Block Producers:")),react_default.a.createElement(Grid.a,{className:classes.list},account.voter_info.producers.map((function(value){return react_default.a.createElement(src_BPAvatar,{key:value,name:value})})))),react_default.a.createElement("div",{className:classes.detailBox},react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},"Vote weight:"),react_default.a.createElement(Typography.a,null,account.voter_info.last_vote_weight)),react_default.a.createElement("div",{className:classes.detailBox},react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},"Is Proxy:"),react_default.a.createElement(Typography.a,null,account.voter_info.is_proxy?"True":"False")))),react_default.a.createElement(ExpansionPanel.a,{classes:{root:classes.expansionPanel}},react_default.a.createElement(ExpansionPanelSummary.a,{classes:{expanded:classes.expanded,root:classes.expanded},expandIcon:_ref10,"aria-controls":"panel2a-content",id:"panel2a-header"},_ref11),react_default.a.createElement(ExpansionPanelDetails.a,{className:classes.infoBox},react_default.a.createElement("div",null,react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},account.keys.active.label),react_default.a.createElement("div",{className:classes.detailBox},react_default.a.createElement(VpnKey_default.a,{className:classes.keyIcon}),react_default.a.createElement(Typography.a,null,account.keys.active.value))),react_default.a.createElement("div",null,react_default.a.createElement(Typography.a,{className:classes.subTitleInfo},account.keys.owner.label),react_default.a.createElement("div",{className:classes.detailBox},react_default.a.createElement(VpnKey_default.a,{className:classes.keyIcon}),react_default.a.createElement(Typography.a,null,account.keys.owner.value)))))))))))))};AccountInfo.displayName="AccountInfo",AccountInfo.defaultProps={onHandleSubmit:function onHandleSubmit(){return console.log("click Submit button")},customBtnStyle:{}},AccountInfo.__docgenInfo={description:"",methods:[],displayName:"AccountInfo",props:{onHandleSubmit:{defaultValue:{value:"() => console.log('click Submit button')",computed:!1},type:{name:"func"},required:!1,description:""},customBtnStyle:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""}}};var src_AccountInfo=AccountInfo;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/AccountInfo.js"]={name:"AccountInfo",docgenInfo:AccountInfo.__docgenInfo,path:"src/AccountInfo.js"});__webpack_exports__.default={title:"AccountInfo",component:src_AccountInfo};var _0_AccountInfo_stories_ref=react_default.a.createElement(src_AccountInfo,null),modal=function(){return _0_AccountInfo_stories_ref};modal.displayName="modal",modal.__docgenInfo={description:"",methods:[],displayName:"modal"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/0-AccountInfo.stories.js"]={name:"modal",docgenInfo:modal.__docgenInfo,path:"src/stories/0-AccountInfo.stories.js"})},918:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"modal",(function(){return modal}));var react=__webpack_require__(0),react_default=__webpack_require__.n(react),regenerator=(__webpack_require__(82),__webpack_require__(74)),regenerator_default=__webpack_require__.n(regenerator),objectSpread2=__webpack_require__(35),asyncToGenerator=(__webpack_require__(95),__webpack_require__(142)),slicedToArray=__webpack_require__(34),defineProperty=__webpack_require__(90),makeStyles=__webpack_require__(952),TextField=__webpack_require__(963),Grid=__webpack_require__(955),Button=__webpack_require__(959),Typography=__webpack_require__(957),Modal=__webpack_require__(964),Backdrop=__webpack_require__(966),IconButton=__webpack_require__(920),esm=__webpack_require__(442),eosjs_api=__webpack_require__(184),config=__webpack_require__(185),useStyles=Object(makeStyles.a)((function(theme){return{root:{minHeight:400,display:"flex",padding:0},btn:{display:"flex",justifyContent:"center",margin:10},modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:Object(defineProperty.a)({backgroundColor:theme.palette.background.paper,boxShadow:theme.shadows[5],borderRadius:10,width:"100%",height:"auto","&:focus":{outline:"none"}},theme.breakpoints.up("sm"),{width:"60%"}),inputBox:{display:"flex",flexDirection:"column",height:300,justifyContent:"space-between",padding:"0px 20px"},deleteBtn:{height:27,display:"flex",justifyContent:"space-between",padding:"20px 10px",borderBottom:"1px solid #e9ecef"},iconBtnPadding:{padding:0},captcha:{marginTop:10}}})),INITIAL_VALUES={accountName:{value:"",error:"",isRequired:!0,isValid:!1},ownerPK:{value:"",error:"",isRequired:!0,isValid:!1},activePK:{value:"",error:"",isRequired:!0,isValid:!1}},_ref3=react_default.a.createElement(Typography.a,{variant:"h6",gutterBottom:!0,color:"primary"},"Create Account"),AccountInfo=function(_ref){var onHandleSubmit=_ref.onHandleSubmit,customBtnStyle=_ref.customBtnStyle,classes=useStyles(),_useState=Object(react.useState)(INITIAL_VALUES),_useState2=Object(slicedToArray.a)(_useState,2),values=_useState2[0],setValues=_useState2[1],_useState3=Object(react.useState)(!1),_useState4=Object(slicedToArray.a)(_useState3,2),open=_useState4[0],setOpen=_useState4[1],handleOpen=function(){setOpen(!open)},handleOnSubmit=function(){var _ref2=Object(asyncToGenerator.a)(regenerator_default.a.mark((function _callee(){return regenerator_default.a.wrap((function(_context){for(;;)switch(_context.prev=_context.next){case 0:if(_context.prev=0,!(values.accountName.isValid&&values.activePK.isValid&&values.ownerPK.isValid)){_context.next=7;break}return _context.next=4,eosjs_api.a.api.transact({actions:[{account:"eosio",name:"newaccount",authorization:[{actor:"useraaaaaaaa",permission:"active"}],data:{creator:"useraaaaaaaa",name:values.accountName,owner:{threshold:1,keys:[{key:values.ownerPK,weight:1}],accounts:[],waits:[]},active:{threshold:1,keys:[{key:values.activePK,weight:1}],accounts:[],waits:[]}}},{account:"eosio",name:"buyrambytes",authorization:[{actor:"useraaaaaaaa",permission:"active"}],data:{payer:"useraaaaaaaa",receiver:values.accountName,bytes:8192}},{account:"eosio",name:"delegatebw",authorization:[{actor:"useraaaaaaaa",permission:"active"}],data:{from:"useraaaaaaaa",receiver:values.accountName,stake_net_quantity:"1.0000 SYS",stake_cpu_quantity:"1.0000 SYS",transfer:!1}}]},{blocksBehind:3,expireSeconds:30});case 4:return onHandleSubmit({accountName:values.accountName.value,ownerPK:values.activePK.value,activePK:values.ownerPK.value}),setValues(INITIAL_VALUES),_context.abrupt("return");case 7:setValues({accountName:Object(objectSpread2.a)(Object(objectSpread2.a)({},values.accountName),{},{error:values.accountName.value.length?"":"This field is required"}),ownerPK:Object(objectSpread2.a)(Object(objectSpread2.a)({},values.ownerPK),{},{error:values.activePK.value.length?"":"This field is required"}),activePK:Object(objectSpread2.a)(Object(objectSpread2.a)({},values.activePK),{},{error:values.ownerPK.value.length?"":"This field is required"})}),_context.next=13;break;case 10:_context.prev=10,_context.t0=_context.catch(0),console.log("Create account",_context.t0);case 13:case"end":return _context.stop()}}),_callee,null,[[0,10]])})));return function(){return _ref2.apply(this,arguments)}}(),handleChange=function(event){event.preventDefault();var _event$target=event.target,name=_event$target.name,value=_event$target.value,regexValidation={accountName:/^[a-zA-Z1-5]{12}/,eosKey:/^\bEOS[a-zA-Z0-9]+$/},error="",isValid=!1;switch(name){case"accountName":regexValidation.accountName.test(value)?(error="",isValid=!0):error="a-z,1-5 are allowed only. Length 12";break;case"ownerPK":regexValidation.accountName.test(value)?(error="",isValid=!0):error="Owner Public Key format is not valid!";break;case"activePK":regexValidation.accountName.test(value)?(error="",isValid=!0):error="Public Public Key format is not valid!"}setValues(Object(objectSpread2.a)(Object(objectSpread2.a)({},values),{},Object(defineProperty.a)({},name,{isRequired:!0,value:value,error:error,isValid:isValid})))};return react_default.a.createElement("div",null,react_default.a.createElement(Button.a,{size:"large",color:"secondary",onClick:handleOpen,className:customBtnStyle},"Create Account"),react_default.a.createElement(Modal.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",className:classes.modal,open:open,onClose:handleOpen,closeAfterTransition:!0,BackdropComponent:Backdrop.a,BackdropProps:{timeout:500}},react_default.a.createElement("div",{className:classes.paper},react_default.a.createElement("form",{noValidate:!0,autoComplete:"off"},react_default.a.createElement(Grid.a,{container:!0,direction:"column",justify:"space-between",className:classes.root},react_default.a.createElement("div",{className:classes.deleteBtn},_ref3,react_default.a.createElement(IconButton.a,{classes:{root:classes.iconBtnPadding},"aria-label":"delete",onClick:function onClick(){return setOpen(!1)}},"X")),react_default.a.createElement("div",{className:classes.inputBox},react_default.a.createElement(Grid.a,{item:!0},react_default.a.createElement(TextField.a,{variant:"filled",fullWidth:!0,error:!!values.accountName.error,helperText:values.accountName.error?values.accountName.error:"",label:"Account Name",placeholder:"eoscrtest123",required:!0,autoComplete:"off",name:"accountName",onChange:handleChange})),react_default.a.createElement(Grid.a,{item:!0},react_default.a.createElement(TextField.a,{variant:"filled",fullWidth:!0,error:!!values.ownerPK.error,helperText:values.ownerPK.error?values.ownerPK.error:"",label:"Owner Public Key",placeholder:"EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",required:!0,autoComplete:"off",name:"ownerPK",onChange:handleChange})),react_default.a.createElement(Grid.a,{item:!0},react_default.a.createElement(TextField.a,{variant:"filled",fullWidth:!0,error:!!values.activePK.error,helperText:values.activePK.error?values.activePK.error:"",label:"Active Public Key",placeholder:"EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",required:!0,autoComplete:"off",name:"activePK",onChange:handleChange})),react_default.a.createElement("div",{className:classes.captcha},react_default.a.createElement(esm.a,{sitekey:config.a.sitekey,onChange:function onChange(value){return console.log({value:value})}}))),react_default.a.createElement("div",{className:classes.btn},react_default.a.createElement(Button.a,{size:"large",variant:"contained",color:"primary",onClick:handleOnSubmit},"Create account")))))))};AccountInfo.displayName="AccountInfo",AccountInfo.defaultProps={onHandleSubmit:function onHandleSubmit(){return console.log("click Submit button")},customBtnStyle:{}},AccountInfo.__docgenInfo={description:"",methods:[],displayName:"AccountInfo",props:{onHandleSubmit:{defaultValue:{value:"() => console.log('click Submit button')",computed:!1},type:{name:"func"},required:!1,description:""},customBtnStyle:{defaultValue:{value:"{}",computed:!1},type:{name:"object"},required:!1,description:""}}};var CreateAccount=AccountInfo;"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/CreateAccount.js"]={name:"AccountInfo",docgenInfo:AccountInfo.__docgenInfo,path:"src/CreateAccount.js"});__webpack_exports__.default={title:"CreateAccount",component:CreateAccount};var _1_CreateAccount_stories_ref=react_default.a.createElement(CreateAccount,null),modal=function(){return _1_CreateAccount_stories_ref};modal.displayName="modal",modal.__docgenInfo={description:"",methods:[],displayName:"modal"},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/stories/1-CreateAccount.stories.js"]={name:"modal",docgenInfo:modal.__docgenInfo,path:"src/stories/1-CreateAccount.stories.js"})}},[[450,1,2]]]);
//# sourceMappingURL=main.f8347560afe401645a88.bundle.js.map