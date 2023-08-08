import "./Page404.scss";

import zombie from "../../resources/img/zombie.jpg";

function Page404() {
  return (
    <div className="page404">
      <img src={zombie} alt="errorPage" />
      <div className="error-info">
        <h3>404 PAGE NOT FOUND</h3>
        <p>
          Check that you typed the address correctly, go back to your previous page or try using our site search to find
          something specific.
        </p>
      </div>
    </div>
  );
}

export default Page404;
