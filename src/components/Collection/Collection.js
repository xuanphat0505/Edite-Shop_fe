import classNames from "classnames/bind";

import { collections } from "../../assets/data/Data";

import styles from "./Collection.module.scss";
const cx = classNames.bind(styles);
function Collection() {
  return (
    <div className={cx("collection")}>
      {collections.map((collection, index) => (
        <div className={cx("item")} key={index}>
          <div className={cx("item-image")}>
            <img src={collection.image} alt=""></img>
          </div>
          <div className={cx("title-product")}>
            <h3>{collection.name}</h3>
            <p>{collection.count} products</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Collection;
