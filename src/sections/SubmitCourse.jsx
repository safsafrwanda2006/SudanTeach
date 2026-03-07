import React, { useMemo, useState } from "react";
import "./submitCourse.css";

const API_URL =
  "https://script.google.com/macros/s/AKfycbyluFTekGJ-PSSYw1rnXfwrVTpi-OGbHLUwYYg7sMHBAJMVX1G_QoXvltKKLKmvcOphIw/exec";

const initialFormData = {
  name: "",
  category: "",
  teachedBy: "",
  shortDescription: "",
  fullDescription: "",
  startAt: "",
  finishedAt: "",
  price: "",
  status: "",
  meetingType: "Google Meet",
  lessonsCount: "",
  teacherEmail: "",
  teacherPhone: "",
};

const initialContactData = {
  fullName: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

function SubmitCourse() {
  const [activeTab, setActiveTab] = useState("contact");
  const [formData, setFormData] = useState(initialFormData);
  const [contactData, setContactData] = useState(initialContactData);

  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [showCourseConfirmation, setShowCourseConfirmation] = useState(false);
  const [lastSubmittedCourse, setLastSubmittedCourse] = useState(null);

  const isPaidCourse = useMemo(() => {
    const p = String(formData.price || "").trim().toLowerCase();
    return !(p === "free" || p === "مجاني" || p === "0");
  }, [formData.price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("يرجى اختيار ملف صورة فقط.");
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      setMessage("حجم الصورة كبير جداً. الحد الأقصى 4MB.");
      return;
    }

    setImageFile(file);
    setMessage("");

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setImagePreview(result);
        const base64Only = result.split(",")[1];
        setImageBase64(base64Only);
      }
    };

    reader.readAsDataURL(file);
  };

  const resetCourseForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
    setImageBase64("");
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setShowCourseConfirmation(false);

    if (!imageBase64 || !imageFile) {
      setMessage("يرجى رفع صورة الدورة.");
      setLoading(false);
      return;
    }

    const payload = {
      action: "submitCourse",
      id: Date.now(),
      name: formData.name.trim(),
      category: formData.category.trim(),
      teachedBy: formData.teachedBy.trim(),
      shortDescription: formData.shortDescription.trim(),
      fullDescription: formData.fullDescription.trim(),
      startAt: formData.startAt,
      finishedAt: formData.finishedAt,
      price: formData.price.trim(),
      status: formData.status.trim(),
      meetingType: formData.meetingType.trim(),
      lessonsCount: formData.lessonsCount,
      teacherEmail: formData.teacherEmail.trim(),
      teacherPhone: formData.teacherPhone.trim(),
      imageBase64,
      imageName: imageFile.name,
      imageMimeType: imageFile.type,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      console.log("Submit response:", text);

      const data = JSON.parse(text);

      if (data.success) {
        setMessage(
          "تم إرسال الدورة بنجاح. بقيت خطوة واحدة أخيرة: التأكيد عبر واتساب."
        );

        setLastSubmittedCourse({
          teachedBy: formData.teachedBy.trim(),
          teacherEmail: formData.teacherEmail.trim(),
          teacherPhone: formData.teacherPhone.trim(),
          name: formData.name.trim(),
          price: formData.price.trim(),
          isPaid: isPaidCourse,
        });

        setShowCourseConfirmation(true);
        resetCourseForm();
      } else {
        setMessage(data.message || "حدث خطأ أثناء إرسال الدورة.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setMessage("تعذر إرسال الدورة حالياً.");
    } finally {
      setLoading(false);
    }
  };

  const sendCourseConfirmation = () => {
    if (!lastSubmittedCourse) return;

    const whatsappText = lastSubmittedCourse.isPaid
      ? `مرحباً SudanTeach

خطوة أخيرة: تأكيد بيانات الدورة والدفع

اسم الأستاذ: ${lastSubmittedCourse.teachedBy}
البريد الإلكتروني: ${lastSubmittedCourse.teacherEmail}
رقم الهاتف: ${lastSubmittedCourse.teacherPhone}
اسم الدورة: ${lastSubmittedCourse.name}
السعر: ${lastSubmittedCourse.price}

أرسل هذا الطلب لتأكيد الدورة، مع إرفاق دليل الدفع في هذه المحادثة.`
      : `مرحباً SudanTeach

خطوة أخيرة: تأكيد بيانات الدورة

اسم الأستاذ: ${lastSubmittedCourse.teachedBy}
البريد الإلكتروني: ${lastSubmittedCourse.teacherEmail}
رقم الهاتف: ${lastSubmittedCourse.teacherPhone}
اسم الدورة: ${lastSubmittedCourse.name}

أرسل هذا الطلب لتأكيد الدورة ومراجعتها قبل النشر.`;

    const whatsappUrl = `https://wa.me/250794101251?text=${encodeURIComponent(
      whatsappText
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactMessage("");

    if (
      !contactData.fullName.trim() ||
      !contactData.phone.trim() ||
      !contactData.message.trim()
    ) {
      setContactMessage("يرجى ملء الاسم ورقم الهاتف والرسالة.");
      return;
    }

    const whatsappText = `مرحباً منصة SudanTeach

الاسم: ${contactData.fullName}
رقم الهاتف: ${contactData.phone}
البريد الإلكتروني: ${contactData.email}
الموضوع: ${contactData.subject}

الرسالة:
${contactData.message}`;

    const whatsappUrl = `https://wa.me/250794101251?text=${encodeURIComponent(
      whatsappText
    )}`;

    window.open(whatsappUrl, "_blank");

    setContactMessage("تم تجهيز الرسالة وفتح واتساب.");
    setContactData(initialContactData);
  };

  return (
    <section className="submit-course-section" id="contact">
      <div className="submit-head">
        <h1>تواصل معنا أو أضف دورة جديدة</h1>
        <p>
          يمكنك التواصل معنا مباشرة عبر واتساب، أو رفع دورة جديدة مع صورة من
          جهازك ليتم حفظها ومراجعتها قبل النشر.
        </p>
      </div>

      <div className="submit-tabs">
        <button
          type="button"
          className={activeTab === "contact" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("contact")}
        >
          تواصل معنا
        </button>

        <button
          type="button"
          className={activeTab === "upload" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("upload")}
        >
          رفع دورة
        </button>
      </div>

      {activeTab === "contact" && (
        <form className="submit-course-form" onSubmit={handleContactSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="الاسم الكامل"
            value={contactData.fullName}
            onChange={handleContactChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="رقم الهاتف"
            value={contactData.phone}
            onChange={handleContactChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={contactData.email}
            onChange={handleContactChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="موضوع الرسالة"
            value={contactData.subject}
            onChange={handleContactChange}
          />

          <textarea
            name="message"
            rows="6"
            placeholder="اكتب رسالتك هنا"
            value={contactData.message}
            onChange={handleContactChange}
            required
          />

          <button type="submit">إرسال عبر واتساب</button>

          {contactMessage && (
            <p className="submit-message">{contactMessage}</p>
          )}
        </form>
      )}

      {activeTab === "upload" && (
        <form className="submit-course-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="teachedBy"
            placeholder="اسم المدرس"
            value={formData.teachedBy}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="teacherEmail"
            placeholder="البريد الإلكتروني للمدرس"
            value={formData.teacherEmail}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="teacherPhone"
            placeholder="رقم هاتف المدرس"
            value={formData.teacherPhone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="اسم الدورة"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">اختر التصنيف</option>
            <option value="أكاديمية">أكاديمية</option>
            <option value="تقنية">تقنية</option>
            <option value="مهارات">مهارات</option>
          </select>

          <div className="file-upload-box">
            <label className="file-upload-label">صورة الدورة</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {imagePreview && (
            <div className="image-preview-box">
              <p className="image-preview-title">معاينة صورة الدورة</p>
              <img
                src={imagePreview}
                alt="Course preview"
                className="image-preview"
              />
            </div>
          )}

          <textarea
            name="shortDescription"
            rows="3"
            placeholder="وصف قصير للدورة"
            value={formData.shortDescription}
            onChange={handleChange}
            required
          />

          <textarea
            name="fullDescription"
            rows="5"
            placeholder="الوصف الكامل للدورة"
            value={formData.fullDescription}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="startAt"
            value={formData.startAt}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="finishedAt"
            value={formData.finishedAt}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="price"
            placeholder='السعر أو اكتب "Free"'
            value={formData.price}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">اختر الحالة</option>
            <option value="متاح الآن">متاح الآن</option>
            <option value="قريباً">قريباً</option>
            <option value="مغلق">مغلق</option>
          </select>

          <select
            name="meetingType"
            value={formData.meetingType}
            onChange={handleChange}
            required
          >
            <option value="Google Meet">Google Meet</option>
            <option value="Zoom">Zoom</option>
            <option value="Microsoft Teams">Microsoft Teams</option>
            <option value="Offline">Offline</option>
          </select>

          <input
            type="number"
            min="1"
            name="lessonsCount"
            placeholder="عدد الدروس"
            value={formData.lessonsCount}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "جاري الرفع..." : "إرسال الدورة"}
          </button>

          {message && <p className="submit-message">{message}</p>}

          {showCourseConfirmation && lastSubmittedCourse && (
            <div className="course-confirmation-box">
              <h3>
                {lastSubmittedCourse.isPaid
                  ? "خطوة واحدة أخيرة: تأكيد الدورة والدفع"
                  : "خطوة واحدة أخيرة: تأكيد الدورة"}
              </h3>

              <p>
                {lastSubmittedCourse.isPaid
                  ? "تم استلام بيانات الدورة. أرسل الآن طلب التأكيد مع دليل الدفع عبر واتساب لإكمال المراجعة."
                  : "تم استلام بيانات الدورة. أرسل الآن طلب التأكيد عبر واتساب لإكمال المراجعة."}
              </p>

              <button
                type="button"
                className="course-confirm-btn"
                onClick={sendCourseConfirmation}
              >
                {lastSubmittedCourse.isPaid
                  ? "إرسال تأكيد الدورة والدفع"
                  : "إرسال طلب التأكيد"}
              </button>
            </div>
          )}
        </form>
      )}
    </section>
  );
}

export default SubmitCourse;
