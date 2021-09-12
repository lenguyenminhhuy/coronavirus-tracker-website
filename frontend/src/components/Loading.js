import React from "react";
import { Button } from "@chakra-ui/react"
import BeatLoader from "react-spinners/BeatLoader";

const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Spinner bg="green" spacing={10}/>
      <Spinner bg="blue" spacing={10}/>
      <Spinner bg="red" spacing={10}/> */}
      <Button
        isLoading
        colorScheme="blue"
        spinner={<BeatLoader size={10} color="white" />}
      >
      Loading...
      </Button>
    </div>
  );
};

export default Loading;
