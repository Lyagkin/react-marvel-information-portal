import "./Spinner.scss";

import spinner from "../../resources/img/spinner.gif";

function Spinner({ upLoading }) {
  let styleUploading;

  styleUploading = upLoading ? "uploadingSpinner" : null;

  return (
    <div className="spinner">
      <img className={styleUploading} src={spinner} alt="spinner" />
    </div>
  );
}

export default Spinner;
