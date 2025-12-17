import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import AddPost from './components/AddPost';
import UpdatePost from './components/UpdatePost';
import Footer from './components/Footer';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavigationBar />
            <div style={{ marginTop: '1rem', flex: 1 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Posts />} />
                  <Route path="/posts/:id" element={<PostDetails />} />
                  <Route path="/add" element={<AddPost />} />
                  <Route path="/edit/:id" element={<UpdatePost />} />
                </Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
