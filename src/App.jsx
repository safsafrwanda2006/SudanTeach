import { useState } from "react";
import "./App.css";
import Courses from "./sections/Courses.jsx";
import SubmitCourse from "./sections/SubmitCourse.jsx";
import AboutPlatform from "./sections/AboutPlatform.jsx";
import Footer from "./sections/Footer.jsx";
function App() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="page-container"
      onClick={(e)=>{
        e.stopPropagation();
        setMenu(false);
      }}
      >
        <header>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenu((prev) => !prev);
            }}
            
            className="menu-btn"
          >
            <img src="/icons/square (1).png" alt="" />
          </button>
          <a href="/" className="sudan-teach-logo">
            <img src="/icons/logo.png" alt="" />
            <h3>
              <span className="s">S</span>
              <span className="ud">ud</span>
              <span className="an">an</span>
              Teach
            </h3>
          </a>
          <div className="header-btns">
            <a href="/">
              <b>الرئيسية</b>
            </a>
            <a href="#courses">
              <b>الكورسات</b>
            </a>
            <a href="#about">
              <b>عن المنصة</b>
            </a>
            <a href="#contact">
              <b>تواصل معنا</b>
            </a>
          </div>
        </header>
        {menu && (
          <div className="menu"
          onClick={(e)=>{
            e.stopPropagation();
          }}
          >
            <a href="/" className="menu-btns">
              <b>الرئيسية</b>
            </a>
            <a href="#courses" className="menu-btns">
              <b>الكورسات</b>
            </a>
            <a href="#about" className="menu-btns">
              <b>عن المنصة</b>
            </a>
            <a href="#contact" className="menu-btns">
              <b>تواصل معنا</b>
            </a>

            <a href="#course" className="primary">ابدأ التعلم الآن</a>
          </div>
        )}
        <section className="hero">
          <div className="items">
            <div className="join">
              <div className="imgages">
                <img src="/images/p1.png" alt="" />
                <img src="/images/p2.png" alt="" />
                <img src="/images/p3.jpg" alt="" />
              </div>
              <p>
                <span>SudanTeach انضم إلى أكثر من 1000 طالب يتعلمون في </span>
              </p>
            </div>
            <h1>تعلّم بوضوح من خلال كورسات تفاعلية مباشرة</h1>
            <p dir="rtl">
              <b>
                في SudanTeach نقدّم للطلاب السودانيين كورسات مباشرة وتفاعلية
                باللغة العربية، حيث يتعلّم الطالب مع المدرس في حصص حية عبر
                Google Meet أو Zoom مع إمكانية طرح الأسئلة والتفاعل المباشر
                أثناء الشرح. كما نقدّم دورات في مجالات متعددة مثل البرمجة،
                المواد الأكاديمية، وتطوير المهارات والمعرفة.
              </b>
            </p>
            <div className="hero-btns">
              <a href="#courses" className="primary">ابدأ التعلم الآن</a>
              <a href="#contact" className="secondary">اضافة كورس/دورة</a>
            </div>
          </div>
          <div className="social-proof">
            {" "}
            <div className="numbers">
              <p>طالب يتعلمون معنا</p>
              <h3>1000+</h3>
            </div>
            <div className="line"></div>
            <div className="numbers">
              <p>درس تفاعلي مباشر</p>
              <h3>20+</h3>
            </div>
             <div className="line"></div>
            <div className="numbers">
              <p>مدرسين متخصصين</p>
              <h3>10+</h3>
            </div>
             <div className="line"></div>
            <div className="numbers">
              <p>رضا الطلاب</p>
              <h3>95%</h3>
            </div>
          </div>
        </section>
        <Courses />
        <AboutPlatform/>
        <SubmitCourse/>
        <Footer/>
      </div>
    </>
  );
}

export default App;
