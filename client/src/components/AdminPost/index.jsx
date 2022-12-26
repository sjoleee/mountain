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
      {name && <S.Cell>{name}</S.Cell>}
      {title && <S.Cell>{title}</S.Cell>}
      {username && <S.Cell>{username}</S.Cell>}
      <S.Cell>{createdAt}</S.Cell>
      {validateTab.isChallenges ? (
        <button onClick={onApproveClick} disabled={approved}>
          승인
        </button>
      ) : null}
      <button onClick={onDeleteClick}>삭제</button>
    </S.Container>
  );
};

export default AdminPost;
