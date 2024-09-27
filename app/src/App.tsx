import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import UploadMeasure from './pages/Measure/UploadMeasure'
import ListMeasure from './pages/Measure/ListMeasure'
import ConfirmMeasure from './pages/Measure/ConfirmMeasure'
import { LoadingProvider } from "./contexts/LoadingContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import Error from "./pages/Error";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/upload",
      element: <UploadMeasure />,
    },
    {
      path: "/list",
      element: <ListMeasure />,
    },
    {
      path: "/confirm",
      element: <ConfirmMeasure />,
    },
    {
      path: "/error",
      element: <Error />
    },
  ]);

  return (
    <LoadingProvider>
      <CustomerProvider>
        <ToastContainer 
          closeButton={false}
          hideProgressBar={true}
          autoClose={3000}
        />
        <RouterProvider router={router}/>
      </CustomerProvider>
    </LoadingProvider>
  );
}

export default App
