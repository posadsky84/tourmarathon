import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>"Это будущая страница ошибки"!</h1>
      <p>По этому адресу ничего нет</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
