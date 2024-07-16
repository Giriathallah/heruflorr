import FormComponent from "../../components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProductPage = () => {
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [jenis, setJenis] = useState("tanaman kecil");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("jenis", jenis);
    formData.append("harga", harga);
    formData.append("image", image);

    // console.log("Form Data:", formData);

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("Success add data");
      Swal.fire({
        title: "Success",
        text: "Berhasil Menambahkan Data",
        icon: "success",
        confirmButtonText: "oke",
      });
      // Reset form fields
      setNama("");
      setHarga(0);
      setJenis("tanaman kecil");
      setImage(null);
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Gagal Menambahkan Data",
        icon: "error",
        confirmButtonText: "oke",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-3/4 mx-auto flex flex-col items-center mt-20 px-10 py-5 justify-center">
        <h1 className="mb-10 text-2xl text-slate-900">Add Product</h1>
        <Link to={"/products"}> Go Back</Link>
        {loading ? (
          <div
            aria-label="Loading..."
            role="status"
            className="flex items-center space-x-2"
          >
            <svg
              className="h-20 w-20 animate-spin stroke-gray-500"
              viewBox="0 0 256 256"
            >
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="24"
              ></line>
            </svg>
            <span className="text-4xl font-medium text-gray-500">
              Loading...
            </span>
          </div>
        ) : (
          <FormComponent
            nama={nama}
            setNama={setNama}
            harga={harga}
            setHarga={setHarga}
            jenis={jenis}
            setJenis={setJenis}
            setImage={setImage}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </>
  );
};

export default AddProductPage;
