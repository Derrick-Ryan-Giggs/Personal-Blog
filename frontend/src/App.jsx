// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PostScreen from './screens/PostScreen';
import PostEditScreen from './screens/PostEditScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import MyPostsScreen from './screens/MyPostsScreen';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header user={user} setUser={setUser} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen setUser={setUser} />} />
            <Route path="/register" element={<RegisterScreen setUser={setUser} />} />
            <Route path="/profile" element={<ProfileScreen user={user} setUser={setUser} />} />
            <Route path="/post/:id" element={<PostScreen user={user} />} />
            <Route path="/post/:id/edit" element={<PostEditScreen user={user} />} />
            <Route path="/create-post" element={<CreatePostScreen user={user} />} />
            <Route path="/my-posts" element={<MyPostsScreen user={user} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;