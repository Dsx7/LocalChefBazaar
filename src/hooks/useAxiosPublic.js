import axios from "axios";

const axiosPublic = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://local-chef-bazaar-server-beta.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
