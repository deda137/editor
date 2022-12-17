import React, {
  useState,
  //useEffect
} from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e, name) => {
    //console.log(e)
    //console.log(name)
    setInputs({
      ...inputs,
      [name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const n = "milovanM@trr.com";
    const p = "slepac56.Mu!";
    if (inputs.username !== n && inputs.password !== p) {
      alert("pogresni podaci, pokusajte ponovo");
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: "25%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 300,
          border: '1px solid black',
          borderRadius: 5,
          padding: 50
        }}
      >
        <input
          name="username"
          type="text"
          placeholder="Korisnicko ime"
          style={{ marginBottom: 10 }}
          onChange={(e) => handleChange(e, "username")}
        />
        <input
          name="password"
          type="password"
          placeholder="Sifra"
          style={{ marginBottom: 10 }}
          onChange={(e) => handleChange(e, "password")}
        />
        <button onClick={handleSubmit}>Uloguj se</button>
      </div>
    </div>
  );
}
