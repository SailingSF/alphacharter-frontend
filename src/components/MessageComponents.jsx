import { styled, Box } from '@mui/system';

const MessageList = styled(Box)(({ theme }) => ({
    overflowY: 'scroll',
    overflowX: 'hidden', 
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.chat,
    '&::-webkit-scrollbar': {
        width: '10px',
        marginLeft: '4px'
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.chat.scroll,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'black',
        boxShadow: 'inset 0 0 0 1px white',
        borderRadius: '8px',
        '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        },
    }
  }));

const MessageItem = styled(Box)(({ theme, owner }) => ({
    alignSelf: owner === 'assistant' ? 'flex-start' : 'flex-end',
    maxWidth: '70%',
    padding: theme.spacing(2),
    borderRadius: '20px',
    margin: theme.spacing(1, 0),
    backgroundColor: owner === 'assistant' ? theme.palette.chat.assistant : theme.palette.chat.user,
    color: owner === 'assistant' ? theme.palette.text.white : theme.palette.text.white,
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[3],
    },

    '& img': {  // Add these rules for images
        maxWidth: '100%',
        height: 'auto',
        display: 'block',  // Makes images align center
        margin: '0 auto',  // Center images
    },

    '& ul, & ol': {
        paddingLeft: theme.spacing(2),
        marginBottom: 0,
      },
    '& li': {
    marginBottom: theme.spacing(0.5),
    },
    '& p': {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
    '&:last-child': {
        marginBottom: 0,
        marginTop: 0,
    },
    },
}));

export { MessageList, MessageItem };