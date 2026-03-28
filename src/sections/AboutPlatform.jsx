import React from "react";
import "./AboutPlatform.css";

function AboutPlatform() {
  return (
    <section className="about-platform" id="about">

      {/* HEADER */}
      <div className="about-header">
        <h1>
          عن منصة SudanTeach
          <span className="title-en">About SudanTeach</span>
        </h1>

        <p className="about-text">
          <span className="ar">
            SudanTeach هي منصة تعليمية حديثة تقدم تجربة تعلم تفاعلية من خلال
            كورسات مباشرة (Live) تربط بين الطلاب والمدرسين في بيئة تعليمية حقيقية.
          </span>

          <span className="en">
            SudanTeach is a modern e-learning platform that connects students
            with instructors through live, interactive courses — making learning
            more engaging, practical, and effective.
          </span>
        </p>
      </div>

      {/* CARDS */}
      <div className="about-grid">

        <div className="about-card">
          <h3>
            🎯 هدف المنصة
            <span>Our Mission</span>
          </h3>

          <p className="about-text">
            <span className="ar">
              نسعى إلى تحويل تجربة التعلم من مجرد مشاهدة فيديوهات إلى تجربة
              تفاعلية حقيقية، حيث يستطيع الطالب الفهم والتطبيق مباشرة.
            </span>

            <span className="en">
              Our mission is to transform online learning from passive video
              watching into a real interactive experience where students can ask,
              engage, and learn effectively.
            </span>
          </p>
        </div>

        <div className="about-card">
          <h3>
            🚀 ماذا يميزنا
            <span>What Makes Us Different</span>
          </h3>

          <p className="about-text">
            <span className="ar">
              في SudanTeach، لا تكتفي بالمشاهدة فقط — بل تتعلم من خلال حصص مباشرة
              يمكنك فيها طرح الأسئلة والتفاعل مع المدرس والطلاب.
            </span>

            <span className="en">
              Unlike traditional platforms, SudanTeach focuses on live sessions
              where students can interact, ask questions, and learn in real-time.
            </span>
          </p>
        </div>

        <div className="about-card">
          <h3>
            📚 ماذا نقدم
            <span>What We Offer</span>
          </h3>

          <p className="about-text">
            <span className="ar">
              نقدم كورسات في مجالات متعددة مثل البرمجة، اللغة الإنجليزية،
              التصميم، والتسويق، مع تفاصيل واضحة لكل دورة.
            </span>

            <span className="en">
              We offer courses in programming, English, design, marketing, and
              more — with clear details about instructors, pricing, schedules,
              and course structure.
            </span>
          </p>
        </div>

      </div>

      {/* TESTIMONIALS */}
      <div className="testimonials-section">
        <h2>
          آراء المستخدمين
          <span className="title-en">Testimonials</span>
        </h2>

        <div className="testimonials-grid">

          <div className="testimonial-card">
            <p className="about-text">
              <span className="ar">
                "منصة رائعة للتعلم التفاعلي، ساعدتني أفهم البرمجة بشكل أفضل."
              </span>
              <span className="en">
                "Great platform for interactive learning. It helped me understand coding better."
              </span>
            </p>
            <h4>محمد أحمد</h4>
            <span>Student</span>
          </div>

          <div className="testimonial-card">
            <p className="about-text">
              <span className="ar">
                "سهلت عليّ نشر كورسي والوصول لطلاب جدد بسهولة."
              </span>
              <span className="en">
                "It made it easy for me to publish my course and reach more students."
              </span>
            </p>
            <h4>سارة خالد</h4>
            <span>Instructor</span>
          </div>

          <div className="testimonial-card">
            <p className="about-text">
              <span className="ar">
                "فكرة الحصص المباشرة ممتازة وتعطي تجربة تعليم حقيقية."
              </span>
              <span className="en">
                "Live classes make learning more real and engaging."
              </span>
            </p>
            <h4>عبدالله حسن</h4>
            <span>Learner</span>
          </div>

        </div>
      </div>

    </section>
  );
}

export default AboutPlatform;
