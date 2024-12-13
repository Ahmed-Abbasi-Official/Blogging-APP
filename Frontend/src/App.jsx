import Navbar from "./components/Navbar";
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {/* NAVBAR */}

      <Navbar />
      {/* <Footer/> */}
      {/* BREADCRUMB */}

      {/* INTRODUCTION */}
      {/* FEATURES POST */}
      {/* POST LIST */}
    </div>
  );
};

export default App;
