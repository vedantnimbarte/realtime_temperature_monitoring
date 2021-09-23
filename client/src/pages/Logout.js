import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Lgout() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies([
    "temp_monitoring_auth",
  ]);
  useEffect(() => {
    removeCookie("user",{ path: '/' });
    navigate("/login", { replace: true });
  },);
  return <></>;
}
