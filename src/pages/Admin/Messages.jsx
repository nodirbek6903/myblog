import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {fetchMessages,deleteMessage} from "../../redux/messageSlice"
import {
  List,
  Card,
  Button,
  Alert,
  Popconfirm,
  Typography,
  message as antdMessage,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const {Title,Text} = Typography


const Messages = () => {
  const dispatch = useDispatch()
  const {messages,loading,error} = useSelector(state => state.messages)

  useEffect(() => {
    dispatch(fetchMessages())
  },[dispatch])

  const handleDeleteMessage = (id) => {
    try {
      dispatch(deleteMessage(id)).unwrap()
      antdMessage.success("Xabar o'chirildi")
      dispatch(fetchMessages())
    } catch (error) {
      antdMessage.error(error || "Xatolik yuz berdi")
    }
  }


  

  return (
    <div className='container mx-auto mb-6'>
      <Title level={2} className='text-center mb-6'>
        Xabarlar
      </Title>

      {/* loading */}
      {
        loading && (
          <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
        )}

        {/* Error */}
      {error && (
        <Alert
          message="Xatolik yuz berdi"
          description={error}
          type="error"
          showIcon
          className="mb-4"
        />
      )}

      {/* No messages */}
      {!loading && messages.length === 0 && (
        <Alert
          message="Hozircha xabarlar mavjud emas"
          type="info"
          showIcon
        />
      )}

      {/* Messages List */}
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item>
            <Card
              title={<Text strong>{msg.name}</Text>}
              extra={
                <Popconfirm
                  title="Ushbu xabarni o‘chirishni istaysizmi?"
                  okText="Ha"
                  cancelText="Yo'q"
                  onConfirm={() => handleDeleteMessage(msg._id)}
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    size="small"
                  >
                    O‘chirish
                  </Button>
                </Popconfirm>
              }
              className="shadow-md hover:shadow-lg transition"
            >
              <p>
                <Text type="secondary">Email:</Text> {msg.email}
              </p>
              <p>
                <Text type="secondary">Telefon:</Text> {msg.phone}
              </p>
              <p>
                <Text type="secondary">Xabar:</Text> {msg.message}
              </p>
              <p>
                <Text type="secondary">Yuborilgan vaqti:</Text>{" "}
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Messages