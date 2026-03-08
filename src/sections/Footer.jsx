import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="platform-footer">

      <div className="footer-container">

        {/* about */}
        <div className="footer-col">
          <a href="/" className="footer-logo">
          <h3>SudanTeach</h3>
          <img src="/icons/logo.png" alt="" />
          </a>
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

            <a href="https://x.com/sudanteach"
            className="social-icon"
            target="_blank"
            >
              <img src="/icons/x.png" alt="" />
            </a>

            <a href="https://www.facebook.com/profile.php?id=61582751366261" className="social-icon"
            target="_blank">
              <img src="/icons/facebook.png" alt="facebook" />
            </a>

            <a href="https://www.instagram.com/sudanteach" 
            className="social-icon"
            target="_blank"
            >
              <img src="/icons/instgram.png" alt="instagram" />
            </a>

            <a 
            href="https://www.youtube.com/@SudanTeach" 
            className="social-icon"
            target="_blank"
            >

              <img src="/icons/youtube.png" alt="youtube" />
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} SudanTeach - جميع الحقوق محفوظة
        </p>

        <p className="footer-dev">
          تم التطوير بواسطة <a 
          href="https://execode-two.vercel.app/"
          target="_blank"
          ><strong>ExeCode</strong></a>
          
        </p>

      </div>

    </footer>
  );
}

export default Footer;

