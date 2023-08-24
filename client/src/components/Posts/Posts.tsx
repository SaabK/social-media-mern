import { useSelector } from 'react-redux';
import useStyles from './styles';
import { Grid, CircularProgress } from '@material-ui/core'
import { RootState } from '../../store/store';
import Post from './Post/Post';
import { IdProps } from '../../types';

function Posts({ setCurrentId }: IdProps) {

  const { posts: { posts } } = useSelector((state: RootState) => state);
  const classes = useStyles();

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
        {
          posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))
        }
      </Grid>
    )
  )
}

export default Posts