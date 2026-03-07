import React from "react";
import "./aboutPlatform.css";

function AboutPlatform() {
  return (
    <section className="about-platform" id="about">
      
      <div className="about-header">
        <h1>عن منصة SudanTeach</h1>
        <p>
          SudanTeach هي منصة تعليمية تهدف إلى ربط الطلاب بالمدرسين والدورات
          التعليمية في مكان واحد، مما يسهل الوصول إلى المعرفة والتعلم بطريقة
          مرنة وسهلة.
        </p>
      </div>

      <div className="about-grid">

        <div className="about-card">
          <h3>🎯 هدف المنصة</h3>
          <p>
            تسعى المنصة إلى توفير بيئة تعليمية حديثة تمكن الطلاب من العثور
            على الدورات المناسبة لهم بسهولة، كما تساعد المدرسين على نشر
            دوراتهم والوصول إلى عدد أكبر من الطلاب.
          </p>
        </div>

        <div className="about-card">
          <h3>📚 ماذا تقدم المنصة؟</h3>
          <p>
            توفر المنصة دورات تعليمية في مجالات متعددة مثل التقنية والمهارات
            والأكاديميات، مع معلومات واضحة عن كل دورة مثل المدرس والسعر
            وطريقة الحصة وعدد الدروس.
          </p>
        </div>

        <div className="about-card">
          <h3>🌍 التعلم للجميع</h3>
          <p>
            نؤمن أن التعليم يجب أن يكون متاحاً للجميع، لذلك نسعى إلى جمع أفضل
            الدورات والمدرسين في منصة واحدة تساعد الطلاب على تطوير مهاراتهم
            بسهولة.
          </p>
        </div>

      </div>

      {/* Testimonials */}

      <div className="testimonials-section">

        <h2>آراء المستخدمين</h2>

        <div className="testimonials-grid">

          <div className="testimonial-card">
            <p>
              "منصة رائعة ساعدتني في العثور على دورة برمجة بسهولة،
              المعلومات واضحة والتواصل مع المدرس كان سريع."
            </p>
            <h4>محمد أحمد</h4>
            <span>طالب</span>
          </div>

          <div className="testimonial-card">
            <p>
              "أفضل ما في المنصة هو سهولة عرض الدورات،
              استطعت نشر دورتي والوصول إلى طلاب جدد."
            </p>
            <h4>سارة خالد</h4>
            <span>مدرسة</span>
          </div>

          <div className="testimonial-card">
            <p>
              "فكرة المنصة ممتازة خصوصاً للطلاب الذين يبحثون عن دورات
              في مجالات مختلفة."
            </p>
            <h4>عبدالله حسن</h4>
            <span>متعلم</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutPlatform;