import { MdArrowOutward } from "react-icons/md";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // React icons v5 should have this
import "./styles/Contact.css";
import { useLanguage } from "../context/LanguageProvider";
import { ChangeEvent, FormEvent, useState } from "react";

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const content = {
    title: language === "th" ? "แบบฟอร์มติดต่อ" : "Contact Form",
    subtitle:
      language === "th"
        ? "ติดต่อผมได้โดยตรงที่ mprgame02@gmail.com หรือส่งข้อความผ่านฟอร์มนี้ได้เลย"
        : "Please contact me directly at mprgame02@gmail.com or drop your message here.",
    nameLabel: language === "th" ? "ชื่อ" : "Name",
    namePlaceholder: language === "th" ? "ชื่อของคุณ" : "Your Name",
    emailLabel: language === "th" ? "อีเมล" : "Email Address",
    emailPlaceholder:
      language === "th" ? "you@example.com" : "you@example.com",
    messageLabel: language === "th" ? "ข้อความ" : "Message",
    messagePlaceholder:
      language === "th"
        ? "เล่าเกี่ยวกับโปรเจกต์หรือสิ่งที่อยากคุยกับผมได้เลย"
        : "Tell me about your project.",
    disclaimer:
      language === "th"
        ? "เมื่อส่งครั้งแรก คุณอาจได้รับอีเมลยืนยันเพื่อเปิดใช้งานฟอร์ม"
        : "Your first submission may trigger a one-time activation email for the form.",
    success:
      language === "th"
        ? "ส่งคำขอแล้ว กรุณาเช็กอีเมลของผมสำหรับการยืนยันครั้งแรก และเช็กอีเมลของคุณหากต้องการให้ผมตอบกลับ"
        : "Submission sent. Please check my inbox for first-time activation and your email if you expect a reply from me.",
    error:
      language === "th"
        ? "ยังส่งไม่สำเร็จ ลองใหม่อีกครั้ง หรือส่งมาที่ mprgame02@gmail.com โดยตรง"
        : "Submission failed. Please try again, or email me directly at mprgame02@gmail.com.",
    button: language === "th" ? "ส่งข้อความ" : "Send Message",
    sending: language === "th" ? "กำลังส่ง..." : "Sending...",
    rights:
      language === "th" ? "สงวนลิขสิทธิ์ทั้งหมด" : "All rights reserved.",
    blog: language === "th" ? "บล็อก" : "Blog",
  };

  const contactEmail = "mprgame02@gmail.com";
  const subtitleParts = content.subtitle.split(contactEmail);

  const updateField =
    (field: keyof typeof formData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (status !== "idle") setStatus("idle");
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _subject:
            language === "th" ? "มีข้อความใหม่จาก Portfolio" : "New portfolio message",
          _template: "table",
          _captcha: "false",
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (_error) {
      setStatus("error");
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-split-layout">
        {/* Left Side: Form */}
        <div className="contact-form-side">
          <h2 className="contact-title">{content.title}</h2>
          <p className="contact-subtitle">
            {subtitleParts[0]}
            <strong>{contactEmail}</strong>
            {subtitleParts[1]}
          </p>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{content.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  placeholder={content.namePlaceholder}
                  value={formData.name}
                  onChange={updateField("name")}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{content.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  placeholder={content.emailPlaceholder}
                  value={formData.email}
                  onChange={updateField("email")}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">{content.messageLabel}</label>
              <textarea
                id="message"
                rows={6}
                placeholder={content.messagePlaceholder}
                value={formData.message}
                onChange={updateField("message")}
                required
              ></textarea>
              <p className="disclaimer">{content.disclaimer}</p>
            </div>

            {status === "success" && (
              <p className="form-success">{content.success}</p>
            )}
            {status === "error" && (
              <p className="form-error">{content.error}</p>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? content.sending : content.button}{" "}
              <MdArrowOutward className="btn-icon" />
            </button>
          </form>
        </div>
      </div>

      {/* Footer / Social Links */}
      <div className="contact-footer">
        <p className="copyright">&copy; {content.rights}</p>
        <div className="social-icons-footer">
          <a href="https://github.com/HaroonKasor" target="_blank" rel="noreferrer" data-cursor="disable"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/haroon-kasor-098885342/" target="_blank" rel="noreferrer" data-cursor="disable"><FaLinkedin /></a>
          <a href="https://x.com" target="_blank" rel="noreferrer" data-cursor="disable"><FaXTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" data-cursor="disable"><FaInstagram /></a>
        </div>
        <a href="#" className="blog-link" data-cursor="disable">{content.blog}</a>
      </div>
    </div>
  );
};

export default Contact;
