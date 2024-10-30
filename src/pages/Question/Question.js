import { useEffect } from "react";
import classNames from "classnames/bind";

import { questions } from "../../assets/data/Data";

import styles from "./Question.module.scss";
const cx = classNames.bind(styles);
function Question() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={cx("question-section")}>
      <div className={cx("question-container")}>
        <h3>frequently asked questions</h3>
        <div className={cx("question-list")}>
          {questions.map((group, index) => (
            <div className={cx("question-group")} key={index}>
              <div className={cx("question-heading")}>
                <span className={cx("number")}>0{index + 1}</span>
                <span className={cx("title")}>{group.title}</span>
              </div>
              <div className={cx("question-content")}>
                <div className={cx("question-col", "odd")}>
                  {group.questionList.map((item, i) =>
                    i % 2 === 0 ? (
                      <div className={cx("question-item")} key={i}>
                        <h4>{item.question}</h4>
                        <p>{item.answer}</p>
                      </div>
                    ) : null
                  )}
                </div>
                <div className={cx("question-col", "even")}>
                  {group.questionList.map((item, i) =>
                    i % 2 !== 0 ? (
                      <div className={cx("question-item")} key={i}>
                        <h4>{item.question}</h4>
                        <p>{item.answer}</p>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Question;
