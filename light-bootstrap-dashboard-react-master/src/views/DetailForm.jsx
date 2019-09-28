// import React, { Component } from "react";
// import "./DetailForm.css";
// import fbConfig from "./Config";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import AdminLayout from "layouts/Admin.jsx";
// //import { connect } from "react-redux";

// class detailForm extends Component {
//   constructor() {
//     super();
//     this.state = {
//       rfid: "",
//       name: "",
//       address: "",
//       telephone: "",
//       email: "",
//       errorsD: [],
//       status: 0
//     };
//     // this.onChng = this.onChng.bind(this);
//   }

//   render() {
//     let nameErrD = null,
//       addressErrD = null,
//       telephoneErrD = null,
//       emailErrD = null;
//     //Loop and find which ones has the error
//     for (let errD of this.state.errorsD) {
//       //Assign the validation error message
//       if (errD.elm == "name") {
//         nameErrD = errD.msg;
//       }
//       if (errD.elm == "address") {
//         addressErrD = errD.msg;
//       }
//       if (errD.elm == "telephone") {
//         telephoneErrD = errD.msg;
//       }

//       if (errD.elm == "email") {
//         emailErrD = errD.msg;
//       }
//       //No (else if or else) statements cause we need to check for all possible elements
//     }
//     return (

//     );
//   }
// }

// // const mapStateToProps = state => {
// //   return {
// //     logged: state.logged
// //   };
// // };

// // const mapDispachToProps = dispach => {
// //   return {
// //     onChng: () => dispach({ type: "UPDATE" })
// //   };
// // };

// //export default (mapStateToProps, mapDispachToProps)(detailForm);
// export default detailForm;
