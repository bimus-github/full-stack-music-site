import { loader } from "../assets";
const Loader = ({ title }) => (
  <div className=" w-full flex flex-col justify-center items-center">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h2 className="text-white font-bold text-2xl mt-2">
      {title || "Loading ..."}
    </h2>
  </div>
);

export default Loader;
