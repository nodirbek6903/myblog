import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  GraduationCap,
  Award,
} from "lucide-react";
import {fetchAbout} from "../../redux/aboutSlice"
import { useSelector,useDispatch } from 'react-redux';

const About = () => {

  const {about,loading} = useSelector(state => state.about)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAbout())
  },[dispatch])

  console.log("About data:",about)

    if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16" id="about">
      {/* Title */}
      <motion.h2
        className="text-4xl font-bold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {about?.title}
      </motion.h2>

      {/* Main content */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Profile Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <img
            src={about?.image}
            alt="Profile"
            className="w-64 h-64 object-cover rounded-2xl shadow-lg border-4 border-gray-200"
          />
        </motion.div>

        {/* Info & Description */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            {about?.info?.fullName}
          </h3>
          <p className="text-gray-600 mb-6">{about?.description}</p>

          {/* Personal info */}
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Role:</span> {about?.info.role}
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-blue-600" />
              <a
                href={`mailto:${about?.info.email}`}
                className="text-blue-600 hover:underline"
              >
                {about?.info.email}
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-green-600" />
              <a
                href={`tel:${about?.info.phone}`}
                className="text-blue-600 hover:underline"
              >
                {about?.info.phone}
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <span>{about?.info.location}</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Mening ko‘nikmalarim
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {about?.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm shadow hover:bg-blue-600 transition cursor-pointer"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Xizmatlarim
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {about?.services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition"
            >
              <div className="text-3xl text-blue-600 mb-4">
                <CheckCircle className="w-10 h-10 mx-auto" />
              </div>
              <h4 className="font-bold text-gray-800 mb-2">{service.title}</h4>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education Section */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Ta'lim
        </h3>
        <div className="space-y-6">
          {about?.education.map((edu, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-lg p-6 flex items-start space-x-4 hover:shadow-lg transition"
            >
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="text-lg font-bold text-gray-800">{edu.education_location}</h4>
                <p className="text-gray-700">{edu.degree}</p>
                <span className="text-sm text-gray-500">{edu.year}</span>
                <p className="mt-2 text-gray-600">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Experience Section */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Ish tajribam
        </h3>
        <div className="space-y-6">
          {about?.experience.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-lg p-6 hover:shadow-lg transition"
            >
              <h4 className="text-lg font-bold text-gray-800">{exp.position}</h4>
              <p className="text-gray-700">{exp.company}</p>
              <span className="text-sm text-gray-500">{exp.duration}</span>
              <p className="mt-2 text-gray-600">{exp.experience_description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
          Yutuqlarim
        </h3>
        <div className="space-y-4">
          {about?.achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-800">{achievement}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {about?.stats.map((stat, index) => (
          <div key={index} className="p-6 bg-blue-50 rounded-xl shadow">
            <h4 className="text-3xl font-bold text-blue-600">{stat.value}+</h4>
            <p className="text-gray-700">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Interests Section */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Qiziqishlarim
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {about?.interests.map((interest, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm shadow"
            >
              {interest}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
