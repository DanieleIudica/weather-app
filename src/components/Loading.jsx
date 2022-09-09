import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="text-center my-3 mt-5">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
