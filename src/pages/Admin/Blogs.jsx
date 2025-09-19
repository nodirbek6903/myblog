import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, deleteBlogs, createBlogs } from "../../redux/postSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  Form,
  Input,
  Card,
  message,
  Tag,
  Row,
  Col,
  Space,
} from "antd";

// slug generate
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Yangi blog yaratish
  const handleCreate = (values) => {
    const newBlog = {
      ...values,
      slug: generateSlug(values.title),
      tags: values.tags ? values.tags.split(",").map((tag) => tag.trim()) : [],
    };

    dispatch(createBlogs(newBlog))
      .unwrap()
      .then(() => {
        message.success("Yangi blog muvaffaqiyatli qo‘shildi!");
        setIsModalOpen(false);
        form.resetFields();
        dispatch(fetchBlogs());
      })
      .catch(() => message.error("Blog qo‘shishda xatolik yuz berdi!"));
  };

  // Blog o‘chirish
  const handleDelete = (id) => {
    Modal.confirm({
      title: "O‘chirishni tasdiqlash",
      content: "Haqiqatan ham ushbu blogni o‘chirmoqchimisiz?",
      okText: "Ha",
      cancelText: "Bekor qilish",
      onOk: () => {
        dispatch(deleteBlogs(id))
          .unwrap()
          .then(() => {
            message.success("Blog muvaffaqiyatli o‘chirildi!");
            dispatch(fetchBlogs());
          })
          .catch(() => message.error("O‘chirishda xatolik yuz berdi!"));
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Xatolik: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bloglar</h1>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          + Yangi Blog
        </Button>
      </div>

      {/* Bloglar */}
      <Row gutter={[16, 16]}>
        {blogs.map((blog) => (
          <Col xs={24} sm={12} lg={8} key={blog._id}>
            <Card
              hoverable
              cover={<img alt={blog.title} src={blog.image} className="h-48 object-cover" />}
              actions={[
                <Link key="view" to={`/admin/blogs/${blog._id}`}>
                  Batafsil
                </Link>,
                <Button
                  danger
                  type="link"
                  key="delete"
                  onClick={() => handleDelete(blog._id)}
                >
                  O‘chirish
                </Button>,
              ]}
            >
              <Card.Meta
                title={blog.title}
                description={
                  <>
                    <p className="line-clamp-2">{blog.description}</p>
                    <div className="flex justify-between text-gray-500 text-sm mt-2">
                      <span>{blog.category}</span>
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Blog qo'shish modal */}
      <Modal
        title="Yangi Blog Qo‘shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item
            label="Sarlavha"
            name="title"
            rules={[{ required: true, message: "Sarlavha kiriting!" }]}
          >
            <Input placeholder="Sarlavha" />
          </Form.Item>

          <Form.Item label="Kategoriya" name="category">
            <Input placeholder="Kategoriya" />
          </Form.Item>

          <Form.Item
            label="Rasm URL"
            name="image"
            rules={[{ required: true, message: "Rasm URL kiriting!" }]}
          >
            <Input placeholder="Rasm URL" />
          </Form.Item>

          <Form.Item label="Sana" name="date">
            <Input placeholder="2025-09-18" />
          </Form.Item>

          <Form.Item
            label="Qisqacha tavsif"
            name="description"
            rules={[{ required: true, message: "Qisqacha tavsif kiriting!" }]}
          >
            <Input.TextArea rows={2} placeholder="Qisqacha tavsif" />
          </Form.Item>

          <Form.Item label="To‘liq ma'lumot" name="content">
            <Input.TextArea rows={4} placeholder="To‘liq ma'lumot" />
          </Form.Item>

          <Form.Item label="Teglar" name="tags">
            <Input placeholder="teg1, teg2, teg3" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Qo‘shish
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Blogs;
