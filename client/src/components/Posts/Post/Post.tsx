import useStyles from './styles';
import { CardActions, CardContent, CardMedia, Button, Typography, Card } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { Post } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../../features/posts/postsThunk';
import { AppDispatch, RootState } from '../../../store/store';

function Post({ post, setCurrentId }: { post: Post, setCurrentId: React.Dispatch<React.SetStateAction<string>> }) {

  const classes = useStyles();

  const dispatch = useDispatch<AppDispatch>();
  const { auth: { authData: user } } = useSelector((state: RootState) => state);


  const Likes = () => {
    if (post.likes && post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.data.sub || user?.data._id)) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 2} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : "Likes"}
        </>
      )
    }

    return (<>
      <ThumbUpAltOutlined fontSize='small' />&nbsp;Like
    </>);
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title}>
      </CardMedia>

      <div className={classes.overlay}>
        <Typography variant='h6'>{user?.data.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>

      {/* Edit Button */}
      {
        (user?.data._id || user?.data.sub) === post.creator && (
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size='small' onClick={() => setCurrentId(post._id || '')}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
          </div>
        )
      }

      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>{post.tags.map((tag, index) => <span key={index}>#{tag}&nbsp;</span>)}</Typography>
      </div>

      <Typography className={classes.title} variant='h6' gutterBottom>{post.title}</Typography>

      <CardContent>
        <Typography variant='body2' component='p' color='textSecondary'>{post.message}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size='small' disabled={!user?.data} color='primary' onClick={() => dispatch(likePost(post._id as string))}>
          <Likes />
        </Button>

        {/* Delete Button */}
        {
          (user?.data._id || user?.data.sub) === post.creator && (
            <Button size='small' color='primary' onClick={() => { dispatch(deletePost(post._id as string)); console.log(post._id) }}>
              <DeleteIcon fontSize='small' />
              Delete
            </Button>
          )
        }
      </CardActions>
    </Card>
  )
}

export default Post