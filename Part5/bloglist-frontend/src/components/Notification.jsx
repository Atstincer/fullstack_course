import { useSelector } from "react-redux";

const Notification = () => {
  const not = useSelector((state) => state.notification);
  //console.log('msg in Notification component', not)
  if (!not.msg) return null;
  switch (not.kind) {
    case "success":
      return <div className="success_message">{not.msg}</div>;
    case "error":
      return (
        <div className="error_message" data-testid="errormsg_div">
          {not.msg}
        </div>
      );
  }
};

export default Notification;
