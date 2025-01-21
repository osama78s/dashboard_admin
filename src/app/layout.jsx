import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import SidebarComponent from "@/components/SideBar/Sidebar";
import Them from "@/components/Context/Them";
import Id from "@/components/Context/Id";
import PageNumber from "@/components/Context/PageNumber";
import Messages from "@/components/Context/Messages";
import Products from "@/components/Context/Products";
import Users from "@/components/Context/Users";
import Categories from "@/components/Context/Categories";
import LengthOfUsers from "@/components/Context/LengthOfUsers";
import UserCookie from "@/components/Context/UserCookie";
import Subcategories from "@/components/Context/Subcategories";
import Brands from "@/components/Context/Brands";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import HandleSideBar from "@/components/Context/HandleSideBar";
import { CheckCookiesData } from "@/components/CheckCookiesData/CheckCookiesData";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard Information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark:bg-black bg-offWhite relative">
        <LengthOfUsers>
          <Them>
            <Id>
              <UserCookie>
                <Users>
                  <Categories>
                    <Brands>
                      <Subcategories>
                        <Products>
                          <Messages>
                            <PageNumber>
                              <HandleSideBar>
                                <div className="min-h-screen flex">
                                  <SidebarComponent />
                                  <div className="dark:text-white text-title w-full mx-auto px-[10px] lg:container overflow-x-auto lg:px-[10px] xl:px-[20px] min-h-screen lg:pb-4">
                                    <ToastMessage />
                                    <CheckCookiesData/>
                                    <Navbar />
                                    {children}
                                  </div>
                                </div>
                              </HandleSideBar>
                            </PageNumber>
                          </Messages>
                        </Products>
                      </Subcategories>
                    </Brands>
                  </Categories>
                </Users>
              </UserCookie>
            </Id>
          </Them>
        </LengthOfUsers>
      </body>
    </html>
  );
}
