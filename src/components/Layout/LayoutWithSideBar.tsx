import React, { createContext } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Container from "../common/container/";
import Sidebar from "../common/Sidebar/Sidebar";
import FooterV2 from "../common/Footer/FooterV2";
import BreadCrumb from "../common/BreadCrumb";

interface Props extends React.PropsWithChildren {
  showSideBar?: boolean;
}

interface AppContextInterface {
  [key: string]: string | undefined;
}

export const layoutWithSideBarCtx = createContext<AppContextInterface | null>(
  null
);

const { Provider } = layoutWithSideBarCtx;

const LayoutWithSideBar: React.FC<Props> = ({
  showSideBar = false,
  children,
}) => {
  let url: { [key: string]: string } = {};

  const params = useParams();

  const [queryParams] = useSearchParams();

  for (const entry of queryParams.entries()) {
    const [param, value] = entry;
    url[param] = value;
  }

  const isNoOptions = Object.entries(url).length === 0;

  return (
    <div>
      <Provider value={{ ...url, id: url?.id || params?.id }}>
        <Container>
          {Number(url?.columns) > 2 && (
            <div className="grid md:gap-x-[30px] grid-cols-12 ">
              <div className="col-span-12    ">
                <BreadCrumb />
              </div>
              <div className=" col-span-12 ">{children}</div>
            </div>
          )}

          {Number(url?.columns) === 2 && (
            <div className="grid md:gap-x-[30px] grid-cols-12">
              <div className=" col-span-12 md:col-span-8 lg:col-span-9">
                {children}
              </div>
              <div className=" md:col-span-4 lg:col-span-3">
                <Sidebar />
              </div>
            </div>
          )}

          {url?.sidebar === "left" && (
            <div className="grid md:gap-x-[30px] grid-cols-12">
              <div className="col-span-12 group overflow-hidden  mb-[30px]">
                <BreadCrumb />
              </div>
              <div className="hidden md:block md:col-span-4 lg:col-span-3 ">
                <Sidebar />
              </div>
              <div className=" col-span-12 md:col-span-8 lg:col-span-9">
                {children}
              </div>
              <div className="md:hidden block col-span-12">
                <Sidebar />
              </div>
            </div>
          )}

          {url?.sidebar === "right" && (
            <div className="grid  grid-cols-12 md:gap-x-[30px]">
              <div className=" col-span-12 md:col-span-8 lg:col-span-9">
                {children}
              </div>
              <div className=" md:col-span-4 lg:col-span-3">
                <Sidebar />
              </div>  
            </div>
          )}

          {url?.sidebar === "off" && (
            <div className="grid md:gap-[30px] grid-cols-12">
              <div className=" col-span-12">{children}</div>
            </div>
          )}

          {(isNoOptions ) && (
            <div>
              <div className="grid   grid-cols-12 md:gap-[30px] ">
                <div className=" lg:col-span-9 md:col-span-8 col-span-12  ">
                  {children}
                </div>
                <div className=" lg:col-span-3 md:col-span-4 col-span-12  ">
                  <Sidebar />
                </div>
                <div className="col-span-12 ">
                  <FooterV2 />
                </div>
              </div>
            </div>
          )}
        </Container>
      </Provider>
    </div>
  );
};

export default LayoutWithSideBar;
