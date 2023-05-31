import React, { useContext, useState, useEffect, useCallback } from "react";
import { saveTheme, getTheme } from "../utils/helper";
import { API_KEY, OMDB_API_BASE_URL } from "../utils/config";

const context = React.createContext({
  showThemeOptions: false,
  toogleThemeOptions: () => {},
  showSideBar: false,
  activeTheme: "Dark",
  setActiveTheme: (newTheme: string) => {},
  setTheme: (newTheme: string) => {},
  checkSystemTheme: () => {},
  setShowSideBar: (prevValue: boolean) => {},
  setVideoId: (prevValue: string) => {},
  theme: "",
  getTrailerId: (id: number) => {},
  videoId: "",
  toggleModal: () => {},
  isModalOpen: false,
  setShowThemeOptions: (prev: boolean) => {}
});

interface Props {
  children: React.ReactNode;
}

const initialTheme = getTheme();

const GlobalContextProvider = ({ children }: Props) => {
  const [showThemeOptions, setShowThemeOptions] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>(initialTheme);
  const [activeTheme, setActiveTheme] = useState<string>(
    initialTheme || "System"
  );
  const [videoId, setVideoId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkSystemTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  };

  // check theme stored in local storage;
  const checkTheme = () => {
    if (initialTheme) return;
    checkSystemTheme();
  };

  useEffect(() => {
    checkTheme();
  }, []);

  useEffect(() => {
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
      saveTheme("Dark");
    } else if (theme === "Light") {
      document.documentElement.classList.remove("dark");
      saveTheme("Light");
    }
  }, [theme]);

  const toogleThemeOptions = () => {
    setShowThemeOptions((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getTrailerId = async (id: number) => {
    try {
      const res = await fetch(
        `${OMDB_API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setVideoId(data.results[0].key);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <context.Provider
      value={{
        showThemeOptions,
        toogleThemeOptions,
        showSideBar,
        activeTheme,
        setActiveTheme,
        setTheme,
        theme,
        checkSystemTheme,
        setShowSideBar,
        getTrailerId,
        videoId,
        toggleModal,
        isModalOpen,
        setVideoId,
        setShowThemeOptions
      }}
    >
      {children}
    </context.Provider>
  );
};

export default GlobalContextProvider;

export const useGlobalContext = () => {
  return useContext(context);
};
