import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux/es/exports";
import store, { persistor } from "./features";
import { PersistGate } from "redux-persist/integration/react";
//  const elementRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [initialX, setInitialX] = useState(0);
//   const [currentX, setCurrentX] = useState(0);

//   const handleMouseDown = (event: any) => {
//     // Get the initial X position of the mouse when the mouse down event occurs
//     setIsDragging(true);
//   };

//   const handleMouseMove = (event: React.MouseEvent | any) => {
//     if (!isDragging) {
//       return;
//     }

//     // Calculate the new X position of the element based on the mouse's current position
//     setCurrentX(pre => pre + event.movementX);

//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Attach the event listeners to the document object
//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//     } else {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseup', handleMouseUp);
//     };
//   }, [isDragging]);

//   return (
//     <div
//     className="cursor-pointer w-10 h-10 bg-green-500 rounded-full"
//       onMouseMove={handleMouseMove}
//       onMouseDown={handleMouseDown}
//       onMouseUp={handleMouseUp}
//       ref={elementRef}
//       style={{
//         transform: `translateX(${currentX}px)`,
//       }}
//     >
//     </div>
//   );

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
   </React.StrictMode>
);
