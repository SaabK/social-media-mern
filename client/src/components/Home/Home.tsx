import { Container, Grid, Grow } from "@material-ui/core";
import Posts from "../Posts/Posts";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/posts/postsThunk";
import useStyles from '../../styles';
import Form from "../Form/Form";

function Home() {

  const [currentId, setCurrentId] = useState<string>('');

  const { posts: { posts } } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<AppDispatch>();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [currentId, dispatch, posts]);

  return (
    <Grow in>
      <Container>
        <Grid container className={classes.mainContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;