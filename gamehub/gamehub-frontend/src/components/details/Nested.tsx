import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
  MDBTextArea,
  MDBCardFooter,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
} from "mdb-react-ui-kit";

export default function Nested() {
  const [basicModal, setBasicModal] = useState(false);
  const [activeDiscussionId, setActiveDiscussionId] = useState<any>("");
  const toggleOpen = (discussionId: any) => {
    setActiveDiscussionId(discussionId);
    setBasicModal(!basicModal);
  };

  const { id } = useParams<{ id: string }>();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [discussions, setDiscussions] = useState<any>([]);
  const [content, setContent] = useState<any>("");
  const [replycontent, setReplyContent] = useState<any>("");

  const handleDiscussionSubmit = async (event: any) => {
    event.preventDefault();
    if (!user.id) {
      alert("Please login to comment.");
      return;
    }
    if (!id) {
      alert("Missing game info.");
      return;
    }
    if (!content || !content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log(id, user.id, content);
      const reponse = await fetch(
        `https://backend-production-6194.up.railway.app/api/discussions/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId: id,
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
            content: content,
          }),
        }
      );
      if (!reponse.ok) {
        throw new Error("Comment failed!");
      }
      const reponseDiscussion = await reponse.json();
      if (!reponseDiscussion) {
        throw new Error("Comment failed!");
      }
      // reload page
      console.log(reponseDiscussion);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReplySubmit = async (event: any) => {
    event.preventDefault();

    if (!user.id) {
      alert("Please login to reply.");
      return;
    }

    if (!replycontent || !replycontent.trim() || !activeDiscussionId) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log(activeDiscussionId, user.id, replycontent);
      const reponse = await fetch(
        `https://backend-production-6194.up.railway.app/api/discussions/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId: id,
            userId: user.id,
            username: user.username,
            avatar: user.avatar,
            content: replycontent,
            parentId: activeDiscussionId,
          }),
        }
      );
      if (!reponse.ok) {
        throw new Error("Reply failed!");
      }
      const reponseDiscussion = await reponse.json();
      if (!reponseDiscussion) {
        throw new Error("Reply failed!");
      }
      console.log(reponseDiscussion);
      // clear text area && close modal
      setReplyContent("");
      setBasicModal(false);
      // reload page
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const reponse = await fetch(
          `https://backend-production-6194.up.railway.app/api/discussions/game/${id}`
        );
        if (!reponse.ok) {
          throw new Error("Fetch discussions failed!");
        }
        const discussions = await reponse.json();
        if (!discussions) {
          throw new Error("Fetch discussions failed!");
        }
        console.log(discussions);

        const discussionsWithReplies = await Promise.all(
          discussions.map(async (discussion: any) => {
            const repliesReponse = await fetch(
              `https://backend-production-6194.up.railway.app/api/discussions/replies/${discussion.id}`
            );
            if (!repliesReponse.ok) {
              throw new Error("Fetch replies failed!");
            }
            const replies = await repliesReponse.json();
            if (!replies) {
              throw new Error("Fetch replies failed!");
            }
            return { ...discussion, replies };
          })
        );
        console.log(discussionsWithReplies);
        setDiscussions(discussionsWithReplies);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDiscussions();
  }, [id]);

  return (
    <MDBContainer className="py-5" style={{ maxWidth: "3000px" }}>
      <MDBRow className="justify-content-center">
        <MDBCol md="12" lg="10" xl="8">
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Please input reply</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleOpen}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBTextArea
                  label="Message"
                  id="textAreaExample"
                  rows={4}
                  onChange={(e: any) => setReplyContent(e.target.value)}
                />
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleOpen}>
                    Close
                  </MDBBtn>
                  <MDBBtn onClick={handleReplySubmit}>Reply</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

          <MDBTypography tag="h4" className="text-center mb-4 pb-2">
            Discussion section
          </MDBTypography>

          <MDBCardFooter className="py-3 border-0 mb-8">
            <div className="d-flex flex-start w-100">
              <MDBCardImage
                className="rounded-circle shadow-1-strong me-3"
                src={
                  user.avatar
                    ? user.avatar
                    : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                }
                alt="avatar"
                width="40"
                height="40"
              />
              <MDBTextArea
                label="Message"
                id="textAreaExample"
                rows={4}
                style={{ backgroundColor: "#fff" }}
                wrapperClass="w-100"
                onChange={(e: any) => setContent(e.target.value)}
              />
            </div>
            <div className="float-end mt-2 pt-1">
              <MDBBtn
                size="sm"
                className="me-1"
                onClick={handleDiscussionSubmit}
              >
                Post discussion
              </MDBBtn>
            </div>
          </MDBCardFooter>

          {
            // filter discussions without parent

            discussions
              .filter((d: any) => !d.parentId)
              .map((discussion: any) => {
                return (
                  console.log(discussion),
                  (
                    <div className="d-flex flex-start">
                      <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src={
                          discussion.avatar
                            ? discussion.avatar
                            : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                        }
                        alt="avatar"
                        width="50"
                        height="50"
                      />

                      <div className="flex-grow-1 flex-shrink-1 mb-4">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="fw-bold mb-0">
                              {discussion.username}{" "}
                              <small className="text-muted">
                                {discussion.postedDate}{" "}
                              </small>
                            </p>
                            <a
                              href="#!"
                              onClick={() => toggleOpen(discussion.id)}
                            >
                              <MDBIcon fas icon="reply fa-xs" />
                              <span className="small"> reply</span>
                            </a>
                          </div>
                          <p className="small mt-2">{discussion.content}</p>
                        </div>

                        {discussion.replies.map((reply: any) => {
                          return (
                            <div className="d-flex flex-start mt-4">
                              <a className="me-3" href="#">
                                <MDBCardImage
                                  className="rounded-circle shadow-1-strong me-3"
                                  src={
                                    reply.avatar
                                      ? reply.avatar
                                      : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                                  }
                                  alt="avatar"
                                  width="40"
                                  height="40"
                                />
                              </a>

                              <div className="flex-grow-1 flex-shrink-1">
                                <div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p className="fw-bold mb-1">
                                      {reply.username}{" "}
                                      <small className="text-muted">
                                        {reply.postedDate}
                                      </small>
                                    </p>
                                  </div>
                                  <p className="small mb-0">{reply.content}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )
                );
              })
          }
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
