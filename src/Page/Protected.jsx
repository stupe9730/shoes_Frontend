import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ Compo }) => {
  const { auth } = useSelector((state) => state.user);
  console.log(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/");
    }
  }, [auth]);

  return <Compo />;
};

export default Protected;
