import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import notification_reducer from "./reducers/notification_reducer";
import blog_reducer from "./reducers/blogs_reducer";
import user_reducer from "./reducers/user_reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    notification: notification_reducer,
    blogs: blog_reducer,
    user: user_reducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
