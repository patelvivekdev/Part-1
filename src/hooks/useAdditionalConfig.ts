import { useEffect, useState } from "react";
import { FetchDataResponse } from "../Configurator/types";
import axios from "axios";

export const useAdditionalConfig = (configId: string) => {
  const [data, setData] = useState<FetchDataResponse>();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const response = await axios.get<FetchDataResponse>(
        //   `/api/configurations/${configId}`
        // );
        // setData(response.data);

        const data = {
          seatingOptions: [
            { value: "leather", title: "Leather" },
            {
              value: "fabric",
              title: "Fabric",
            },
          ],
        };

        setData(data);
      } catch (err) {
        setError(`Error fetching configuration for ${configId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};
