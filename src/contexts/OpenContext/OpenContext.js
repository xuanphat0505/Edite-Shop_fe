import { createContext, useState } from "react";

export const OpenContext = createContext();
function OpenProvider({ children }) {
  const [openCart, setOpenCart] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [openCompare, setOpenCompare] = useState(false);
  const [openQuestionPopUp, setOpenQuestionPopUp] = useState(false);

  // cart
  const handleOpenCart = () => {
    setOpenCart(true);
  };
  const handleCloseCart = () => {
    setOpenCart(false);
  };

  // form
  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  // search
  const handleOpenSearch = () => {
    setOpenSearch(true);
  };
  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  // menu
  const handleOpenMenu = () => {
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  // quick shop
  const handleOpenShop = () => {
    setOpenShop(true);
  };
  const handleCloseShop = () => {
    setOpenShop(false);
  };

  // compare box
  const handleOpenCompare = () => {
    setOpenCompare(true);
  };
  const handleCloseCompare = () => {
    setOpenCompare(false);
  };

  // question popup
  const handleOpenQuestionPopUp = () => {
    setOpenQuestionPopUp(true);
  };
  const handleCloseQuestionPopUp = () => {
    setOpenQuestionPopUp(false);
  };
  return (
    <OpenContext.Provider
      value={{
        openCart,
        openForm,
        openSearch,
        openMenu,
        openShop,
        openCompare,
        openQuestionPopUp,
        handleCloseCart,
        handleOpenCart,
        handleCloseForm,
        handleOpenForm,
        handleOpenSearch,
        handleCloseSearch,
        handleOpenMenu,
        handleCloseMenu,
        handleOpenShop,
        handleCloseShop,
        handleOpenCompare,
        handleCloseCompare,
        handleOpenQuestionPopUp,
        handleCloseQuestionPopUp,
      }}
    >
      {children}
    </OpenContext.Provider>
  );
}

export default OpenProvider;
