import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Post, Comment } from "../../API";
import { Storage } from "aws-amplify";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import "./Post.css";
import { useDataProvider } from "../../Context/DataContext";
import { API, graphqlOperation } from "aws-amplify";
import { updatePost } from "../../graphql/mutations";
import { UpdatePostMutation } from "../../API";
import { GraphQLResult } from "@aws-amplify/api";
import CommentInput from "../CommentInput/CommentInput";
import { createComment } from "../../graphql/mutations";
import { CreateCommentMutation } from "../../API";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useNavigate } from "react-router-dom";

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const classes = useStyles();
  const [url, setUrl] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<(Comment | null)[] | null>([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const { user } = useDataProvider();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUrl(post.imageUrl!);
  }, [post.imageUrl]);

  useEffect(() => {
    post.comments && post.comments.items && setComments(post.comments.items);
  }, [post.comments?.items, post.comments]);

  useEffect(() => {
    user && post.likes?.includes(user.username)
      ? setLiked(true)
      : setLiked(false);
  }, [user, post.likes]);

  const fetchUrl = async (key: string) => {
    const url = await Storage.get(key);
    setUrl(url);
  };

  const likePost = async () => {
    const data = {
      id: post.id,
      likes: post?.likes ? [...post.likes, user.username] : [user.username],
    };
    try {
      (await API.graphql(
        graphqlOperation(updatePost, { input: data })
      )) as GraphQLResult<UpdatePostMutation>;
    } catch (err) {
      console.log(err);
    }
  };

  const unlikePost = async () => {
    const updatedData = post?.likes?.filter((item) => item !== user.username);
    const unlike = {
      id: post.id,
      likes: updatedData,
    };
    try {
      (await API.graphql(
        graphqlOperation(updatePost, { input: unlike })
      )) as GraphQLResult<UpdatePostMutation>;
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async (comment: string) => {
    const newComment = {
      content: comment,
      username: user.username,
      commentPostId: post.id,
    };
    try {
      (await API.graphql(
        graphqlOperation(createComment, { input: newComment })
      )) as GraphQLResult<CreateCommentMutation>;
      setCommentsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateProfile = () => {
    navigate(`/profile/${post.user?.id}`);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        onClick={() => navigateProfile()}
        avatar={
          <Avatar
            aria-label="recipe"
            src={post.user?.imageUrl!}
            alt={post.username!}
            className={classes.avatar}
          ></Avatar>
        }
        title={post.username}
      />

      {url ? (
        <CardMedia className={classes.media} image={url} title="post" />
      ) : (
        <CircularProgress />
      )}

      <CardActions disableSpacing>
        {liked ? (
          <IconButton
            aria-label="add to favorites"
            onClick={() => unlikePost()}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="add to favorites" onClick={() => likePost()}>
            <FavoriteBorderOutlinedIcon />
          </IconButton>
        )}
        {post.likes && post.likes?.length > 1
          ? `${post.likes?.length} likes`
          : `${post.likes?.length} like`}

        <IconButton
          aria-label="share"
          onClick={() =>
            setCommentsOpen((commentsOpen: boolean) => !commentsOpen)
          }
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="p">
          <span className={classes.descriptionUsername}>{post.username}</span>
          {post.caption}
        </Typography>
      </CardContent>
      {comments && comments?.length > 0 && (
        <CardContent className={classes.allcomments}>
          {commentsOpen ? (
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              onClick={() => setCommentsOpen(false)}
            >
              Show few Comments
            </Typography>
          ) : (
            <Typography
              variant="body1"
              color="textPrimary"
              component="p"
              onClick={() => setCommentsOpen(true)}
            >
              View All Comments
            </Typography>
          )}
        </CardContent>
      )}
      {commentsOpen && (
        <CardContent className={classes.comment}>
          {comments?.map((item: Comment | null) => {
            return (
              <CardContent key={item?.id}>
                <Typography variant="body1" color="textPrimary" component="p">
                  <span className={classes.descriptionUsername}>
                    {item?.username}
                  </span>
                  {item?.content}
                </Typography>
              </CardContent>
            );
          })}
        </CardContent>
      )}
      <CardContent className={classes.comment}>
        <CommentInput submitComment={addComment} />
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    width: 500,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[300],
  },
  comment: {
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
  },
  descriptionUsername: {
    fontWeight: "bold",
    marginRight: 5,
    fontSize: "1.1rem",
  },
  allcomments: {
    marginLeft: 5,
  },
}));

export default PostCard;
