import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const CommentsButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CommentsButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const handleSubmitComment = async () => {
    try {
      const res = await axios.post("/comments", {
        userId: currentUser._id,
        videoId,
        desc: newComment,
      });
      // Update comments state with the newly added comment
      setComments([...comments, res.data]);
      // Clear the input field
      setNewComment("");
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  const handleCancelComment = () => {
    setNewComment("");
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <CommentsButtonWrapper>
          <CommentsButton onClick={handleSubmitComment}>Submit</CommentsButton>
          <CommentsButton onClick={handleCancelComment}>Cancel</CommentsButton>
        </CommentsButtonWrapper>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
