import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Details from "./components/details/Details";
import Login from "./components/login/login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useEffect } from "react";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {

  const{currentUser,isLoading,fetchUserInfo} = useUserStore()
  const{chatId} = useChatStore()

  useEffect(() => {
    const unSub = onAuthStateChanged(auth,(user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser)

  if(isLoading) return <div className="Loading">Loading...</div>

  return (
    <div className='container'>
    {currentUser ? (
      <>
          <List/>
         {chatId && <Chat/>}
         {chatId && <Details/>}
          </>
    ):(
      <Login/>
    )}
      <Notification/>  
    </div>
  );
};

export default App;