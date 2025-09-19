import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchByIdBlog, updateByIdBlog } from "../../redux/postSlice";
import { Button, Form, Input, Tag, message } from "antd";
import { FaEdit } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBlog, loading } = useSelector((state) => state.blogs);

  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchByIdBlog(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedBlog) {
      form.setFieldsValue({
        title: selectedBlog.title,
        description: selectedBlog.description,
        content: selectedBlog.content,
        image: selectedBlog.image,
        category: selectedBlog.category,
        date: new Date(selectedBlog.date).toLocaleDateString(),
        tags: selectedBlog.tags?.join(", "),
      });
    }
  }, [selectedBlog, form]);

  const handleUpdate = (values) => {
    const updatedBlog = {
      ...values,
      slug: generateSlug(values.title),
      tags: values.tags ? values.tags.split(",").map((tag) => tag.trim()) : [],
    };

    dispatch(updateByIdBlog({ id, data:updatedBlog }))
      .unwrap()
      .then(() => {
        message.success("Blog muvaffaqiyatli yangilandi!");
        setIsEditing(false);
        dispatch(fetchByIdBlog(id));
      })
      .catch(() => message.error("Yangilashda xatolik yuz berdi!"));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!selectedBlog) {
    return <div className="text-center py-10 text-red-500">Blog topilmadi</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!isEditing ? (
        <>
          <img
            src={selectedBlog.image}
            alt={selectedBlog.title}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{selectedBlog.title}</h1>
          <div className="flex justify-between text-gray-500 mb-4">
            <span>{selectedBlog.category}</span>
            <span>{new Date(selectedBlog.date).toLocaleDateString()}</span>
          </div>
          <p className="mb-4">{selectedBlog.description}</p>
          <div className="mb-4">
            {selectedBlog.tags?.map((tag, index) => (
              <Tag key={index} color="blue">
                #{tag}
              </Tag>
            ))}
          </div>
          <p className="mb-6">{selectedBlog.content}</p>

          <Button type="primary" onClick={() => setIsEditing(true)}>
            <FaEdit /> Edit 
          </Button>
          <Button className="ml-2" onClick={() => navigate(-1)}>
            <IoArrowBackOutline /> Orqaga
          </Button>
        </>
      ) : (
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            label="Sarlavha"
            name="title"
            rules={[{ required: true, message: "Sarlavha kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Kategoriya" name="category">
            <Input />
          </Form.Item>
          <Form.Item
            label="Rasm URL"
            name="image"
            rules={[{ required: true, message: "Rasm URL kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Sana" name="date">
            <Input />
          </Form.Item>
          <Form.Item label="Qisqacha tavsif" name="description">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item label="To‘liq ma'lumot" name="content">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Teglar" name="tags">
            <Input placeholder="teg1, teg2, teg3" />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Saqlash
          </Button>
          <Button
            className="ml-2"
            onClick={() => setIsEditing(false)}
          >
            Bekor qilish
          </Button>
        </Form>
      )}
    </div>
  );
};

export default BlogDetails;
