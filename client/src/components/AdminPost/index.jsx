import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import AdminModal from "../AdminModal";
import * as S from "./styles";
import { useSearchParams } from "react-router-dom";
import { deleteAdminData, putChallangeData } from "../../apis";
import { convertDate } from "../../utils";

const AdminPost = ({
  _id,
  name,
  title,
  username,
  createdAt,
  validateTab,
  approved,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const onDeleteClick = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  const onApproveClick = () => {
    setIsApproveModalOpen((prev) => !prev);
  };

  const { mutate } = useMutation(
    ({ id }) => {
      if (isDeleteModalOpen)
        return deleteAdminData(searchParams.get("tab"), id);
      if (isApproveModalOpen) return putChallangeData(id);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  return (
    <S.Container>
      {isDeleteModalOpen || isApproveModalOpen ? (
        <AdminModal
          visible={isDeleteModalOpen || isApproveModalOpen}
          maskClosable={true}
          onClose={isDeleteModalOpen ? onDeleteClick : onApproveClick}
          text={isDeleteModalOpen ? "삭제" : "승인"}
          subText={
            isDeleteModalOpen ? "정녕 삭제하시렵니까?" : "정녕 승인하시렵니까?"
          }
          buttonText={isDeleteModalOpen ? "삭제하기" : "승인하기"}
          buttonOnClick={() => {
            mutate(
              {
                id: _id,
              },
              {
                onSettled: () => {
                  isDeleteModalOpen ? onDeleteClick() : onApproveClick();
                },
              }
            );
          }}
        />
      ) : null}
      <S.Cell>{_id}</S.Cell>
      {name && (
        <S.Cell
          isTitle
          onClick={() => window.open(`/challenge/${_id}`, "_blank")}
        >
          {name}
        </S.Cell>
      )}
      {title && (
        <S.Cell
          isTitle
          onClick={() => window.open(`/feeds?feed-id=${_id}`, "_blank")}
        >
          {title}
        </S.Cell>
      )}
      {username && <S.Cell isTitle>{username}</S.Cell>}
      <S.Cell>{convertDate(createdAt)}</S.Cell>
      <S.ButtonContainer>
        {validateTab.isChallenges ? (
          <S.Button
            onClick={onApproveClick}
            disabled={approved}
            isApproved={approved}
          >
            {approved ? "승인완료" : "승인"}
          </S.Button>
        ) : null}

        <S.Button onClick={onDeleteClick}>삭제</S.Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default AdminPost;
