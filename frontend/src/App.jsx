import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddNewCategory from "./components/Categories/AddNewCategory";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navigation/Navbar";
import Login from "./components/Users/Login/Login";
import Register from "./components/Users/Register/Register";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import PrivateProtectRoute from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import AdminRoute from "./components/Navigation/ProtectedRoutes/AdminRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/Users/Profile/Profile";

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
        <PrivateProtectRoute exact path='/create-post' component={CreatePost} />
        <PrivateProtectRoute
          exact
          path='/update-post/:id'
          component={UpdatePost}
        />
        <PrivateProtectRoute
          exact
          path='/update-comment/:id'
          component={UpdateComment}
        />
        <PrivateProtectRoute exact path='/profile/:id' component={Profile} />
        <AdminRoute exact path='/add-category' component={AddNewCategory} />
        <AdminRoute exact path='/category-list' component={CategoryList} />
        <Route exact path='/posts' component={PostsList} />
        <Route exact path='/posts/:id' component={PostDetails} />
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
