import { useState, useEffect } from 'react';
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../features/posts/postsThunk';
import { AppDispatch, RootState } from '../../store/store';
import { IdProps, Post } from '../../types';

function Form({ currentId, setCurrentId }: IdProps) {

  const dispatch = useDispatch<AppDispatch>();
  // 👇 Finding the post that is being updated if it is being updated
  const post = useSelector((state: RootState) => currentId ? state.posts.posts.find(post => post._id === currentId) : null);

  // console.log("Post: ", post);

  const [postData, setPostData] = useState<Post>({
    creator: '',
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  });

  useEffect(() => {
    // 👇 Set the post data if we are updating the post
    if (post) setPostData(post);
  }, [currentId, post])

  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // When we click on update button, then the id gets stored and is not null anymore then we should not update  memory rather than create a new one
    if (currentId) {
      dispatch(updatePost({ currentId, postData }))
    } else {
      dispatch(createPost(postData))
    }

    clear();
  }

  const clear = () => {
    setCurrentId('');
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: [],
      selectedFile: ''
    });
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={(e) => handleSubmit(e)}>
        <Typography variant='h6'>
          {currentId ? 'Editing' : 'Creating'} a Memory
        </Typography>
        <TextField
          name='creator'
          variant='outlined'
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
        />

        <TextField
          name='title'
          variant='outlined'
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />

        <TextField
          name='message'
          variant='outlined'
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />

        <TextField
          name='tags'
          variant='outlined'
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: [...e.target.value.split(',').map(tag => tag.replace(/\s+/g, ''))] })}
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }: { base64: string }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>

        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;