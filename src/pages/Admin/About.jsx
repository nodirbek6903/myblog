import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout, createAbout, updateAbout } from "../../redux/aboutSlice";
import {
  Form,
  Input,
  Button,
  Card,
  Collapse,
  Space,
  Typography,
  Spin,
  message,
  Row,
  Col,
  Divider,
  Tag,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Panel } = Collapse;

const AdminAbout = () => {
  const dispatch = useDispatch();
  const { about, loading } = useSelector((state) => state.about);

  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  useEffect(() => {
    if (about) {
      form.setFieldsValue(about);
    }
  }, [about, form]);

  const handleSubmit = async (values) => {
    try {
      if (about?._id) {
        await dispatch(
          updateAbout({ id: about._id, aboutData: values })
        ).unwrap();
        message.success("About ma'lumotlari yangilandi");
      } else {
        await dispatch(createAbout(values)).unwrap();
        message.success("About ma'lumotlari yaratildi");
      }
      setEditMode(false);
    } catch (err) {
      message.error(err || "Xatolik yuz berdi");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large">
          <div className="mt-2 text-gray-600">Yuklanmoqda...</div>
        </Spin>
      </div>
    );
  }

  return (
    <div className="p-6 max-h-screen overflow-y-auto">
      <Title level={2} className="text-center">
        About bo‘limi
      </Title>

      {/* Ko‘rinish rejimi */}
      {!editMode && about && (
        <Card className="shadow-lg">
          <Row gutter={16}>
            <Col xs={24} md={6} className="flex justify-center">
              {about.image && (
                <img
                  src={about.image}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover shadow-md"
                />
              )}
            </Col>
            <Col xs={24} md={18}>
              <Title level={3}>{about.title}</Title>
              <p className="text-gray-600">{about.description}</p>
            </Col>
          </Row>

          <Divider />

          <Title level={4}>👤 Shaxsiy ma’lumotlar</Title>
          <Row gutter={16}>
            {Object.entries(about.info || {}).map(([key, value]) => (
              <Col span={12} key={key}>
                <p>
                  <b>{key.replace(/([A-Z])/g, " $1")}:</b> {value}
                </p>
              </Col>
            ))}
          </Row>

          {about.skills?.length > 0 && (
            <>
              <Divider />
              <Title level={4}>🛠 Skills</Title>
              {about.skills.map((skill, i) => (
                <Tag color="blue" key={i}>
                  {skill}
                </Tag>
              ))}
            </>
          )}

          {about.interests?.length > 0 && (
            <>
              <Divider />
              <Title level={4}>🎯 Qiziqishlar</Title>
              <ul>
                {about.interests.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {about.services?.length > 0 && (
            <>
              <Divider />
              <Title level={4}>💼 Xizmatlar</Title>
              <Row gutter={16}>
                {about.services.map((srv, i) => (
                  <Col xs={24} md={12} key={i}>
                    <Card variant="outlined">
                      <Title level={5}>{srv.title}</Title>
                      <p>{srv.description}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {about.education?.length > 0 && (
            <>
              <Divider />
              <Title level={4}>🎓 Ta’lim</Title>
              {about.education.map((edu, i) => (
                <Card key={i} className="mb-3">
                  <Title level={5}>{edu.degree}</Title>
                  <p>{edu.education_location}</p>
                  <p className="text-gray-500">{edu.year}</p>
                  <p>{edu.description}</p>
                </Card>
              ))}
            </>
          )}

          {about.experience?.length > 0 && (
            <>
              <Divider />
              <Title level={4}>🏢 Tajriba</Title>
              {about.experience.map((exp, i) => (
                <Card key={i} className="mb-3">
                  <Title level={5}>
                    {exp.position} - {exp.company}
                  </Title>
                  <p className="text-gray-500">{exp.duration}</p>
                  <p>{exp.experience_description}</p>
                </Card>
              ))}
            </>
          )}

          {about.stats?.length > 0 && (
            <>
              <Divider />
              <Title level={4}>📊 Statistikalar</Title>
              <Row gutter={16}>
                {about.stats.map((stat, i) => (
                  <Col xs={12} md={6} key={i}>
                    <Card className="text-center">
                      <Title level={3}>{stat.value}</Title>
                      <p>{stat.label}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </>
          )}

          {about.achievements?.length > 0 && (
            <>
              <Divider />
              <Title level={4}>🏆 Yutuqlar</Title>
              <ul>
                {about.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </>
          )}

          <Button
            type="primary"
            icon={<EditOutlined />}
            className="mt-4"
            onClick={() => setEditMode(true)}
          >
            Tahrirlash
          </Button>
        </Card>
      )}

      {/* Form rejimi */}
      {(editMode || !about) && (
        <Card className="shadow-lg mt-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              title: "",
              description: "",
              image: "",
              info: {
                fullName: "",
                age: "",
                email: "",
                phone: "",
                github:"",
                linkedin:"",
                telegram:"",
                instagram:"",
                location: "",
                role: "",
              },
              skills: [],
              services: [],
              education: [],
              experience: [],
              achievements: [],
              stats: [],
              interests: [],
            }}
          >
            <Form.Item
              label="Sarlavha"
              name="title"
              rules={[
                { required: true, message: "Sarlavha kiritilishi kerak" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tavsif"
              name="description"
              rules={[{ required: true, message: "Tavsif kiritilishi kerak" }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item label="Rasm URL" name="image">
              <Input />
            </Form.Item>

            <Collapse
              items={[
                // 1. Shaxsiy ma'lumotlar
                {
                  key: "info",
                  label: "👤 Shaxsiy ma’lumotlar",
                  children: (
                    <Row gutter={16}>
                      {Object.keys(form.getFieldValue("info") || {}).map(
                        (field) => (
                          <Col xs={24} md={12} key={field}>
                            <Form.Item label={field} name={["info", field]}>
                              <Input
                                type={field === "age" ? "number" : "text"}
                              />
                            </Form.Item>
                          </Col>
                        )
                      )}
                    </Row>
                  ),
                },

                // 2. Skills, Interests, Achievements
                ...["skills", "interests", "achievements"].map((key) => ({
                  key,
                  label: key.charAt(0).toUpperCase() + key.slice(1),
                  children: (
                    <Form.List name={key}>
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(
                            ({ key: fieldKey, name, ...restField }) => (
                              <Space
                                key={fieldKey}
                                className="flex mb-2"
                                align="baseline"
                              >
                                <Form.Item
                                  {...restField}
                                  name={name}
                                  className="flex-1"
                                >
                                  <Input placeholder={`${key} item`} />
                                </Form.Item>
                                <Button
                                  danger
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(name)}
                                />
                              </Space>
                            )
                          )}
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Qo‘shish
                          </Button>
                        </>
                      )}
                    </Form.List>
                  ),
                })),

                // 3. Services, Education, Experience, Stats
                ...[
                  { key: "services", fields: ["title", "description"] },
                  {
                    key: "education",
                    fields: [
                      "education_location",
                      "degree",
                      "year",
                      "description",
                    ],
                  },
                  {
                    key: "experience",
                    fields: [
                      "company",
                      "position",
                      "duration",
                      "experience_description",
                    ],
                  },
                  { key: "stats", fields: ["label", "value"] },
                ].map(({ key, fields }) => ({
                  key,
                  label: key.charAt(0).toUpperCase() + key.slice(1),
                  children: (
                    <Form.List name={key}>
                      {(fieldsList, { add, remove }) => (
                        <>
                          {fieldsList.map(({ key: fieldKey, name }) => (
                            <Card
                              key={fieldKey}
                              variant="outlined"
                              className="mb-3"
                            >
                              {fields.map((f) => (
                                <Form.Item key={f} name={[name, f]} label={f}>
                                  <Input />
                                </Form.Item>
                              ))}
                              <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => remove(name)}
                              >
                                O‘chirish
                              </Button>
                            </Card>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Qo‘shish
                          </Button>
                        </>
                      )}
                    </Form.List>
                  ),
                })),
              ]}
            />
            <Space className="mt-4">
              <Button type="primary" htmlType="submit">
                {about ? "Yangilash" : "Yaratish"}
              </Button>
              {about && (
                <Button
                  onClick={() => {
                    setEditMode(false);
                    form.setFieldsValue(about);
                  }}
                >
                  Bekor qilish
                </Button>
              )}
            </Space>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default AdminAbout;
