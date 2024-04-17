import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Stats from "./pages/Stats/Stats";
import {useEffect} from "react";
import {useStore} from "./store";
import Settings from "./pages/Settings/Settings";

function App() {
  const getToday = useStore(state => state.getToday)
  const theme = useStore(state => state.theme)
  useEffect(() => {
    getToday()
  }, [getToday])

  const isDarkTheme = theme === 'light'

  return (<div className={`App ${isDarkTheme ? 'lightTheme' : 'darkTheme'}`}>
    <Header/>
    <Layout>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/stats'} element={<Stats/>}/>
        <Route path={'/settings'} element={<Settings/>}/>
      </Routes>
    </Layout>
  </div>)
}

export default App
