import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EffectsDemoCustomHook from "./hook/useState/component/EffectsDemoCustomHook";
import EffectsDemoTwoStatesWithDependency from "./hook/useState/component/EffectsDemoTwoStatesWithDependency";
import EffectsDemoTwoStatesWithEmptyDependencyArray from "./hook/useState/component/EffectsDemoTwoStatesWithEmptyDependencyArray";
import RegisterForm from "./form/register/component/RegisterForm";
import UnregisterForm from "./form/unregister/component/UnregisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/effects-demo-two-states-with-dependency"
          element={<EffectsDemoTwoStatesWithDependency />}
        />
        <Route
          path="/effects-demo-two-states-with-empty-dependency-array"
          element={<EffectsDemoTwoStatesWithEmptyDependencyArray />}
        />
        <Route
          path="/effects-demo-custom-hook"
          element={<EffectsDemoCustomHook />}
        />
        <Route path="/register-form" element={<RegisterForm />} />
        <Route path="/unregister-form" element={<UnregisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
