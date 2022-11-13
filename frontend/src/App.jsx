import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddNewCategory from "./components/categories/AddNewCategory";

import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Users/login/Login";
import Register from "./components/Users/Register/Register";

function App() {
  return (
    <BrowserRouter className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/add-category' component={AddNewCategory} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
