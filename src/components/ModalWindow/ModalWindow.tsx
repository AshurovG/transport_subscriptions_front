import React, { MouseEvent, MouseEventHandler } from "react";
import cn from "classnames";
import styles from "./ModalWindow.module.scss";

export type ModalProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
  handleBackdropClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const ModalWindow: React.FC<ModalProps> = ({
  active,
  children,
  className,
  handleBackdropClick,
}) => {
  const handleClick: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`${styles.modal} ${active === true ? styles.active : ""}`}
    >
      <div
        onClick={handleClick}
        className={
          active === false
            ? cn(styles.modal__content, className)
            : cn(styles.modal__content, styles.active, className)
        }
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
