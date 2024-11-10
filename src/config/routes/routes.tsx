import { Chat } from '../../components/chat';
import { Login } from '../../components/login';

export const LOCAL_LOGIN = '/login';
export const LOCAL_CHAT = '/chat';

export const privateRoutes = [
  {
    path: LOCAL_CHAT,
    Component: <Chat />,
  },
];

export const publicRoutes = [
  {
    path: LOCAL_LOGIN,
    Component: <Login />,
  },
];
