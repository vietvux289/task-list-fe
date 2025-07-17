import { Link, useRouteError } from "react-router-dom";
import { Button, Result } from "antd";
import "../styles/page.error.css"

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <Result
        status="500"
        title="Oops!"
        subTitle={error.statusText || error.message}
        extra={
          <Button type="primary">
            <Link to="/">
              <span>Back to homepage</span>
            </Link>
          </Button>
        }
      />
    </div>
  );
}
