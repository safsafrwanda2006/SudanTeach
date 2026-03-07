import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="platform-footer">

      <div className="footer-container">

        {/* about */}

        <div className="footer-col">
          <h3>SudanTeach</h3>
          <p>
            منصة تعليمية تهدف إلى ربط الطلاب بالمدرسين والدورات التعليمية
            في مكان واحد، لتسهيل الوصول إلى المعرفة والتعلم بطريقة حديثة.
          </p>
        </div>

        {/* links */}

        <div className="footer-col">
          <h4>روابط سريعة</h4>
          <ul>
            <li><a href="#about">عن المنصة</a></li>
            <li><a href="#courses">الدورات</a></li>
            <li><a href="#submit-course">إضافة دورة</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
          </ul>
        </div>

        {/* categories */}

        <div className="footer-col">
          <h4>التصنيفات</h4>
          <ul>
            <li>الدورات التقنية</li>
            <li>الدورات الأكاديمية</li>
            <li>دورات المهارات</li>
          </ul>
        </div>

        {/* contact */}

        <div className="footer-col">
          <h4>تواصل معنا</h4>

          <p>📞 +250794101251</p>

          <p>✉️ sudanteach.platform@gmail.com</p>

          <div className="footer-social">

            <a href="#">Facebook</a>

            <a href="#">WhatsApp</a>

            <a href="#">Telegram</a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SudanTeach - جميع الحقوق محفوظة</p>
      </div>

    </footer>
  );
}

export default Footer;