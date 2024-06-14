import Contacts from "../components/Contacts"
import OurStory from "../components/OurStory"
import OurService from "../components/OurService"
import FashionView from "../components/FashionView";
import Blog from "../components/Blog";
import Shop from "../components/Shop";
import "./App.css";
import backgroundImage from "../src/assets/BackForm.jpeg";
import Footer from "../components/Footer";

  import {
    BrowserRouter as Router,
    Route, Routes
  } from "react-router-dom";

  function App() {
    return (
      <>

          {/* <Router> */}
            <div className="app-container">
          <FashionView></FashionView>   
      <Routes>
        <Route index element={<FashionView  />} />
     
        <Route path="*" element={<p>404 Page not found</p>} />
        <Route path="/ourservice" element={<OurService />} />
        <Route path="/ourstory" element={<OurStory />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contacts" element={<Contacts  backgroundImage={backgroundImage}/>}/>
        <Route path="/blog" element={<Blog />}/>
      </Routes>
    
      <Footer></Footer>
      </div>
    {/* </Router> */}

      </>
    );
  }

  export default App;
