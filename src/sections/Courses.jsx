import React, { useEffect, useMemo, useState } from "react";
import "./courses.css";

const API_URL =
  "https://script.google.com/macros/s/AKfycbzzk5CAKb2RA28vmzNXkpyp5PhixjQsHZ3U7F-qixOK4aLQbMAbGVesnCwmLAoO8uXlGA/exec";

const fallbackImage =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <rect width="800" height="500" fill="#e2e8f0"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        fill="#64748b" font-size="32" font-family="Arial, sans-serif">
        SudanTeach Course
      </text>
    </svg>
  `);


const paymentMethods = {
  بنكك: {
    name: "بنكك",
    account: "0912345678",
    receiver: "Mustafa Khamis",
    image: "/payments/bankak.png",
  },
  فوري: {
    name: "فوري",
    account: "0912345678",
    receiver: "Mustafa Khamis",
    image: "/payments/fawry.png",
  },
  "موبايل موني": {
    name: "موبايل موني",
    account: "0912345678",
    receiver: "Mustafa Khamis",
    image: "/payments/momo.png",
  },
  MyCashi: {
    name: "MyCashi",
    account: "0912345678",
    receiver: "Mustafa Khamis",
    image: "/payments/mycashi.png",
  },
};

function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [registerData, setRegisterData] = useState({
    studentName: "",
    studentEmail: "",
    studentWhatsapp: "",
  });

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  useEffect(() => {
    fetch(`${API_URL}?action=getCourses`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCourses(data.data || []);
        } else {
          setError("فشل في جلب الدورات");
        }
      })
      .catch(() => {
        setError("حدث خطأ أثناء جلب الدورات");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "الكل") return courses;

    return courses.filter((course) => {
      const category = String(course.category || "").trim();
      return (
        category === selectedCategory ||
        category === selectedCategory.replace("دورات ", "")
      );
    });
  }, [selectedCategory, courses]);

  const getDriveImage = (imageId) => {
    if (!imageId) return "";
    return `https://drive.google.com/thumbnail?id=${imageId}&sz=w1200`;
  };

  const getCourseImage = (course) => {
    const coverImageUrl = String(course.coverImageUrl || "").trim();
    const coverImageId = String(course.coverImageId || "").trim();

    if (coverImageUrl && coverImageUrl.startsWith("http")) {
      return coverImageUrl;
    }

    if (coverImageId) {
      return getDriveImage(coverImageId);
    }

    return fallbackImage;
  };

  const formatDate = (value) => {
    if (!value) return "";
    const str = String(value).trim();
    if (!str) return "";

    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(str)) {
      return str;
    }

    const date = new Date(str);
    if (!isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return str;
  };

  const normalizePrice = (price) => String(price || "").trim().toLowerCase();

  const isFreeCourse = (price) => {
    const p = normalizePrice(price);
    return p === "free" || p === "مجاني" || p === "0";
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetRegisterForm = () => {
    setRegisterData({
      studentName: "",
      studentEmail: "",
      studentWhatsapp: "",
    });
    setRegisterMessage("");
    setSelectedPaymentMethod("");
    setShowPaymentOptions(false);
  };

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    resetRegisterForm();
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
    resetRegisterForm();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse) return;

    if (
      !registerData.studentName.trim() ||
      !registerData.studentEmail.trim() ||
      !registerData.studentWhatsapp.trim()
    ) {
      setRegisterMessage("يرجى ملء الاسم الكامل والإيميل ورقم الواتساب.");
      return;
    }

    const paidCourse = !isFreeCourse(selectedCourse.price);

    setRegisterLoading(true);
    setRegisterMessage("");

    const payload = {
      action: "registerStudent",
      id: Date.now(),
      courseId: selectedCourse.id || "",
      courseName: selectedCourse.name || "",
      teacherName: selectedCourse.teachedBy || "",
      studentName: registerData.studentName.trim(),
      studentEmail: registerData.studentEmail.trim(),
      studentWhatsapp: registerData.studentWhatsapp.trim(),
      price: selectedCourse.price || "",
      paymentMethod: paidCourse ? selectedPaymentMethod || "" : "Free",
      paymentStatus: paidCourse ? "Pending Payment" : "Not Required",
      meetingType: selectedCourse.meetingType || "",
      courseStatus: selectedCourse.status || "",
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      const data = JSON.parse(text);

      if (data.success) {
        if (paidCourse) {
          setRegisterMessage(
            "تم حفظ طلب التسجيل. الآن اختر وسيلة الدفع ثم أرسل تأكيد الدفع عبر واتساب."
          );
          setShowPaymentOptions(true);
        } else {
          setRegisterMessage(
            "تم التسجيل بنجاح. سيتم إضافتك إلى الميتينق أو القروب المناسب قريباً."
          );
        }
      } else {
        setRegisterMessage(data.message || "حدث خطأ أثناء التسجيل.");
      }
    } catch (error) {
      console.error(error);
      setRegisterMessage("تعذر إرسال التسجيل حالياً.");
    } finally {
      setRegisterLoading(false);
    }
  };

  const sendPaymentProof = () => {
    if (!selectedCourse) return;

    if (!selectedPaymentMethod) {
      setRegisterMessage("اختر طريقة الدفع أولاً.");
      return;
    }

    const method = paymentMethods[selectedPaymentMethod];

    const whatsappText = `مرحباً، دا تأكيد دفع لتسجيل كورس في SudanTeach

اسم الطالب: ${registerData.studentName}
الإيميل: ${registerData.studentEmail}
رقم الواتساب: ${registerData.studentWhatsapp}

اسم الكورس: ${selectedCourse.name}
المدرس: ${selectedCourse.teachedBy}
السعر: ${selectedCourse.price}
طريقة الدفع: ${selectedPaymentMethod}

الرجاء إرفاق صورة أو دليل الدفع في هذه المحادثة.`;

    const whatsappUrl = `https://wa.me/250794101251?text=${encodeURIComponent(
      whatsappText
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="courses-section" id="courses">
      <div className="courses-head">
        <h1>الدورات المتاحة</h1>
        <p>
          استكشف الدورات التفاعلية المتاحة وابدأ التعلّم مع مدرسين متخصصين عبر
          حصص مباشرة ومنظمة.
        </p>
      </div>

      <h3 className="classificationlogo">التصنيفات</h3>

      <div className="classification">
        <button
          className={selectedCategory === "دورات أكاديمية" ? "classifiy active" : "classifiy"}
          onClick={() => setSelectedCategory("دورات أكاديمية")}
        >
          <div className="class-line">
            <h4>دورات أكاديمية</h4>
            <div className="class-icon">
              <img src="/icons/academic.png" alt="Academic" />
            </div>
          </div>
        </button>

        <button
          className={selectedCategory === "دورات تقنية" ? "classifiy active" : "classifiy"}
          onClick={() => setSelectedCategory("دورات تقنية")}
        >
          <div className="class-line">
            <h4>دورات تقنية</h4>
            <div className="class-icon">
              <img src="/icons/tech.png" alt="Tech" />
            </div>
          </div>
        </button>

        <button
          className={selectedCategory === "دورات مهارات" ? "classifiy active" : "classifiy"}
          onClick={() => setSelectedCategory("دورات مهارات")}
        >
          <div className="class-line">
            <h4>دورات مهارات</h4>
            <div className="class-icon">
              <img src="/icons/skill.png" alt="Skills" />
            </div>
          </div>
        </button>

        <button
          className={selectedCategory === "الكل" ? "classifiy active" : "classifiy"}
          onClick={() => setSelectedCategory("الكل")}
        >
          <div className="class-line">
            <h4>الكل</h4>
            <div className="class-icon">
              <img src="/icons/all.png" alt="All" />
            </div>
          </div>
        </button>
      </div>

      {loading && <p className="empty-courses">جاري تحميل الدورات...</p>}
      {error && <p className="empty-courses">{error}</p>}

      {!loading && !error && (
        <div className="Courses">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((item) => {
              const free = isFreeCourse(item.price);

              return (
                <div className="course-card" id="course" key={item.id}>
                  <div className="course-img">
                    <img
                      src={getCourseImage(item)}
                      alt={item.name || "Course"}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                    />
                    <span className="status-badge">{item.status}</span>
                  </div>

                  <div className="content">
                    <div className="course-top-line">
                      <span className="course-category">{item.category}</span>
                      <span className={free ? "price-tag free" : "price-tag paid"}>
                        {free ? "مجاني" : item.price}
                      </span>
                    </div>

                    <h3>{item.name}</h3>
                    <p className="teacher">يقدمه: {item.teachedBy}</p>
                    <p className="short-desc">{item.shortDescription}</p>

                    <div className="course-meta">
                      <span>من: {formatDate(item.startAt)}</span>
                      <span>إلى: {formatDate(item.finishedAt)}</span>
                    </div>

                    <div className="course-meta second">
                      <span>{item.lessonsCount} دروس</span>
                      <span>{item.meetingType}</span>
                    </div>

                    <div className="course-actions">
                      <button className="details-btn" onClick={() => openCourseModal(item)}>
                        سجّل الآن
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="empty-courses">لا توجد دورات متاحة في هذا التصنيف حالياً.</p>
          )}
        </div>
      )}

      {selectedCourse && (
        <div className="modal-overlay" onClick={closeCourseModal}>
          <div className="course-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeCourseModal}>
              ×
            </button>

            <div className="modal-image">
              <img
                src={getCourseImage(selectedCourse)}
                alt={selectedCourse.name || "Course"}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = fallbackImage;
                }}
              />
            </div>

            <div className="modal-content">
              <div className="modal-top">
                <span className="modal-category">{selectedCourse.category}</span>
                <span
                  className={
                    isFreeCourse(selectedCourse.price) ? "price-tag free" : "price-tag paid"
                  }
                >
                  {isFreeCourse(selectedCourse.price) ? "مجاني" : selectedCourse.price}
                </span>
              </div>

              <h2>{selectedCourse.name}</h2>
              <p className="modal-teacher">يقدمه: {selectedCourse.teachedBy}</p>
              <p className="modal-description">{selectedCourse.fullDescription}</p>

              <div className="modal-meta">
                <span>تاريخ البداية: {formatDate(selectedCourse.startAt)}</span>
                <span>تاريخ النهاية: {formatDate(selectedCourse.finishedAt)}</span>
                <span>عدد الدروس: {selectedCourse.lessonsCount}</span>
                <span>طريقة الحصة: {selectedCourse.meetingType}</span>
                <span>الحالة: {selectedCourse.status}</span>
              </div>

              <form className="register-form" onSubmit={handleRegisterSubmit}>
                <h3>نموذج التسجيل في الدورة</h3>

                <input
                  type="text"
                  name="studentName"
                  placeholder="الاسم الكامل"
                  value={registerData.studentName}
                  onChange={handleRegisterChange}
                  required
                />

                <input
                  type="email"
                  name="studentEmail"
                  placeholder="البريد الإلكتروني"
                  value={registerData.studentEmail}
                  onChange={handleRegisterChange}
                  required
                />

                <input
                  type="tel"
                  name="studentWhatsapp"
                  placeholder="رقم الواتساب"
                  value={registerData.studentWhatsapp}
                  onChange={handleRegisterChange}
                  required
                />

                <button type="submit" className="submit-register" disabled={registerLoading}>
                  {registerLoading ? "جاري التسجيل..." : "تأكيد التسجيل"}
                </button>

                {registerMessage && (
                  <p className="register-message">{registerMessage}</p>
                )}
              </form>

              {!isFreeCourse(selectedCourse.price) && showPaymentOptions && (
                <div className="payment-section">
                  <button
                    type="button"
                    className="payment-toggle-btn"
                    onClick={() =>
                      setShowPaymentOptions((prev) => !prev)
                    }
                  >
                    {showPaymentOptions ? "إخفاء خيارات الدفع" : "عرض خيارات الدفع"}
                  </button>

                  <div className="payment-options">
                    {Object.keys(paymentMethods).map((methodKey) => {
                      const method = paymentMethods[methodKey];
                      return (
                        <div
                          key={methodKey}
                          className={
                            selectedPaymentMethod === methodKey
                              ? "payment-card active"
                              : "payment-card"
                          }
                          onClick={() => setSelectedPaymentMethod(methodKey)}
                        >
                          <div className="payment-card-top">
                            <img
                              src={method.image}
                              alt={method.name}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            <h4>{method.name}</h4>
                          </div>
                          <p>اسم المستلم: {method.receiver}</p>
                          <p>الرقم / الحساب: {method.account}</p>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="payment-proof-btn"
                    onClick={sendPaymentProof}
                  >
                    إرسال تأكيد أو دليل الدفع
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Courses;


