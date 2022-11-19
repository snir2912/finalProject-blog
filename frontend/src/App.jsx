import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddNewCategory from "./components/categories/AddNewCategory";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Users/login/Login";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/categories/CategoryList";
import UpdateCategory from "./components/categories/UpdateCategory";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectedRoute";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <AdminRoute
          exact
          path='/update-category/:id'
          component={UpdateCategory}
        />
        <AdminRoute exact path='/add-category' component={AddNewCategory} />
        <AdminRoute exact path='/category-list' component={CategoryList} />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
