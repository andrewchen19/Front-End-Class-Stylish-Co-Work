import Carousel from "./Carousel";
import Products from "./Products";
import CustomerService from "../../components/CostomerService/CostomerService";
function Home() {
  return (
    <>
      <Carousel />
      <Products />
      {/* <CustomerService /> */}
    </>
  );
}

export default Home;
