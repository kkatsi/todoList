import { useEffect, useState } from "react";
import axios from "axios";

export default function useImageSearch() {
  const [error, setError] = useState(false);
  const [image, setImage] = useState([]);

  useEffect(() => {
    setError(false);
    axios({
      method: "GET",
      url: "https://api.unsplash.com/photos/random",
      params: {
        client_id: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
        topics: "6sMVjTLSkeQ", //nature images only
      },
    })
      .then((res) => {
        setImage(res.data.urls.regular);
      })
      .catch((e) => {
        setError(true);
      });
  }, []);

  return { image, error };
}
