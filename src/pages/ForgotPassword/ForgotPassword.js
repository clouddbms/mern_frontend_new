import React, { useState } from "react";
import styles from "./ForgotPassword.module.css"; // Import your CSS file
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { backendUrl } from "../../backendUrl";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [storeotp, setStoreotp] = useState("");
  const [type, setType] = useState("");
  const handleSendOtp = async () => {
    try {
      
      axios
        .post(backendUrl+"/auth/forgotpassword", { email })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          if (data.success) {
            setStoreotp(data.data);
            setType(data.type);
            setStep(2);
          } else {
            toast.error(data.data);
          }
        });
        setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const specialSymbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-]/;
      const digitRegex = /\d/;
      const letterRegex = /[a-zA-Z]/;

      if (
        !specialSymbolRegex.test(newPassword) ||
        !digitRegex.test(newPassword) ||
        !letterRegex.test(newPassword)
      ) {
        toast.error(
          "password must include numbers letters and special characters"
        );
      }
      if (storeotp !== otp) {
        toast.error("wrong otp entered");
      } else if (storeotp === otp) {
        axios
          .post(backendUrl+"/auth/passwordchange", {
            email,
            newPassword,
            type,
          })
          .then((res) => res.data)
          .then((data) => {
            if (data.success) {
              toast.success("password reset successfull");
              setStep(3);
            } else {
              toast.error("could not reset password");
            }
          });
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={styles["forgot-password-container"]}>
      {step === 1 && (
        <div className={styles["step-container"]}>
          <h2>Forgot Password</h2>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendOtp} disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      {step === 2 && (
        <div className={styles["step-container"]}>
          <h2>Enter OTP and New Password</h2>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={handleResetPassword}
            disabled={loading || newPassword !== confirmPassword}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
          {error && <p className="error-message">{error}</p>}
        </div>
      )}

      {step === 3 && (
        <div className={styles["step-container"]}>
          <h2>Password Reset Successful!</h2>
          <p>Your password has been successfully reset.</p>
          <Link to="/login">Go to Login</Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
