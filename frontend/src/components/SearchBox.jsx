import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../helpers/Constants";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function SearchBox() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleChange = (event) => {
    setOriginalUrl(event.target.value);
  };
  const session = window.localStorage.getItem("id");
  const name = window.localStorage.getItem("name");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/shortUrl`, {
        originalUrl: originalUrl,
        userid: session,
      });
      if (response.data.status===404) {
        toast.error(response.data.message);
      }
      else {
        setShortUrl(response.data);
        toast.success("Link created");
        setOriginalUrl("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <h1 className="text-center text-3xl font-bold pt-10">
        Link Shortner Website
      </h1>
      {session && <h1 className="text-center text-xl font-bold pb-10">Welcome {name}</h1>}
      <div className="border-2 border-zinc-600 bg-red-300 rounded-xl pb-20 shadow-lg w-full md:w-1/2 mx-auto">
        <div className="max-w-md mx-auto pb-12 pt-10 text-3xl font-semibold text-center">
          <h1>Enter your link</h1>
        </div>
        <div className="pb-10">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="url"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border outline-none border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Please enter a valid URL"
                onChange={handleChange}
                value={originalUrl}
                pattern="https?://.+"
               
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-3.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
        {shortUrl && (
          <div className="max-w-md mx-auto flex items-center">
            <p className="text-lg font-semibold text-center">
              Short URL created :
            </p>
            <Link
              to={`${serverUrl}/shortUrl/${shortUrl.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 text-center flex items-center text-blue-500 font-semibold text-xl underline"
            >
              {shortUrl.shortUrl}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
