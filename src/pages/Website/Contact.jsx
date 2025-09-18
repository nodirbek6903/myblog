import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send} from "lucide-react";
import { useDispatch,useSelector } from 'react-redux';
import {fetchAbout} from "../../redux/aboutSlice"
import {createMessage} from "../../redux/messageSlice"
import { FaTelegram,FaLinkedin,FaGithub,FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch()
  const {about, loading} = useSelector(state => state.about)


  useEffect(() => {
    dispatch(fetchAbout())
  },[dispatch])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createMessage(formData))

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    }, 1000);
  };

  return (
    <section className="py-20 bg-gray-50" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-800">Contact Me</h2>
          <p className="text-gray-600 mt-2">Quyidagi formani to‘ldirib menga bevosita xabar yuborishingiz mumkin. Shuningdek, ijtimoiy tarmoqlar orqali ham bog‘lanishingiz mumkin.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Email */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">{about?.info?.email}</p>
                </div>
              </div>
            </div>

            {/* Telefon */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Telefon</h4>
                  <p className="text-gray-600">{about?.info?.phone}</p>
                </div>
              </div>
            </div>

            {/* Manzil */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Manzil</h4>
                  <p className="text-gray-600">{about?.info?.location}</p>
                </div>
              </div>
            </div>

            {/* Ijtimoiy tarmoqlar */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="font-semibold mb-4">Ijtimoiy Tarmoqlar</h4>
              <ul className="space-y-3">
                {/* Telegram */}
                <li>
                  <a
                    href={about?.info?.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-500 hover:underline"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaTelegram className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>Telegram</span>
                  </a>
                </li>

                {/* GitHub */}
                <li>
                  <a
                    href={about?.info?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-800 hover:underline"
                  >
                    <div className="bg-gray-100 p-2 rounded-full">
                      <FaGithub className="w-5 h-5 text-gray-800" />
                    </div>
                    <span>GitHub</span>
                  </a>
                </li>

                {/* LinkedIn */}
                <li>
                  <a
                    href={about?.info?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-blue-700 hover:underline"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaLinkedin className="w-5 h-5 text-blue-700" />
                    </div>
                    <span>LinkedIn</span>
                  </a>
                </li>
                {/* instagram */}
                <li>
                  <a
                    href={about?.info?.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-red-500 hover:underline"
                  >
                    <div className="bg-blue-100 p-2 rounded-full">
                      <FaInstagram className="w-5 h-5 text-red-500" />
                    </div>
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <label className="block mb-2 font-medium">Ism</label>
              <input
                type="text"
                name="name"
                placeholder="Ismingizni kiriting"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email manzilingizni kiriting"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Telefon raqam</label>
              <input
                type="tel"
                name="phone"
                placeholder="+998 90 123 45 67"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Xabar</label>
              <textarea
                name="message"
                placeholder="Xabaringizni yozing"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer text-white py-3 rounded-xl hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5" />
              <span>Yuborish</span>
            </motion.button>

            {isSubmitted && (
              <p className="text-green-600 text-center mt-4">
                Xabaringiz muvaffaqiyatli yuborildi! ✅
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
