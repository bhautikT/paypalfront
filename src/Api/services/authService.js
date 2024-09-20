import AxiosDefaultSetting from "../AxiosDefault";

//fetch data service
const fetchData = async () => {
  try {
    // Example GET request
    const response = await AxiosDefaultSetting({
      method: "GET",
      url: "/users", // Example endpoint
    });
    console.log(response.data); // Process response data here
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { fetchData };
