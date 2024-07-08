import { styled, Box } from '@mui/system';

const MessageList = styled(Box)(({ theme }) => ({
    overflowY: 'scroll',
    overflowX: 'hidden', 
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
    marginRight: '4px',
    '&::-webkit-scrollbar': {
        width: '10px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.grey[900],
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'black',
        boxShadow: 'inset 0 0 0 1px white',
        borderRadius: '8px',
    }
  }));

const MessageItem = styled(Box)(({ theme, owner }) => ({
    alignSelf: owner === 'assistant' ? 'flex-start' : 'flex-end',
    maxWidth: '70%',
    padding: '10px 20px',
    borderRadius: '20px',
    margin: '5px',
    backgroundColor: owner === 'assistant' ? theme.palette.chat.assistant : theme.palette.chat.user,
    color: owner === 'assistant' ? theme.palette.text.white : theme.palette.text.white,

    '& img': {  // Add these rules for images
        maxWidth: '100%',
        height: 'auto',
        display: 'block',  // Makes images align center
        margin: '0 auto',  // Center images
    },

    '& ul, & ol': {
        listStyleType: 'none', // Removes bullet points or numbers
        padding: 0, // Removes indentation
    },

    '& ul > li > img, & ol > li > img': {
        listStyleType: 'none',
        padding: 0,
        margin: 0
    }
}));

export { MessageList, MessageItem };