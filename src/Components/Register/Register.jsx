import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Register.module.css";

export default function Register() {
  let navigate = useNavigate();

  async function AuthApi(value) {
    try {
      let { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        value
      );
      console.log(data);

      toast.success("You have been registered", { position: "top-center" });
      navigate("/");
    } 
    
    catch (error) {
      
      if (error.response && error.response.data && error.response.data.msg) {
        // Custom backend error message
        toast.error(error.response.data.msg, { position: "top-center" });
      } 
      
      else if (error.response && error.response.status === 400 && error.response.data.message?.includes("email")) {
        // Fallback for duplicate email
        toast.error("This email already has an account", { position: "top-center" });
      } 
      
      else {
        toast.error("Registration failed. Please try again.", {position: "top-center",});
      }
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().min(4, "Name Should be big that 4").max(20, "Name Should be less than 20").required("Name is Required"),
    email: Yup.string().email("Email Invaild").required("Email is Required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,8}$/, "Password should start with Capital, include numbers, length 5 to 8").required("password is Required"),
    age: Yup.number().min(18, "Age should be at least 18").max(80, "Age should at most than 80").required("Age is Required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Phone is Invaild").required("Phone is required "),
  });

  let formikAuth = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => AuthApi(value),
  });

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.registerCard}>
          <div className={styles.registerHeader}>
            <h1 className={styles.registerTitle}>
              <i className="fas fa-user-plus me-2"></i>Join Our Community
            </h1>
            <p className={styles.registerSubtitle}>
              Stay connected with the latest and most popular news, all in one place
            </p>
          </div>

          <form onSubmit={formikAuth.handleSubmit} className={styles.registerForm}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="Name" className={styles.label}>
                  <i className="fas fa-user me-2"></i>Full Name
                </label>
                <input 
                  type="text" 
                  id="Name" 
                  name="name" 
                  placeholder="Enter your name"
                  value={formikAuth.values.name}
                  onChange={formikAuth.handleChange}
                  className={styles.input}
                />
                {formikAuth.errors.name && formikAuth.touched.name && (
                  <div className={styles.error}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {formikAuth.errors.name}
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="Email" className={styles.label}>
                  <i className="fas fa-envelope me-2"></i>Email Address
                </label>
                <input 
                  type="email" 
                  id="Email" 
                  name="email" 
                  placeholder="Enter your email"
                  value={formikAuth.values.email}
                  onChange={formikAuth.handleChange}
                  className={styles.input}
                />
                {formikAuth.errors.email && formikAuth.touched.email && (
                  <div className={styles.error}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {formikAuth.errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="Password" className={styles.label}>
                  <i className="fas fa-lock me-2"></i>Password
                </label>
                <input 
                  type="password" 
                  id="Password" 
                  name="password" 
                  placeholder="Enter your password"
                  value={formikAuth.values.password}
                  onChange={formikAuth.handleChange}
                  className={styles.input}
                />
                {formikAuth.errors.password && formikAuth.touched.password && (
                  <div className={styles.error}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {formikAuth.errors.password}
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="Age" className={styles.label}>
                  <i className="fas fa-birthday-cake me-2"></i>Age
                </label>
                <input
                  type="number" 
                  id="Age" 
                  name="age" 
                  placeholder="Enter your age"
                  value={formikAuth.values.age}
                  onChange={formikAuth.handleChange}
                  className={styles.input}
                />
                {formikAuth.errors.age && formikAuth.touched.age && (
                  <div className={styles.error}>
                    <i className="fas fa-exclamation-circle me-1"></i>
                    {formikAuth.errors.age}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="Phone" className={styles.label}>
                <i className="fas fa-phone me-2"></i>Phone Number
              </label>
              <input 
                type="tel" 
                id="Phone" 
                name="phone"
                value={formikAuth.values.phone}
                onChange={formikAuth.handleChange}
                placeholder="Enter your phone number"
                className={styles.input}
              />
              {formikAuth.errors.phone && formikAuth.touched.phone && (
                <div className={styles.error}>
                  <i className="fas fa-exclamation-circle me-1"></i>
                  {formikAuth.errors.phone}
                </div>
              )}
            </div>

            <button type="submit" className={styles.registerButton}>
              <i className="fas fa-user-plus me-2"></i>Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}