import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
  fetchPortfolios,
} from "../../redux/portfolioSlice";

import {
  Button,
  Modal,
  Form,
  Input,
  Tag,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { LinkIcon, CodeBracketIcon } from "@heroicons/react/24/outline";


const Portfolio = () => {
  const dispatch = useDispatch();
  const { portfolios, loading } = useSelector((state) => state.portfolio);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [techInput, setTechInput] = useState("");
  const [techList, setTechList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchPortfolios());
  }, [dispatch]);

  /** Modal ochish */
  const openModal = (record = null) => {
    setIsModalOpen(true);
    if (record) {
      setEditingId(record._id);
      setTechList(record.technologies || []);
      form.setFieldsValue({
        title: record.title,
        description: record.description,
        image: record.image,
        category: record.category,
        demoLink: record.demoLink,
        githubLink: record.githubLink,
        details: record.details,
      });
    } else {
      setEditingId(null);
      setTechList([]);
      form.resetFields();
    }
  };

  /** Modal yopish */
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setTechList([]);
    form.resetFields();
  };

  /** Technologies qo‘shish */
  const handleAddTech = () => {
    if (techInput.trim() === "") return;
    setTechList((prev) => [...prev, techInput.trim()]);
    setTechInput("");
  };

  /** Technologies o‘chirish */
  const handleRemoveTech = (tech) => {
    setTechList((prev) => prev.filter((t) => t !== tech));
  };

  /** Portfolio saqlash yoki yangilash */
  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const newPortfolio = {
        ...values,
        technologies: techList,
      };

      if (editingId) {
        await dispatch(updatePortfolio({ id: editingId, data: newPortfolio }));
        message.success("Portfolio yangilandi!");
      } else {
        await dispatch(createPortfolio(newPortfolio));
        message.success("Portfolio qo'shildi!");
      }

      closeModal();
      dispatch(fetchPortfolios());
    } catch (err) {
      message.error("Xatolik yuz berdi!", err);
    }
  };

  if(loading){
    <div className="text-center text-red-500">
      Yuklanmoqda...
    </div>
  }

  /** Portfolio o‘chirish */
  const handleDelete = async (id) => {
    await dispatch(deletePortfolio(id));
    message.success("Portfolio o‘chirildi!");
    dispatch(fetchPortfolios());
  };

  return (
    <div className="p-6 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Portfolio Management</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
        >
          Yangi Portfolio
        </Button>
      </div>

      {/* Card ko'rinishi */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-4 relative group"
        >
          {/* Rasm */}
          <div className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            {/* Demo & GitHub icons — tepa chap va o'ng tomonda */}
            <div className="absolute top-3 left-3 flex gap-2">
              {item.demoLink && (
                <a
                  href={item.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Demo sahifaga o'tish"
                  className="bg-white rounded-full p-2 shadow hover:bg-blue-50 transition"
                >
                  <LinkIcon className="w-5 h-5 text-blue-600" />
                </a>
              )}
            </div>

            <div className="absolute top-3 right-3 flex gap-2">
              {item.githubLink && (
                <a
                  href={item.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub sahifaga o'tish"
                  className="bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
                >
                  <CodeBracketIcon className="w-5 h-5 text-gray-800" />
                </a>
              )}
            </div>
          </div>

          {/* Title va Category */}
          <div className="mb-2">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p className="text-gray-600 text-sm">{item.category}</p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-3">
            {item.technologies.map((tech, i) => (
              <Tag key={i} color="blue">
                {tech}
              </Tag>
            ))}
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm mb-3 line-clamp-3">
            {item.description}
          </p>

          {/* Action tugmalari */}
          <div className="flex justify-between">
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => openModal(item)}
            >
              Edit
            </Button>

            <Popconfirm
              title="O'chirishni tasdiqlaysizmi?"
              onConfirm={() => handleDelete(item._id)}
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      ))}
    </div>

      {/* Modal */}
      <Modal
        title={editingId ? "Portfolio tahrirlash" : "Yangi portfolio qo'shish"}
        open={isModalOpen}
        onCancel={closeModal}
        onOk={handleSave}
        okText={editingId ? "Yangilash" : "Qo'shish"}
        width={600}
      >
        <Form layout="vertical" form={form}>
          {/* Title */}
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title kiriting!" }]}
          >
            <Input placeholder="Portfolio title" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description kiriting!" }]}
          >
            <Input.TextArea placeholder="Portfolio description" rows={3} />
          </Form.Item>

          {/* Image */}
          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Image URL kiriting!" }]}
          >
            <Input placeholder="Rasm URL manzili" />
          </Form.Item>

          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Category kiriting!" }]}
          >
            <Input placeholder="Web, Mobile, Design..." />
          </Form.Item>

          {/* Technologies qo‘shish */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Technologies</label>
            <div className="flex gap-2">
              <Input
                placeholder="Masalan: React.js"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
              />
              <Button type="primary" onClick={handleAddTech}>
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {techList.map((tech, index) => (
                <Tag
                  key={index}
                  color="green"
                  closable
                  onClose={() => handleRemoveTech(tech)}
                >
                  {tech}
                </Tag>
              ))}
            </div>
          </div>

          {/* Demo link */}
          <Form.Item label="Demo Link" name="demoLink">
            <Input placeholder="Demo URL manzili" />
          </Form.Item>

          {/* GitHub link */}
          <Form.Item label="GitHub Link" name="githubLink">
            <Input placeholder="GitHub URL manzili" />
          </Form.Item>

          {/* Details */}
          <Form.Item label="Details" name="details">
            <Input.TextArea rows={3} placeholder="Qo‘shimcha ma'lumotlar..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Portfolio;
