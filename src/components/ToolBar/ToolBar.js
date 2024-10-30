import { useContext } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import { AxiosContext } from "../../contexts/AxiosContext/AxiosContext";
import { OpenContext } from "../../contexts/OpenContext/OpenContext";
import { toolBarIcons } from "../../assets/data/Data";

import styles from "./ToolBar.module.scss";
const cx = classNames.bind(styles);
function ToolBar() {
  const { wishListProduct } = useContext(AxiosContext);
  const { handleOpenMenu } = useContext(OpenContext);
  return (
    <div className={cx("tool-bar")}>
      {toolBarIcons.map((icon, index) => (
        <div
          className={cx("icon-box")}
          key={index}
          onClick={icon.clickEvent ? handleOpenMenu : null}
        >
          <Link to={icon.path}>
            <i>
              <icon.icon />
              {index === 3 && wishListProduct?.length > 0 && (
                <span className={cx("quantity")}>{wishListProduct.length}</span>
              )}
            </i>
            <span>{icon.title}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ToolBar;
