import React from "react";

const receivedMessages = [
    { text: 'Xin chào!', sender: 'receiver' },
    { text: 'Chào bạn!', sender: 'receiver' },
    { text: 'Bạn đang làm gì?', sender: 'receiver' },
];

const Message = () =>
{
    const roomCount = 24;
    const rooms = Array.from(
        { length: roomCount },
        (_, index) => `Room ${index}`
    );

    const selectedRoom = "Room 0";

    return (
        <div className="main-content d-flex">
            {/* Sidebar */}
            <aside className="sidebar bg-light">
                <h2>Rooms</h2>
                <ul className="list-group">
                    {rooms.map((room, index) => (
                        <li
                            key={index}
                            className={`list-group-item ${room === selectedRoom ? "active" : ""
                                }`}
                        >
                            {room}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Chats */}
            <main className="chats">
                <div>
                    {receivedMessages.map((item, index) => (
                        <div>
                            <div>{item.text}</div>
                            <div>{index}</div>
                            <div>{item.sender}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Message;











// import React, { useState, useEffect } from 'react';
// import { Grid, Paper, Typography, Box, TextField, IconButton } from '@material-ui/core';
// import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
// import AttachFileIcon from '@material-ui/icons/AttachFile';

// const ChatInterface = () =>
// {
//     const [selectedRoom, setSelectedRoom] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [inputText, setInputText] = useState('');
//     const [selectedFile, setSelectedFile] = useState(null);

//     useEffect(() =>
//     {
//         // Simulate receiving messages from another user in the selected room
//         if (selectedRoom)
//         {
//             const receivedMessages = [
//                 { text: 'Xin chào!', sender: 'receiver' },
//                 { text: 'Chào bạn!', sender: 'receiver' },
//                 { text: 'Bạn đang làm gì?', sender: 'receiver' },
//             ];
//             setMessages(receivedMessages);
//         }
//     }, [selectedRoom]);

//     const handleRoomSelection = (room) =>
//     {
//         setSelectedRoom(room);
//         setMessages([]);
//     };

//     const handleSendMessage = () =>
//     {
//         if (selectedRoom && inputText.trim() !== '')
//         {
//             const newMessage = {
//                 text: inputText,
//                 sender: 'sender',
//             };
//             setMessages([...messages, newMessage]);
//             setInputText('');
//         }
//     };

//     const handleShareFile = (event) =>
//     {
//         const file = event.target.files[0]; // Lấy tệp đầu tiên từ danh sách tệp đã chọn
//         setSelectedFile(file); // Lưu trữ thông tin về tệp đã chọn trong trạng thái selectedFile
//     };

//     return (
//         <Grid container style={{ height: '100vh' }}>
//             <Grid item xs={3} style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
//                 {/* Danh sách phòng chat */}
//                 <Typography variant="h6" gutterBottom>
//                     Danh sách phòng chat
//                 </Typography>
//                 <Box>
//                     <Typography
//                         variant="body1"
//                         style={{ cursor: 'pointer', color: selectedRoom === 'room1' ? 'blue' : 'inherit' }}
//                         onClick={() => handleRoomSelection('room1')}
//                     >
//                         Phòng 1
//                     </Typography>
//                     <Typography
//                         variant="body1"
//                         style={{ cursor: 'pointer', color: selectedRoom === 'room2' ? 'blue' : 'inherit' }}
//                         onClick={() => handleRoomSelection('room2')}
//                     >
//                         Phòng 2
//                     </Typography>
//                     <Typography
//                         variant="body1"
//                         style={{ cursor: 'pointer', color: selectedRoom === 'room3' ? 'blue' : 'inherit' }}
//                         onClick={() => handleRoomSelection('room3')}
//                     >
//                         Phòng 3
//                     </Typography>
//                 </Box>
//             </Grid>
//             <Grid item xs={9}>
//                 <Paper
//                     elevation={2}
//                     style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
//                 >
//                     <Box p={2} style={{ flexGrow: 1, overflowY: 'scroll' }}>
//                         {/* Cuộc trò chuyện */}
//                         {selectedRoom &&
//                             messages.map((message, index) => (
//                                 <Message key={index} message={message} />
//                             ))}
//                     </Box>
//                     {selectedRoom && (
//                         <Box p={1} display="flex" alignItems="center">
//                             {/* Nút chia sẻ file */}
//                             <IconButton>
//                                 <label htmlFor="file-input">
//                                     <AttachFileIcon />
//                                 </label>
//                                 <input
//                                     id="file-input"
//                                     type="file"
//                                     style={{ display: 'none' }}
//                                     onChange={handleShareFile}
//                                 />
//                             </IconButton>
//                             {/* Ô nhập tin nhắn */}
//                             <TextField
//                                 value={inputText}
//                                 onChange={(e) => setInputText(e.target.value)}
//                                 placeholder="Nhập tin nhắn..."
//                                 variant="outlined"
//                                 fullWidth
//                                 multiline
//                                 rows={1}
//                                 rowsMax={1}
//                                 InputProps={{
//                                     style: {
//                                         borderRadius: '20px',
//                                         paddingRight: '0',
//                                         padding: '0',
//                                     },
//                                     endAdornment: (
//                                         <IconButton>
//                                             <label>
//                                             <SendOutlinedIcon />
//                                             </label>
//                                             <input
//                                         </IconButton>
//                                     ),
//                                 }}
//                                 inputProps={{
//                                     style: {
//                                         padding: '0px 12px',
//                                         lineHeight: '1.4',
//                                         fontSize: '14px',
//                                         minHeight: '36px',
//                                         marginTop: '4px',
//                                         marginBottom: '4px',
//                                     },
//                                     maxLength: 100, // Giới hạn số ký tự nhập vào
//                                 }}
//                                 onKeyPress={(e) =>
//                                 {
//                                     if (e.key === 'Enter')
//                                     {
//                                         handleSendMessage();
//                                     }
//                                 }}
//                             />

//                         </Box>
//                     )}
//                 </Paper>
//             </Grid>
//         </Grid>
//     );
// };

// const Message = ({ message }) =>
// {
//     const { text, sender } = message;

//     return (
//         <Box
//             mb={1}
//             style={{
//                 display: 'flex',
//                 alignItems: 'flex-start',
//                 justifyContent: sender === 'sender' ? 'flex-end' : 'flex-start',
//             }}
//         >
//             {sender === 'receiver' && (
//                 <img
//                     src={message.sender === 'receiver' ? 'receiver-avatar-url' : 'sender-avatar-url'}
//                     alt="Avatar"
//                     style={{ width: '32px', height: '32px', marginRight: '8px', borderRadius: '50%' }}
//                 />
//             )}
//             <Paper
//                 elevation={0}
//                 style={{
//                     padding: '10px',
//                     margin: '2px',
//                     borderRadius: '20px',
//                     backgroundColor: sender === 'receiver' ? '#e1ffc7' : '#add8e6',
//                 }}
//             >
//                 <Typography>{text}</Typography>
//             </Paper>
//         </Box>
//     );
// };

// const App = () =>
// {
//     return <ChatInterface />;
// };

// export default App;






