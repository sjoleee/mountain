import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import AdminModal from "../AdminModal";
import * as S from "./styles";
import { useSearchParams } from "react-router-dom";

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

  const deleteAdminData = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `http://localhost:8000/admin/${searchParams.get("tab")}/${id}`,
        headers: { contentType: "application/json" },
      });
      return response.data;
    } catch (error) {
      console.dir(error);
    }
  };

  const putChallangeData = async (id) => {
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:8000/admin/challenges/${id}/approve`,
        headers: { contentType: "application/json" },
      });
      return response.data;
    } catch (error) {
      console.dir(error);
    }
  };

  const onDeleteClick = () => {
    setIsDeleteModalOpen((prev) => !prev);
  };

  const onApproveClick = () => {
    setIsApproveModalOpen((prev) => !prev);
  };

  const dateConverter = (date) => {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    const hour = date.slice(11, 13);
    const minute = date.slice(14, 16);

    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };

  const { mutate } = useMutation(
    ({ id }) => {
      if (isDeleteModalOpen) return deleteAdminData(id);
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
      {name && <S.Cell isTitle>{name}</S.Cell>}
      {title && <S.Cell isTitle>{title}</S.Cell>}
      {username && <S.Cell isTitle>{username}</S.Cell>}
      <S.Cell>{dateConverter(createdAt)}</S.Cell>
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
