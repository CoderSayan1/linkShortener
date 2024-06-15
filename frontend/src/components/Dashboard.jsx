import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { serverUrl } from "../helpers/Constants";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const session = window.localStorage.getItem("id");
  const name = window.localStorage.getItem("name");
  const navigator = useNavigate();
  const fetchData = async () => {
    const response = await axios.get(`${serverUrl}/shortUrl/id/${session}`);
    setData(response.data);
  };

  useEffect(() => {
    if (!session) {
      navigator("/login");
    } else {
      fetchData();
    }
  }, [data]);

  return (
    <div className="">
      <div className="w-3/4 mx-auto mt-10">
        <h1 className="text-center text-3xl font-bold my-8">Welcome to Your Dashboard, {name}!</h1>
        <div className="overflow-x-auto">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th scope="col">Original Url</th>
                <th scope="col">Short Url</th>
                <th scope="col">Total Clicks</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Link
                      to={item.originalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-blue-600"
                    >
                      {item.originalUrl}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`${serverUrl}/shortUrl/${item.shortUrl}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-blue-600"
                    >
                      {item.shortUrl}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={item.clicks}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {item.clicks}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
