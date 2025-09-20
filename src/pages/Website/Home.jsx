import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      {/* Hero Section */}
      <motion.h1
        className="text-5xl font-bold text-gray-900"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Salom, men <span className="text-blue-600">Nodirbek Umarov</span>
      </motion.h1>

      <motion.p
        className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Men asosan <span className="font-semibold">Frontend dasturchiman</span>, ammo
        <span className="font-semibold"> Node.js</span> va <span className="font-semibold">Express.js</span> bilan ham
        amaliyot qilib loyihalar yaratganman. Zamonaviy, qulay va foydalanuvchilar uchun
        samarali web ilovalar ishlab chiqishga ixtisoslashganman. Bu portfolio orqali
        mening loyihalarim, blog maqolalarim va boshqa ishlarim bilan tanishishingiz mumkin.
      </motion.p>

      {/* Call to Action Buttons */}
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <motion.a
          href="/portfolio"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Loyihalarimni Ko‘rish
        </motion.a>

        <motion.a
          href="/contact"
          className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Bog‘lanish
        </motion.a>
      </motion.div>

      {/* Sections Preview */}
      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2, // har bir box ketma-ket paydo bo‘lishi
            },
          },
        }}
      >
        {/* About Section */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Men Haqimda</h2>
          <p className="mt-3 text-gray-600 text-sm">
            Mening dasturchilik yo‘lim, frontend va backend bo‘yicha
            tajribalarim haqida ko‘proq bilib oling.
          </p>
          <a
            href="/about"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Batafsil →
          </a>
        </motion.div>

        {/* Portfolio Section */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Portfolio</h2>
          <p className="mt-3 text-gray-600 text-sm">
            Men yaratgan loyihalar va ularning tafsilotlarini ko‘rib chiqing.
          </p>
          <a
            href="/portfolio"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Ko‘rish →
          </a>
        </motion.div>

        {/* Blog Section */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800">Blog</h2>
          <p className="mt-3 text-gray-600 text-sm">
            Dasturlash va texnologiyalar bo‘yicha maqolalarimni o‘qing.
          </p>
          <a
            href="/blog"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            O‘qish →
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
