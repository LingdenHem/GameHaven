import React from "react";
import { useParams } from "react-router";

const GenreCollection = () => {
  const { genre } = useParams();
  console.log(genre);
  return <></>;
};

export default GenreCollection;
