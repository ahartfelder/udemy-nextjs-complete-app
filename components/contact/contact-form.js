import { useEffect, useState } from "react";
import styles from "./contact-form.module.css";
import Notification from "../ui/notification";

export default function ContactForm() {
  const [formData, setFormData] = useState({ email: "", name: "", text: "" });
  const [notification, setNotification] = useState({
    status: null,
    title: null,
    message: null,
  });

  useEffect(() => {
    if (notification.status === "success" || notification.status === "error") {
      const timer = setTimeout(() => {
        setNotification({
          status: null,
          title: null,
          message: null,
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  async function submitFormHandler(e) {
    e.preventDefault();

    setNotification({
      status: "pending",
      title: "Pending",
      message: "Your message is on its way!",
    });

    try {
      await sendFormData(formData);

      setNotification({
        status: "success",
        title: "Success!",
        message: "Your message has been submitted!",
      });
    } catch (error) {
      setNotification({
        status: "error",
        title: "Error!",
        message: error.message || "Something went wrong!",
      });
    }
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={submitFormHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your message</label>
          <textarea
            id="message"
            rows="5"
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification.status && <Notification notification={notification} />}
    </section>
  );
}

async function sendFormData(data) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong!");
  }

  return result;
}
