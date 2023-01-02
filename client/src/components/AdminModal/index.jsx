import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";

const AdminModal = ({
  onClose,
  maskClosable,
  visible,
  text,
  subText,
  link,
  buttonText,
  buttonOnClick,
}) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const cancelOnClick = () => {
    onClose();
  };

  return (
    <>
      <S.ModalOverlay visible={visible} />
      <S.ModalWrapper
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}
      >
        <S.ModalInner tabIndex={0} className="modal-inner">
          <S.InnerContainer>
            <S.TextContainer>{text}</S.TextContainer>
            <S.SubTextContainer>{subText}</S.SubTextContainer>
            <S.SubTextContainer>
              <Link
                to="route"
                target="_blank"
                onClick={(event) => {
                  event.preventDefault();
                  window.open(link);
                }}
              >
                인증 확인하기(새창)
              </Link>
            </S.SubTextContainer>
            <S.ButtonContainer>
              <S.LeftButton onClick={cancelOnClick}>취소</S.LeftButton>
              <S.RightButton onClick={buttonOnClick}>
                {buttonText}
              </S.RightButton>
            </S.ButtonContainer>
          </S.InnerContainer>
        </S.ModalInner>
      </S.ModalWrapper>
    </>
  );
};

export default AdminModal;
