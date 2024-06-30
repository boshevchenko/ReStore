
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
// import { useStoreContext } from "../context/StoreContext";
// import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
// import { getCookie } from "../util/util";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {
  // const { setBasket } = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
    // const buyerId = getCookie('buyerId');
    // dispatch(fetchCurrentUser());

    // if (buyerId) {
    //   agent.Basket.get()
    //     .then(basket => dispatch(setBasket(basket))) //setBasket(basket))
    //     .catch(error => console.error(error))
    //     .finally(() => setLoading(false));
    // } else {
    //   setLoading(false);
    // }
  }, [initApp]) //[setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea'
          : '#121212'
      }
    }
  })

  const setMode = function () {
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message="Initializing app..." />
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={setMode} />
      <Container>
        <Outlet />
      </Container>

    </ThemeProvider>
  )
}

export default App
