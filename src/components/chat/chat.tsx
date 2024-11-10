import { useContext, useState } from 'react';
import { Avatar, Button, Box, Grid, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../../app';
import { Loader } from '../../UI/loader/loader';

export const Chat = () => {
  const { auth, firestore } = useContext(Context)!;
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const db = firestore;

  const messagesQuery = query(collection(db, 'messages'), orderBy('createdAt'));
  const [messages, loading] = useCollectionData(messagesQuery);

  const sendMessage = async () => {
    if (user && value.trim()) {
      await addDoc(collection(db, 'messages'), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: serverTimestamp(),
      });
      setValue('');
    }
  };

  // Типизация параметра события для HTMLInputElement
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      height={'100%'}
    >
      <Box maxWidth={'1200px'} width={'100%'}>
        <Grid
          container
          justifyContent="center"
          style={{
            height: window.innerHeight - 50,
            paddingTop: '10px',
            backgroundColor: '#E6E6FA',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '1000px',
              height: '60vh',
              overflowY: 'auto',
            }}
          >
            {/* Проверка на undefined для messages */}
            {messages?.map((message) => (
              <div
                key={message.createdAt}
                style={{
                  margin: 10,
                  borderRadius:
                    user?.uid === message.uid
                      ? '10px 10px 0 10px'
                      : '10px 10px 10px 0',
                  backgroundColor:
                    user?.uid === message.uid ? '#FFB6C1' : 'lightgray',
                  marginLeft: user?.uid === message.uid ? 'auto' : '10px',
                  width: 'fit-content',
                  padding: 10,
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  sx={{ padding: '5px' }}
                >
                  <Avatar src={message.photoURL} sx={{ marginRight: '5px' }} />
                  <div>{message.displayName}</div>
                </Grid>
                <div>{message.text}</div>
              </div>
            ))}
          </div>
          <Grid
            container
            direction="column"
            alignItems="flex-end"
            style={{ width: '80%' }}
          >
            <TextField
              fullWidth
              maxRows={2}
              variant="outlined"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown} // Теперь ошибка исчезнет
              sx={{ paddingBottom: '10px' }}
            />
            <Button onClick={sendMessage} variant="outlined">
              Отправить
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};