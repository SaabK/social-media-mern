import memories from './assets/memories.png';

import './index.css';

import { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyles from './styles';
import { useDispatch, useSelector, } from 'react-redux';

import { AppDispatch, RootState } from './store/store';
import { fetchPosts } from './features/posts/postsThunk';

function App() {
  const [currentId, setCurrentId] = useState<string>('');

  const { posts: { posts } } = useSelector((state: RootState) => state);

  const dispatch = useDispatch<AppDispatch>();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [currentId, dispatch, posts]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt="Memories" height='60' />
      </AppBar>
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
    </Container>
  )
}

export default App;