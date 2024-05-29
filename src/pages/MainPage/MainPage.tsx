import Header from "components/Header";
import styles from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={styles.main__page}>
      <Header />
      <div className={styles["main__page-intro"]}>
        <h1 className={styles["main__page-title"]}>Travel pass</h1>
        <h4 className={styles["main__page-subtitle"]}>
          Система по приобретению абонементов на транспорт
        </h4>
      </div>
      <div className={styles["main__page-wrapper"]}>
        <div className={styles["main__page-about"]}>
          <h2 className={styles["main__page-part-title"]}>О компании</h2>
          <div className={styles["main__page-about-wrapper"]}>
            <ul className={styles["main__page-about-info"]}>
              <li className={styles["main__page-about-item"]}>
                Наша компания специализируется на продаже абонементов для
                различных видов транспорта.
              </li>
              <li className={styles["main__page-about-item"]}>
                Мы также предлагаем возможность приобретения нескольких
                абонементов и добавления их в одну заявку.
              </li>
              <li className={styles["main__page-about-item"]}>
                После составления заявки вам потребуется отправить ее на
                проверку нашим администраторам.{" "}
              </li>
              <li className={styles["main__page-about-item"]}>
                Мы сделаем все возможное, чтобы предоставить вам ответ в
                кратчайшие сроки.
              </li>
              <li className={styles["main__page-about-item"]}>
                Более того, у вас есть возможность просмотреть полную историю
                ваших заявок.
              </li>
              <li className={styles["main__page-about-item"]}>
                Если у вас возникнут вопросы, наша служба поддержки всегда
                готова помочь вам.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
