import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  Link,
} from "react-router-dom";
import { InputText } from "primereact/inputtext";

import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
//primeicon css
import "primeicons/primeicons.css";

import "primeflex/primeflex.css";

import { StyleClass } from "primereact/styleclass";

import Course from "./components/courses";
function App() {
  return (
    <div>
      <Course />
    </div>
  );
}

export default App;
