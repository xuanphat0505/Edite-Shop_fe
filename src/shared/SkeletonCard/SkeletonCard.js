import classNames from "classnames/bind";

import styles from "./SkeletonCard.module.scss";
import Skeleton from "react-loading-skeleton";
const cx = classNames.bind(styles);
function SkeletonCard({ cards }) {
  return (
    <div className={cx("skeleton-container")}>
      <Skeleton
        count={cards}
        className={cx("skeleton")}
      ></Skeleton>
    </div>
  );
}

export default SkeletonCard;
