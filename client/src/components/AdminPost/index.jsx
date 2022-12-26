import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AdminModal from "../AdminModal";

import * as S from "./styles";

import axios from "axios";

const AdminPost = ({ _id, name, title, username, createdAt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const onDeleteClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const { mutate } = useMutation(
    ({ id }) => {
      return deleteAdminData(id);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  return (
    <S.Container>
      {isModalOpen ? (
        <AdminModal
          className="req_modal"
          visible={isModalOpen}
          maskClosable={true}
          onClose={onDeleteClick}
          text="삭제"
          subText="정녕 삭제하시렵니까?"
          buttonText="삭제하기"
          buttonOnClick={() => {
            mutate(
              {
                id: _id,
              },
              {
                onSettled: () => {
                  console.log("asdf");
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
      <button onClick={onDeleteClick}>삭제</button>
    </S.Container>
  );
};

export default AdminPost;
