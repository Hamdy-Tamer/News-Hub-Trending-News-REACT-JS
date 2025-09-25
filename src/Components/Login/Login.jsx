import {useFormik} from "formik";
import * as Yup from "yup"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from "./Login.module.css";  

export default function Login({saveLoginData}) {

let navigate = useNavigate();

async function AuthApi(values) {
  try {
    let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,values);

    // Success
    toast.success("Login successful!", { position: "top-center" });
    console.log(data);
    localStorage.setItem("usertoken", data.token);
    saveLoginData();
    navigate("/home");

  } 
  
  catch (error) 
  {
    if (error.response) {
      // Case 1: Backend gives a proper error message
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, { position: "top-center" });
      }
      // Case 2: User not found / hasn't registered
      else if (error.response.status === 404 ||error.response.data.message?.toLowerCase().includes("not found")) {
        toast.error("You haven't been registered", { position: "top-center" });
      }
      // Case 3: Wrong password
      else if (error.response.status === 400 &&error.response.data.message?.toLowerCase().includes("password")) {
        toast.error("Incorrect password", { position: "top-center" });
      }
      // Fallback
      else {
        toast.error("Login failed. Please try again.", { position: "top-center" });
      }
    } 
    
    else {
      toast.error("Network error. Try again later.", { position: "top-center" });
    }
  }
}

let validationSchema = Yup.object({
     email:Yup.string().email("Invalid Email Address").required("Email is Required"),
     password:Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/,"Password should start with Capital, include numbers, length 5 to 8").required("Password is Required"),
})

let formikAuth = useFormik({
initialValues:{
    email:"",
    password:"",
},
validationSchema:validationSchema,
onSubmit:(value)=>AuthApi(value)

    })

return (
  <div className={styles.loginPage}>
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>
            <i className="fas fa-user-circle me-2"></i>Login
          </h1>
          <p className={styles.loginSubtitle}>Welcome back! Please enter your details</p>
        </div>

        <form onSubmit={formikAuth.handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="Email" className={styles.label}>
              <i className="fas fa-envelope me-2"></i>Email Address
            </label>
            <input 
              type="email" 
              id='Email'  
              value={formikAuth.values.email}
              onChange={formikAuth.handleChange}
              name="email" 
              placeholder='Enter your email' 
              className={styles.input}
            />
            {formikAuth.errors.email && formikAuth.touched.email ? (
              <div className={styles.error}>
                <i className="fas fa-exclamation-circle me-1"></i>
                {formikAuth.errors.email}
              </div>
            ) : ""}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="Password" className={styles.label}>
              <i className="fas fa-lock me-2"></i>Password
            </label>
            <input 
              type="password" 
              id='Password' 
              value={formikAuth.values.password}
              onChange={formikAuth.handleChange}
              name="password" 
              placeholder='Enter your password' 
              className={styles.input}
            />
            {formikAuth.errors.password && formikAuth.touched.password ? (
              <div className={styles.error}>
                <i className="fas fa-exclamation-circle me-1"></i>
                {formikAuth.errors.password}
              </div>
            ) : ""}
          </div>

          <button type="submit" className={styles.loginButton}>
            <i className="fas fa-sign-in-alt me-2"></i>Login
          </button>
        </form>
      </div>
    </div>
  </div>
)
}