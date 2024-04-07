import { styled, Box } from '@mui/system';

const MessageList = styled(Box)(({ theme }) => ({
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: theme.spacing(1),
  }));

const MessageItem = styled(Box)(({ theme, owner }) => ({
    alignSelf: owner === 'assistant' ? 'flex-start' : 'flex-end',
    maxWidth: '70%',
    padding: '10px 20px',
    borderRadius: '20px',
    margin: '5px',
    backgroundColor: owner === 'assistant' ? theme.palette.primary.mainVariant : theme.palette.primary.main,
    color: owner === 'assistant' ? theme.palette.text.primary : theme.palette.primary.primary,

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