// import React, { Component } from "react";
// import "./SignUp.css";
// import fbConfig from "./Config";
// import firebase from "firebase";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import AdminLayout from "layouts/Admin.jsx";
// import Temp from "./Temp";
// import DetailedForm from "./DetailForm";

// class signUp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoginOpen: true,
//       isRegisterOpen: false,
//       loginPassword: 0,
//       detailfrom: false,
//       loginRfid: 0,
//       logged: false,
//       array: "",
//       rfid: "",
//       confirm: "",
//       password: "",
//       errors: [],
//       val: 0,
//       pwdState: null,
//       registered: false
//     };
//   }

//   showLoginBox() {
//     this.setState({ isLoginOpen: true, isRegisterOpen: false });
//   }

//   showRegisterBox() {
//     this.setState({ isRegisterOpen: true, isLoginOpen: false });
//   }

//   ////////////////////login/////////
//   showValidationErr(elm, msg) {
//     this.setState(prevState => ({
//       errors: [
//         ...prevState.errors,
//         {
//           elm,
//           msg
//         }
//       ]
//     }));
//   }
//   //Remove a specific element from the array
//   clearValidationErr(elm) {
//     this.setState(prevState => {
//       let newArr = [];
//       //Add all elements from the prev array to the new one that has a different element
//       for (let err of prevState.errors) {
//         if (elm != err.elm) {
//           newArr.push(err);
//         }
//       }
//       return { errors: newArr };
//     });
//   }

//   submitLogin(e) {
//     console.log("submit");
//     const app = fbConfig.database().ref("Car_Parking/Registered");
//     let values;

//     app.on("value", snapshot => {
//       values = snapshot.val();

//       const array = Object.keys(values);
//       console.log(array);
//       const val = this.state.loginRfid;
//       let result = 0;
//       array.map(e => {
//         console.log(val);
//         if (this.state.loginRfid === e) {
//           result = 1;
//         }
//       });

//       console.log(this.state.loginPassword);

//       if (result == 1) {
//         console.log("rfid correct");
//         const pwd = values[this.state.loginRfid]["Pswd"];
//         if (this.state.loginPassword == pwd) {
//           console.log("correct");
//           this.setState({ logged: true });
//         } else {
//           console.log("password error");
//         }
//       } else {
//         console.log("rfid Not correct");
//       }
//     });
//   }

//   loginRfidOnChangeHandler(e) {
//     this.setState({ loginRfid: e.target.value });
//   }

//   loginPasswdOnChangeHandler(e) {
//     this.setState({ loginPassword: e.target.value });
//     console.log(this.state.loginPassword);
//   }
//   ///////////////////////////////////////////////////

//   ////////////////register/////////////////////////
//   showValidationErr(elm, msg) {
//     this.setState(prevState => ({
//       errors: [
//         ...prevState.errors,
//         {
//           elm,
//           msg
//         }
//       ]
//     }));
//   }
//   //Remove a specific element from the array
//   clearValidationErr(elm) {
//     this.setState(prevState => {
//       let newArr = [];
//       //Add all elements from the prev array to the new one that has a different element
//       for (let err of prevState.errors) {
//         if (elm != err.elm) {
//           newArr.push(err);
//         }
//       }
//       return { errors: newArr };
//     });
//   }

//   onUsernameChange(e) {
//     this.setState({ rfid: e.target.value });
//     //We want to clear the error when ever the user type something new
//     this.clearValidationErr("rfid");
//   }

//   onConfirmChange(e) {
//     this.setState({ confirm: e.target.value });
//     this.clearValidationErr("confirm");
//   }

//   onPasswordChange(e) {
//     this.setState({ password: e.target.value });
//     this.clearValidationErr("password");

//     this.setState({ pwdState: "weak" });
//     if (e.target.value.length > 8) {
//       this.setState({ pwdState: "medium" });
//     } else if (e.target.value.length > 12) {
//       this.setState({ pwdState: "strong" });
//     }
//   }

//   submitRegister = e => {
//     //Check for all input fields and show errors if empty (you can implement other cases!)

//     console.log("submit");
//     if (this.state.username == "") {
//       this.showValidationErr("username", "Username Cannot be empty!");
//       this.setState({ val: 1 });
//     }
//     if (this.state.confirm == "") {
//       this.showValidationErr("confirm", "Confirm password Cannot be empty!");
//       this.setState({ val: 1 });
//     }
//     if (this.state.password == "") {
//       this.showValidationErr("password", "Password Cannot be empty!");
//       this.setState({ val: 1 });
//     }

//     if (this.state.confirm !== this.state.password) {
//       this.showValidationErr("confirm", "Passwords Don't Match");
//       this.setState({ val: 1 });
//     }

//     if (this.state.val === 0) {
//       const app = fbConfig.database().ref("Car_Parking/Registered");
//       let values;

//       app.on("value", snapshot => {
//         values = snapshot.val();

//         this.array = Object.keys(values);

//         this.array.map(e => {
//           if (this.state.rfid === e) {
//             console.log("yesss registered");
//             this.setState({
//               registered: true,
//               isLoginOpen: true,
//               isRegisterOpen: false
//             });

//             var updates = {};
//             updates["/Pswd"] = this.state.password;
//             app.child(e).update(updates);
//           }
//         });
//       });
//     }
//     this.setState({ val: 0 });
//   };
//   /////////////////////////////////////////////////////

//   render() {
//     let usernameErr = null,
//       passwordErr = null,
//       confirmErr = null;
//     //Loop and find which ones has the error
//     for (let err of this.state.errors) {
//       //Assign the validation error message
//       if (err.elm == "username") {
//         usernameErr = err.msg;
//       }
//       if (err.elm == "password") {
//         passwordErr = err.msg;
//       }
//       if (err.elm == "confirm") {
//         confirmErr = err.msg;
//       }
//       //No (else if or else) statements cause we need to check for all possible elements
//     }

//     let pwdWeak = false,
//       pwdMedium = false,
//       pwdStrong = false;
//     //Weak password set onlt the pwdWeak to true, cause render only the first bar
//     if (this.state.pwdState == "weak") {
//       pwdWeak = true;
//     } else if (this.state.pwdState == "medium") {
//       //Medium pwd then render the weak and medium bars
//       pwdWeak = true;
//       pwdMedium = true;
//     } else if (this.state.pwdState == "strong") {
//       //Strong, render all the previoud bars
//       pwdWeak = true;
//       pwdMedium = true;
//       pwdStrong = true;
//     }

//     console.log("register", this.state.registered);
//     console.log("logged", this.state.logged);
//     console.log(usernameErr, passwordErr, confirmErr);

//     return
//   }
// }

// // class LoginBox extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       loginPassword: 0,
// //       loginRfid: 0,
// //       logged: false
// //     };
// //   }

// //   // showValidationErr(elm, msg) {
// //   //   this.setState(prevState => ({
// //   //     errors: [
// //   //       ...prevState.errors,
// //   //       {
// //   //         elm,
// //   //         msg
// //   //       }
// //   //     ]
// //   //   }));
// //   // }
// //   // //Remove a specific element from the array
// //   // clearValidationErr(elm) {
// //   //   this.setState(prevState => {
// //   //     let newArr = [];
// //   //     //Add all elements from the prev array to the new one that has a different element
// //   //     for (let err of prevState.errors) {
// //   //       if (elm != err.elm) {
// //   //         newArr.push(err);
// //   //       }
// //   //     }
// //   //     return { errors: newArr };
// //   //   });
// //   // }

// //   // submitLogin(e) {
// //   //   console.log("submit");
// //   //   const app = fbConfig.database().ref("Car_Parking/Registered");
// //   //   let values;

// //   //   app.on("value", snapshot => {
// //   //     values = snapshot.val();

// //   //     const array = Object.keys(values);
// //   //     console.log(array);
// //   //     const val = this.state.loginRfid;
// //   //     let result = 0;
// //   //     array.map(e => {
// //   //       console.log(val);
// //   //       if (this.state.loginRfid === e) {
// //   //         result = 1;
// //   //       }
// //   //     });

// //   //     console.log(this.state.loginPassword);

// //   //     if (result == 1) {
// //   //       console.log("rfid correct");
// //   //       const pwd = values[this.state.loginRfid]["Pswd"];
// //   //       if (this.state.loginPassword == pwd) {
// //   //         console.log("correct");
// //   //         this.setState({ logged: true });
// //   //       } else {
// //   //         console.log("password error");
// //   //       }
// //   //     } else {
// //   //       console.log("rfid Not correct");
// //   //     }
// //   //   });
// //   // }

// //   // loginRfidOnChangeHandler(e) {
// //   //   this.setState({ loginRfid: e.target.value });
// //   // }

// //   // loginPasswdOnChangeHandler(e) {
// //   //   this.setState({ loginPassword: e.target.value });
// //   //   console.log(this.state.loginPassword);
// //   // }

// //   render() {
// //     return (
// //       // <div className="inner-container">
// //       //   <div className="header">Login</div>
// //       //   <div className="box">
// //       //     <div className="input-group">
// //       //       <label htmlFor="username">RFID Card Number</label>
// //       //       <input
// //       //         id="loginRfid"
// //       //         type="text"
// //       //         name="username"
// //       //         className="login-input"
// //       //         placeholder="Username"
// //       //         onChange={this.loginRfidOnChangeHandler.bind(this)}
// //       //       />
// //       //     </div>

// //       //     <div className="input-group">
// //       //       <label htmlFor="password">Password</label>
// //       //       <input
// //       //         id="loginPassword"
// //       //         type="password"
// //       //         name="password"
// //       //         className="login-input"
// //       //         placeholder="Password"
// //       //         onChange={this.loginPasswdOnChangeHandler.bind(this)}
// //       //       />
// //       //     </div>

// //       //     <button
// //       //       type="button"
// //       //       className="login-btn"
// //       //       onClick={this.submitLogin.bind(this)}
// //       //     >
// //       //       Login
// //       //     </button>
// //       //   </div>
// //       // </div>
// //     );
// //   }
// // }

// // class RegisterBox extends React.Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       array: "",
// //       rfid: "",
// //       confirm: "",
// //       password: "",
// //       errors: [],
// //       val: 0,
// //       pwdState: null,
// //       registered: false
// //     };
// //   }

// //   // showValidationErr(elm, msg) {
// //   //   this.setState(prevState => ({
// //   //     errors: [
// //   //       ...prevState.errors,
// //   //       {
// //   //         elm,
// //   //         msg
// //   //       }
// //   //     ]
// //   //   }));
// //   // }
// //   // //Remove a specific element from the array
// //   // clearValidationErr(elm) {
// //   //   this.setState(prevState => {
// //   //     let newArr = [];
// //   //     //Add all elements from the prev array to the new one that has a different element
// //   //     for (let err of prevState.errors) {
// //   //       if (elm != err.elm) {
// //   //         newArr.push(err);
// //   //       }
// //   //     }
// //   //     return { errors: newArr };
// //   //   });
// //   // }

// //   // onUsernameChange(e) {
// //   //   this.setState({ rfid: e.target.value });
// //   //   //We want to clear the error when ever the user type something new
// //   //   this.clearValidationErr("rfid");
// //   // }

// //   // onConfirmChange(e) {
// //   //   this.setState({ confirm: e.target.value });
// //   //   this.clearValidationErr("confirm");
// //   // }

// //   // onPasswordChange(e) {
// //   //   this.setState({ password: e.target.value });
// //   //   this.clearValidationErr("password");

// //   //   this.setState({ pwdState: "weak" });
// //   //   if (e.target.value.length > 8) {
// //   //     this.setState({ pwdState: "medium" });
// //   //   } else if (e.target.value.length > 12) {
// //   //     this.setState({ pwdState: "strong" });
// //   //   }
// //   // }

// //   // submitRegister = e => {
// //   //   //Check for all input fields and show errors if empty (you can implement other cases!)

// //   //   console.log("submit");
// //   //   if (this.state.username == "") {
// //   //     this.showValidationErr("username", "Username Cannot be empty!");
// //   //     this.setState({ val: 1 });
// //   //   }
// //   //   if (this.state.confirm == "") {
// //   //     this.showValidationErr("confirm", "Confirm password Cannot be empty!");
// //   //     this.setState({ val: 1 });
// //   //   }
// //   //   if (this.state.password == "") {
// //   //     this.showValidationErr("password", "Password Cannot be empty!");
// //   //     this.setState({ val: 1 });
// //   //   }

// //   //   if (this.state.confirm !== this.state.password) {
// //   //     this.showValidationErr("confirm", "Passwords Don't Match");
// //   //     this.setState({ val: 1 });
// //   //   }

// //   //   if (this.state.val === 0) {
// //   //     const app = fbConfig.database().ref("Car_Parking/Registered");
// //   //     let values;

// //   //     app.on("value", snapshot => {
// //   //       values = snapshot.val();

// //   //       this.array = Object.keys(values);

// //   //       this.array.map(e => {
// //   //         if (this.state.rfid === e) {
// //   //           console.log("yesss registered");
// //   //           this.setState({ registered: true });

// //   //           var updates = {};
// //   //           updates["/Pswd"] = this.state.password;
// //   //           app.child(e).update(updates);
// //   //         }
// //   //       });
// //   //     });
// //   //   }
// //   //   this.setState({ val: 0 });
// //   // };

// //   render() {
// //     // let usernameErr = null,
// //     //   passwordErr = null,
// //     //   confirmErr = null;
// //     // //Loop and find which ones has the error
// //     // for (let err of this.state.errors) {
// //     //   //Assign the validation error message
// //     //   if (err.elm == "username") {
// //     //     usernameErr = err.msg;
// //     //   }
// //     //   if (err.elm == "password") {
// //     //     passwordErr = err.msg;
// //     //   }
// //     //   if (err.elm == "confirm") {
// //     //     confirmErr = err.msg;
// //     //   }
// //     //   //No (else if or else) statements cause we need to check for all possible elements
// //     // }

// //     // let pwdWeak = false,
// //     //   pwdMedium = false,
// //     //   pwdStrong = false;
// //     // //Weak password set onlt the pwdWeak to true, cause render only the first bar
// //     // if (this.state.pwdState == "weak") {
// //     //   pwdWeak = true;
// //     // } else if (this.state.pwdState == "medium") {
// //     //   //Medium pwd then render the weak and medium bars
// //     //   pwdWeak = true;
// //     //   pwdMedium = true;
// //     // } else if (this.state.pwdState == "strong") {
// //     //   //Strong, render all the previoud bars
// //     //   pwdWeak = true;
// //     //   pwdMedium = true;
// //     //   pwdStrong = true;
// //     // }

// //     // console.log(usernameErr, passwordErr, confirmErr);

// //     return (
// //       <BrowserRouter>
// //         <Switch>
// //           <Route path="/signin" exact component={signUp} />
// //           <Route path="/detailedForm" exact component={DetailedForm} />
// //         </Switch>
// //         {console.log(this.state.registered)}
// //         {this.state.registered && <Redirect to="/detailForm" />}
// //         {/* <div className="inner-container">
// //           <div className="header">Register</div>
// //           <div className="box">
// //             <div className="input-group">
// //               <label htmlFor="username">RFID Card Number</label>
// //               <input
// //                 type="text"
// //                 id="rfid"
// //                 name="username"
// //                 className="login-input"
// //                 placeholder="Username"
// //                 onChange={this.onUsernameChange.bind(this)}
// //               />
// //               <small className="danger-error">
// //                 {usernameErr ? usernameErr : ""}
// //               </small>
// //             </div>
// //             <div className="input-group">
// //               <label htmlFor="password">Password</label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 className="login-input"
// //                 placeholder="Password"
// //                 onChange={this.onPasswordChange.bind(this)}
// //               />

// //               <small className="danger-error">
// //                 {passwordErr ? passwordErr : ""}
// //               </small>

// //               {this.state.password && (
// //                 <div className="password-state">
// //                   <div
// //                     className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}
// //                   ></div>
// //                   <div
// //                     className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}
// //                   ></div>
// //                   <div
// //                     className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}
// //                   ></div>
// //                 </div>
// //               )}
// //             </div>
// //             <div className="input-group">
// //               <label htmlFor="confirm">Confirm Password</label>
// //               <input
// //                 type="password"
// //                 name="confirm"
// //                 className="login-input"
// //                 placeholder="Confirm Password"
// //                 onChange={this.onConfirmChange.bind(this)}
// //               />

// //               <small className="danger-error">
// //                 {confirmErr ? confirmErr : ""}
// //               </small>
// //             </div>
// //             <button
// //               type="button"
// //               className="login-btn"
// //               onClick={this.submitRegister.bind(this)}
// //             >
// //               Register
// //             </button>
// //           </div>
// //         </div> */}
// //         ;
// //       </BrowserRouter>
// //     );
// //   }
// // }

// export default signUp;
