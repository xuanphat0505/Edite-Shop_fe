import ClipLoader from "react-spinners/ClipLoader";

function Loader({ loading, size, color = "var(--title-color)" }) {
  return (
    <ClipLoader
      color={color}
      cssOverride={{}}
      loading={loading}
      size={size}
      speedMultiplier={1}
    ></ClipLoader>
  );
}

export default Loader;
