import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axiosInstance";
import "../Styles/register.css";
import { toast } from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axiosInstance.post("./api/users/register", {
        name,
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Successfull!");
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
    }
  };

 
  return (
    <>

      <div>
        <form action="" onSubmit={registerUser}>
          <label htmlFor="">Username</label>
          <input
            type="text"
            name=""
            id=""
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            name=""
            id=""
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            name=""
            id=""
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type="submit"> Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
