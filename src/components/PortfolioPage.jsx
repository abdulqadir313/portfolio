import React from "react";
import profileImage from "../assets/images/profile.png";

const AboutMe = () => {
  return (
    <section
      className="about-section bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white py-16 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 justify-center">
        <div className="content max-w-2xl">
          <h2 className="text-[#4ECCA3] text-2xl font-bold mb-6">WHO I AM?</h2>
          <p className="text-lg leading-relaxed">
  Hello! I’m <strong>Abdul Qadir</strong>, a <strong>Full Stack Developer</strong> with expertise in <strong>PHP, Laravel, WordPress, Node.js, Express.js, React.js, and MySQL/MongoDB</strong>. With over <strong>9 years of experience</strong>, I specialize in building web applications, scalable APIs, and intuitive user interfaces.
</p>

<p className="text-lg leading-relaxed">
  Throughout my career, I have worked on diverse projects, including Learning Management Systems (LMS) and Inventory Management Systems (IMS). My experience spans backend services, database optimization, and cloud infrastructure, particularly on <strong>AWS</strong>.
</p>

<p className="text-lg leading-relaxed">
  I have contributed to the development of robust platforms, focusing on efficient user management, performance optimization, and seamless integrations. My technology stack includes <strong>PHP, Laravel, WordPress, React.js, Node.js, MongoDB, MySQL, HTML, CSS, JavaScript, jQuery, and AWS</strong>.
</p>

<p className="text-lg leading-relaxed">
  Currently, I am enhancing my expertise in backend development to become a more proficient <strong>Full Stack Developer</strong>. My goal is to develop high-performance web applications and contribute to the developer community with innovative solutions.
</p>
        </div>
        <div className="image-container">
          <img
            src={profileImage}
            alt="Profile"
            className="w-72 h-72 rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
